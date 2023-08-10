let addSheetBtn= document.querySelector(".sheet-add-icon");
let sheetFolderCont= document.querySelector(".sheets-folder-cont");

addSheetBtn.addEventListener("click",(e)=>{
    let sheet=document.createElement("div");
    sheet.setAttribute("class","sheet-folder");
    let allsheetFolders= document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allsheetFolders.length);
    // adding sheets whenevr we click ok the button
    sheet.innerHTML= ` <div class="sheet-cont">
    Sheet ${allsheetFolders.length}
</div>`

sheetFolderCont.appendChild(sheet);

})

// function that creates database dor every individual sheet.
function createSheetDB(){
    // Each cell is represented by an object cellProp containing properties for styling and formatting.
for(let i=0;i<100;i++){
    let sheetRow=[];
    for(let j=0;j<26;j++){

        let cellProp={

            bold: false, 
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "Arial",
            fontSize: "14",
            fontColor: "#000000",
            BGcolor: "transparent", //just for indication purpose
            value: "",
            formula: "",
            children: [] // for  children that are depended on cell cells 

        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow)
}
collectedDB.push(sheetDB);

}

// each sheet will have some relations; so we need to store that too.
function createGraphComponentMatrix(){
    for (let i = 0; i < 100; i++) {
        let row = [];
        for (let j = 0; j < 26; j++) {
            // Why array -> More than 1 child relation(dependency)
            row.push([]);
        }
        graphComponentMatrix.push(row);
    }
    collectedGraphComponent.push(graphComponentMatrix);

}

// Next, step is to handle the 'ACTIVE SHEET'. Show the sheet that is active
function HandleSheetActiveness(sheet){
    sheet.addEventListener("click", (e)=>{
        // get the sheet id that you have clicked
        let SheedIdx=Number(sheet.getAttribute("id"));
    })
}