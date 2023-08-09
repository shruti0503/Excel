// function getCell(address){

//     // destructuring
//     let [rid,cid]=decodeRIDCIDfromAddress(address);

//     //access cell and storage object
//     let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
//     let cellProp=sheetDB[rid][cid];
//     return [cell, cellProp];
//     // for UI change we will use : cell
//     // for data change we will use : cellProp

// }
// first in whichever cell i work
// i need to store the daata
// we did in cellProp in sheetDB
// so we will add an extra key in the cellProp iobject i.e value:

// the user can also modify the data then simulatnel9usl;y we need to store the data
// when the user moves aeay from cell
// we will use another event listener; focus , blur (difference between the two)
// why not use click event listener? if we click , blur comes first compare to click event ,
// means if we click the address chages but when use blur after execvution , ; chnage value

// step 1 

//let addressBar = document.querySelector("#addressBar");
for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 26; j++) {
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
      cell.addEventListener("blur", (e) => {
        
          let address = addressBar.value;
          let [activeCell, cellProp] = getCell(address);
          let enteredData = activeCell.innerText;

          if(enteredData===cellProp.value) return ;

          // if modifies remove pc relation, update children with new modified value
          cellProp.value=enteredData;
          removeChild(cellProp.formula);
          cellProp.formula= "";
        //   updateChildrenCells(address);
  
          console.log(cellProp); 
      });
    }
}
   


let formulaBar=document.querySelector(".formula-bar");
// for formula evaluation
// on enter event : --> normal expression, dependecy expression
// normal expression: 10+20 =  ; DEPENDCY EXP+ A1+A2+10
formulaBar.addEventListener("keydown",async (e)=>{
    //accessing the formula expression from the formula bar, evaluate new formula 
    let inputFormula=formulaBar.value;

    if(e.key==="Enter" && inputFormula){
        // cahnge in formula break old P-C relationship and establish new P-C relation
        let address=addressBar.value;
        let [cell, cellProp]=getCell(address);
        if(inputFormula!==cellProp.formula) removeChild(cellProp.formula);

       // first make relation and then check if ccycle is being made
        addChildToGraphComponent(inputFormula, address);
        // check formula is cyclic or not then only evaluate

        let cycleResponse = isGraphCylic(graphComponentMatrix);
        if(cycleResponse){
            
            let response=confirm("Your forumla is cycle. Do you wish to trace the path? ");
            while(response==true){
                // keep on tracking colour until user is satistified
                await isGraphCylicTracePath(graphComponentMatrix, cycleResponse); // want to complete full iteration of colour tarcking, so attach wait here also.
                response=confirm("Your forumla is cycle. Do you wish to trace the path? ");
            }

            removeChildFromGraphComponent(inputFormula,address);
            return;
        }


        let evaluatedvalue = evaluate(inputFormula);
         // To update cell prop and ui
        setCellUIandCellProp(evaluatedvalue, inputFormula, address);
        addChildToParent(inputFormula);
        // console.log(JSON.stringify(sheetDB));
        // updateChildrenCells(address);

    }

})
function  addChildToGraphComponent(formula, childAddress){
    // decoding the child address
    let[crid, ccid]=decodeRIDCIDfromAddress(childAddress);

    // process to decode the formula eg C1= A1 + B1 ; C1 is the child of A1 and B1
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [prid, pcid]= decodeRIDCIDfromAddress(encodedFormula[i]);
            // B1: A1 + 10
            // rid -> i, cid -> j
            graphComponentMatrix[prid][pcid].push([crid,ccid])
        }
    }
}

function removeChildFromGraphComponent(formula,childAddress){
    let[crid, ccid]=decodeRIDCIDfromAddress(childAddress);

    // process to decode the formula eg C1= A1 + B1 ; C1 is the child of A1 and B1

    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [prid, pcid]= decodeRIDCIDfromAddress(encodedFormula[i]);
            // B1: A1 + 10
            // rid -> i, cid -> j
            graphComponentMatrix[prid][pcid].pop()
        }
    }

}

// establshing poarent child relationship
function addChildToParent(formula){
    let childAddress=addressBar.value;
    // the formula is in string -> unstring it using split()
    let encodedFormula= formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue= encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <=90){
            let [parentCell, parentCellProp]= getCell(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }

    }

}
function removeChild(formula){
    let childAddress=addressBar.value;
    // the formula is in string -> unstring it using split()
    let encodedFormula= formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue= encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <=90){
            let [parentCell, parentCellProp]= getCell(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
            let idx=parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx,1);
        }

    }

}
// update children cells
function updateChildrenCells(parentAddress){
    let [parentcell, parentcellProp]=getCell(parentAddress);
    let children=parentcellProp.children;
    console.log("updating..")
    

    // here the base case is the length itself
    for(let i=0;i<children.length; i++){
        let childAddress=children[i];
        let [childCell, childProp]= getCell(childAddress);
        let childFormula=childProp.formula;

        let evaluatedvalue= evaluate(childFormula);
        setCellUIandCellProp(evaluatedvalue, childFormula, childAddress);
        updateChildrenCells(childAddress);

    }
}

function evaluate(formula) {
    // Split the formula into an array of individual elements
    let encodedFormula = formula.split(" ");
  
    // Iterate through each element of the formula
    for (let i = 0; i < encodedFormula.length; i++) {
      // Check if the element is a cell reference (e.g., A1, B2, etc.)
      let asciiValue = encodedFormula[i].charCodeAt(0);
      if (asciiValue >= 65 && asciiValue <= 90) {
        // If it is a cell reference, fetch the cell value using the getCell() function
        let [cell, cellProp] = getCell(encodedFormula[i]);
        encodedFormula[i] = cellProp.value;
      }
    }
  
    // Join the encoded formula elements back into a string
    let decodedFormula = encodedFormula.join(" ");
  
    // Use the eval() function to evaluate the formula expression and return the result
    return eval(decodedFormula);
  }
  

function setCellUIandCellProp(evaluatedvalue, formula, address){
    let [cell,cellProp]=getCell(address);
   // ui update
    cell.innerText=evaluatedvalue;
    // db update
    cellProp.value=evaluatedvalue;
    cellProp.formula=formula;


}

