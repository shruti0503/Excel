// storage making adjacent c list
let adj=[];

for( let i=0;i<100;i++){
    let row=[];
    for(let j=0;j<26;j++){
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
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);

    }

    for( let i=0;i<rows;i++){
        for(let j=0;i< cols;j++){
            if(visited[i][j]==false){
                let response=dfsCycledetection(adj, i, j, visited, dfsVisited);
                if (response==true) return true;

            }
           
        }
    }

    return false;



}

// start -> vis(TRUE) dfsVis(TRUE)
// end -> dfsVis(FALSE) 
// if vis[i][j]-> already explored path , so back to explore page again
// cyc=le detection -> if (vis[i][j]==treu && dfsvis[i][j]==true) cycle detected
// returns true or false
function dfsCycledetection(adj, i, j, visited, dfsVisited){

    visited[i][j]=true;
    dfsVisited[i][j]=true;

    // A1 -> [[0,1], [2,0] [2,3]......]
    for( let children=0;children<adj[i][j].length;children++){
      
       let [crid, ccid]=adj[i][j][children];

       if(visited[crid][ccid]=== false){
        let response=dfsCycledetection(adj, crid, ccid, visited, dfsVisited);
        if(response ===true) return true; // found cycle so return immediatley , no need to explore more path
       }
       else if(visited[crid][ccid]===true && dfsVisited[crid][ccid]===true){
        return true; // found cycle return immedalty
       }

    }
    dfsVisited[i][j]=false;
    return false;

}