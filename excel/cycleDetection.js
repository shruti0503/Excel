// storage making adjacent c list
let adj=[];

for( let i=0;i<rows;i++){
    let row=[];
    for(let j=0;j<cols;j++){
        // More than 1 Child Realtion (dependency)
        row.push([]);


    }
    // add row 
    adj.push(row);
}

function isGraphCyclic(adj){

    //dependecy -> visted, dfs visited (2D array)
    let visited=[] // node visited trace
    let dfsVisited=[]  // 

    for(let i=0;i<rows;i++){
        let visitedRow=[];
        let dfsVisitedRow=[];

        for(let j=0;j<cols;j++){

            visitedRow.push(false);
            dfsVisited.push(false);

        }
    }

    for( let i=0;i<rows;i++){
        for(let j=0;i< cols;j++){
            dfsCycledetection(adj, i, j, visited, dfsVisited);


        }
    }



}

// start -> vis(TRUE) dfsVis(TRUE)
// end -> dfsVis(FALSE) 
// if vis[i][j]-> already explored path , so back to explore page again
// cyc=le detection -> if (vis[i][j]==treu && dfsvis[i][j]==true) cycle detected
function dfsCycledetection(adj, i, j, visited, dfsVisited){

    visited[i][j]=true;
    dfsVisited[i][j]=true;

    // A1 -> [[0,1], [2,0] [2,3]......]
    for( let children=0;children<adj[i][j].length;children++){
        let [crid, ccid]= adj[i]
        
    }

    dfsVisited[i][j]=false;



}