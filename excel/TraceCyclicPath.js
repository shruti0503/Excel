
function colorPromise(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve()
        },1000);
    })
}


// True -> cyclic, False -> Not cyclic
async function isGraphCylicTracePath(graphComponentMatrix, cycleResponse) {
    let [srcr, srcc]= cycleResponse; 
    // Dependency -> visited, dfsVisited (2D array)
    let visited = []; // Node visit trace
    let dfsVisited = []; // Stack visit trace
    
    for (let i = 0; i < 100; i++) {
        let visitedRow = [];
        let dfsVisitedRow = [];
        for (let j = 0; j < 26; j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    let response = await dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited); 
    if( response===true) return Promise.resolve(true);

    return Promise.resolve(false);
}


// colousing cells for tracking

async function dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
    cell.style.backgroundColor = "lightblue";

  await colorPromise(); // waits the code until the promise resolves

    // A1 -> [ [0, 1], [1, 0], [5, 10], .....  ]
    for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {
        let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
        if (visited[nbrr][nbrc] === false) {
            let response = await dfsCycleDetectionTracePath(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited);
            if (response === true){
                
            cell.style.backgroundColor="transparent";
            
                 await  colorPromise();
                return Promise.resolve(true);
            }  // Found cycle so return immediately, no need to explore more path
        }
        else if (visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true) {
            // Found cycle so return immediately, no need to explore more path
            let cyclicCell=document.querySelector(`.cell[rid="${nbrr}"][cid="${nbrc}"]`);
           
            cyclicCell.style.backgroundColor="pink";
            await  colorPromise();

            cyclicCell.style.backgroundColor="transparent";

            cell.style.backgroundColor="transparent";
            await  colorPromise();

            return Promise.resolve(true);

        }
    }

    dfsVisited[srcr][srcc] = false;
    return Promise.resolve(false);
}



