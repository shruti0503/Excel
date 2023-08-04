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
  
          cellProp.value = enteredData;
          // console.log(cellProp); 
      });
    }
  }

//accesing formula bar
let formulaBar=document.querySelector(".formula-bar");
// for formula evaluation
// on enter event : --> normal expression, dependecy expression
// normal expression: 10+20 =  ; DEPENDCY EXP+ A1+A2+10

formulaBar.addEventListener("keydown",(e)=>{
    let inputFormula=formulaBar.value;

    if(e.key==="Enter" && inputFormula){

        let evaluatedvalue=evaluateFormula(inputFormula);
        // To update cell prop and ui
        setCellUIandCellProp(evaluatedvalue, inputFormula);

    }

})

function evaluate(formula){
    return eval(formula);
}

function setCellUIandCellProp(evaluatedvalue, formula){
    let address=addressBar.value;
    let [cell,cellProp]=getCell(address);

    cell.innerText=evaluatedvalue;
    cellProp.value=evaluatedvalue;
    cellProp.formula=formula;


}