// Declares an empty array sheetDB to store the data of the spreadsheet.
let sheetDB=[];

// Each cell is represented by an object cellProp containing properties for styling and formatting.
for(let i=0;i<100;i++){
    let sheetRow=[];
    for(let j=0;j<26;j++){

        let cellProp={
            //if i click on any cell 
            //i need to 
            // ui grid---> storage
            //for cell and storage identification
            //attribute of a cell -- rowId, colId
            //mat[2][2]

            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "Arial",
            fontSize: "14",
            fontColor: "#000000",
            BGcolor: "transparent", //just for indication purpose
            value: "",
            formula: ""

        }
        sheetRow.push(cellProp);

    }
    sheetDB.push(sheetRow)
}

// selectors for cell properties
var bold = document.querySelector('.bold');
let italic=document.querySelector(".italic")
let underline=document.querySelector(".underline");
let fontSize=document.querySelector(".fontSize")
let fontFamily=document.querySelector(".fontFamily")
let fontColor=document.querySelector(".font-color-prop");
let bgColor=document.querySelector(".background-color-prop")
let alignment=document.querySelectorAll(".alignment")
let leftAlign= alignment[0];
let centerAlign=alignment[1];
let rightAlign=alignment[2];
//let addressBar=document.querySelector(".address-bar");
let activeColorProp="#d1d8e0";
let inactiveColorProp="#ecf0f1";

//attach property listeners

bold.addEventListener("click",(e)=>{
    //on cicking on bold we want the access of that
    // particular active cell, to change its UI and cahange the Storage
    // to do that -> we can take the address
    //we need to decode that address
    let address= addressBar.value;
   let [cell,cellProp]= getCell(address)
   console.log(address);
   
   //Modification
   cellProp.bold= !cellProp.bold
   cell.style.fontWeight= cellProp.bold ? "bold" : "400" //UI change Part1
   bold.style.backgroundColor=cellProp.bold ? activeColorProp : inactiveColorProp; // UI change (2);

})

italic.addEventListener("click",(e)=>{
    //on cicking on bold we want the access of that
    // particular active cell, to change its UI and cahange the Storage
    // to do that -> we can take the address
    //we need to decode that address
   let address= addressBar.value;
   let [cell,cellProp]= getCell(address)
   
   //Modification

   cellProp.italic= !cellProp.italic

   cell.style.fontStyle= cellProp.italic ? "italic" : "normal" //UI change Part1
   italic.style.backgroundColor=cellProp.italic ? activeColorProp : inactiveColorProp; // UI change (2);

})

underline.addEventListener("click",(e)=>{
    //on cicking on bold we want the access of that
    // particular active cell, to change its UI and cahange the Storage
    // to do that -> we can take the address
    //we need to decode that address
    let address= addressBar.value;
   let [cell,cellProp]= getCell(address)
   
   //Modification
   cellProp.underline= !cellProp.underline
   cell.style.textDecoration= cellProp.underline ? "underline" : "none" //UI change Part1
   underline.style.backgroundColor=cellProp.underline ? activeColorProp : inactiveColorProp; // UI change (2);



})

fontSize.addEventListener("change",(e)=>{
    let address= addressBar.value;
    let [cell,cellProp]= getCell(address)

   //data change
    cellProp.fontSize= fontSize.value;
    //ui chnage
    cell.style.fontSize=cellProp.fontSize+"px";
    fontSize.value=cellProp.fontSize;
})

fontFamily.addEventListener("change",(e)=>{
    let address= addressBar.value;
    let [cell,cellProp]= getCell(address)

   //data change
    cellProp.fontFamily= fontFamily.value;
    //ui chnage
    cell.style.fontFamily=cellProp.fontFamily;
    fontFamily.value=cellProp.fontFamily;
})

fontColor.addEventListener("change",(e)=>{
    let address= addressBar.value;
    let [cell,cellProp]= getCell(address)

    //data change
    cellProp.fontColor= fontColor.value;
    //ui chnage
    cell.style.color=cellProp.fontColor;
    fontColor.value=cellProp.fontColor;

})

bgColor.addEventListener("change",(e)=>{
    let address= addressBar.value;
    let [cell,cellProp]= getCell(address)

    //data change
    cellProp.bgColor= bgColor.value;
    //ui chnage
    cell.style.backgroundColor=cellProp.bgColor;
    fontColor.value=cellProp.bgColor;

})

let allCells=document.querySelectorAll(".cell");
for(let i=0;i<allCells.length;i++){
    addListnerToAtteachCellProp(allCells[i]);
}

//in alignment out of three alignments any one will be active
// by defualt the alignment is left
alignment.forEach(ele => {
    ele.addEventListener("click", (e) => {
        // code for alignment change
        let address=addressBar.value;
        let [cell, cellProp]=getCell(address);

        let alignValue=e.target.classList[0];
        cellProp.alignment= alignValue ; // data change
        cell.style.textAlign=alignValue ; //UI 

        switch(alignValue){ // ui change part2 
            case "left":
                leftAlign.style.backgroundColor=activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;

            case "right":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;     
        }
    });
});

//changing only the UI of a respective cell
function addListnerToAtteachCellProp(cell){
    //work
    cell.addEventListener("click",(e)=>{
        let address=addressBar.value;
        let [rid,cid]=decodeRIDCIDfromAddress(address);
        let cellProp=sheetDB[rid][cid];
        //change those properites
        cell.style.fontWeight= cellProp.bold ? "bold" : "400" 
        cell.style.fontStyle= cellProp.italic ? "italic" : "normal"
        cell.style.textDecoration= cellProp.underline ? "underline" : "none";
        cell.style.fontSize=cellProp.fontSize+"px";
        cell.style.fontFamily=cellProp.fontFamily;
        cell.style.color=cellProp.fontColor;
        cell.style.backgroundColor=cellProp.bgColor === "transparent" ? "transparent" : cellProp.BGcolor;
        cell.style.textAlign=cellProp.alignment;

        //apply ui props container
        bold.style.backgroundColor=cellProp.bold ? activeColorProp : inactiveColorProp; // UI change (2);
        italic.style.backgroundColor=cellProp.italic ? activeColorProp : inactiveColorProp; // UI change (2);
        underline.style.backgroundColor=cellProp.underline ? activeColorProp : inactiveColorProp; // UI change (2);
        cell.style.color=cellProp.fontColor;
        cell.style.backgroundColor=cellProp.bgColor;
        cellProp.fontSize= fontSize.value;
        // cellProp.fontFamily= fontFamily.value;


        switch(cellProp.alignment){ // ui change part2 
            case "left":
                leftAlign.style.backgroundColor=activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;

            case "right":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;     
        }


    })

}

//function that will give the the access 
function getCell(address){

    // destructuring
    let [rid,cid]=decodeRIDCIDfromAddress(address);

    //access cell and storage object
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
    let cellProp=sheetDB[rid][cid];
    return [cell, cellProp];
    // for UI change we will use : cell
    // for data change we will use : cellProp

}

// function to decode rowId and colId
function decodeRIDCIDfromAddress(address){

    // e.g. address-> "A1" : in string format
    let rid=Number(address.slice(1))-1; // 1 -> 0

   // colid is alphabet
    let cid=Number(address.charCodeAt(0))-65; // "A" -> 65

    // notice while encoding we where asdding i , j so while decoding 
    // to get the neutral value we need to subtract it

    return [rid,cid];


}


