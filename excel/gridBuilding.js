// dynamically setting cells
// col numbering


var rows=100;
var cols=26; //alhpabets

//column is respresting a row
let addressColCont=document.querySelector(".address-col-cont")
for(let i=0;i<rows;i++){
   // first we will have to create the div 
    //for representation and then we can insert 
    let addressCol=document.createElement("div");
    addressCol.setAttribute("class","address-col");
    addressCol.innerText=i+1;
    addressColCont.appendChild(addressCol);
}

let addressRowCont=document.querySelector(".address-row-cont");
for(let i=0;i<cols;i++){
    let addressRow=document.createElement("div");
    addressRow.setAttribute("class","address-row");
    addressRow.innerText=String.fromCharCode(65+i);
    addressRowCont.appendChild(addressRow)
}

//grid cells
// like 2D matrix
let cellscont=document.querySelector(".cells-cont");
for(let i=0;i<rows;i++){
    let rowCont=document.createElement("div");
    rowCont.setAttribute("class","row-cont");
    // create 26 cells and add
    for(let j=0;j<cols;j++){
        let cell=document.createElement("div")
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable","true")
        // attributes for cell and storage identification
        cell.setAttribute("rid",i); // custom attributes
        cell.setAttribute("cid",j);
        cell.setAttribute("spellcheck","false")

        rowCont.appendChild(cell);
        showAddress(cell,i,j);

    }
    cellscont.appendChild(rowCont);
}

let addressBar=document.querySelector(".address-bar")
//show value on address bar onclicking on address bar
function showAddress(cell,i,j){
    cell.addEventListener("click",(e)=>{
        let rowId=i+1;
        let colId=String.fromCharCode(65+j);
        addressBar.value=`${colId}${rowId}`;

    })

}

//By defualt access the first cell to avoid error/ empty value via DOM
let firstCell=document.querySelector(".cell");
firstCell.click();






   
