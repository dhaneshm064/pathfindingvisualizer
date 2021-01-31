export function Astar ( startNode, endNode, grid, NUMBER_OF_ROWS, NUMBER_OF_COLS) {

    console.log (NUMBER_OF_ROWS, NUMBER_OF_COLS); 
    const newGrid = Heuristic(endNode, grid, NUMBER_OF_ROWS,NUMBER_OF_COLS);
    const finalArray = visitedNodesInOrderAstar (startNode,endNode, newGrid);
    console.log ("Final Array");
    console.log (finalArray); 
    return [newGrid, finalArray];
}
    
function Heuristic (finishNode, grid, NUMBER_OF_ROWS,  NUMBER_OF_COLS) {
    const newGrid = [];
    for (let row = 0; row < NUMBER_OF_ROWS; row++) { 
        const currentRow = [];
        for (let col = 0; col < NUMBER_OF_COLS; col++) { 
            const node = grid[row][col];
            if (node.isWall) {
                 node.heuristicDist = 9999;
            }
            else {    
                let totalDist = calculateHeuristicDist(node, finishNode);
                node.heuristicDist = totalDist;
             }
            grid[row][col] = node;   
        }    // currentRow.push (currentNode):
            // console.log (currentRow); // newGrid.push(currentRow);
        } 
        return grid;
        
    }

function calculateHeuristicDist (node, finishNode)
    {
        const destRow = finishNode.row;
        const destCol = finishNode.col;
        const row = node.row;
        const col = node.col;
    
        let rowDist = destRow - row;
        if (rowDist < 0)
            rowDist = rowDist * -1;
        let colDist = destCol - col; 
        if (colDist < 0)
            colDist = colDist * -1; 
        return (rowDist + colDist);
    
    }
    
function visitedNodesInOrderAstar(startNode, endNode, grid){
    let finalArray = [];
    let leastValueNode = startNode;
    let sortedNodeArray = []; 
    leastValueNode.distance = 0;
    sortedNodeArray.push(leastValueNode);
    console.log (endNode.row, endNode.col);
    console.log (startNode.row, startNode.col);
    while (!leastValueNode.isFinish || sortedNodeArray.length == 0) {
        //for (let i = 0; i < 10; i++) {


        //CHECK ALL NEIGHBOURS OF CURRENT NODE UPDATE DISTANCE AND HEURISTIC
        //PUSH ALL NEIGHBOURS TO ARRAY SORT THE ARRAY AS PER THE SUM
        //POP THE FIRST ELEMENT MARK IT AS VISITED 
        //CHECK FOR ALL NEIGHBOURS AND AGAIN SORT
        leastValueNode = sortedNodeArray[0];
        sortedNodeArray.shift();

        if (!leastValueNode.isVisited) 
        {   
            leastValueNode.isVisited = true;
            finalArray.push(leastValueNode);
        }

        let row = leastValueNode.row;
        let col = leastValueNode.col;
        grid[row][col] = leastValueNode;
        var values = checkNeighbours (leastValueNode, sortedNodeArray, row, col, grid)
        grid = values[0];
        sortedNodeArray = values[1];
        console.log("Sorted Node Array");
        console.log(sortedNodeArray);
    }
    return finalArray;
}

function checkNeighbours (leastValueNode, sortedNodeArray, row, col, grid) {
    
    if (row > 0 && !grid[row - 1][col].isVisited && !grid[row - 1][col].isWall && sortedNodeArray.indexOf(grid[row - 1][col]) === -1) 
    {
        grid[row - 1][col] = updateAstarDistance (grid, leastValueNode, grid[row - 1][col]) 
        sortedNodeArray.push(grid[row - 1][col]);
    }
    
    if (row < grid.length - 1 && !grid[row + 1][col].isVisited && !grid[row + 1][col].isWall && sortedNodeArray.indexOf(grid[row + 1][col]) === -1) 
    {    
        grid[row + 1][col] = updateAstarDistance (grid, leastValueNode, grid[row + 1][col]) 
        sortedNodeArray.push (grid[row + 1][col]);
    }
    if (col > 0 && !grid[row][col - 1].isVisited && !grid[row][col - 1].isWall & sortedNodeArray.indexOf(grid[row ][col - 1]) === -1) 
    { 
        grid[row][col - 1] = updateAstarDistance (grid, leastValueNode, grid[row][col - 1])
        sortedNodeArray.push(grid[row][col-1]);
    }

    if(col < grid[0].length - 1 && !grid[row][col + 1].isVisited && !grid[row][col + 1].isWall && sortedNodeArray.indexOf(grid[row][col + 1]) === -1) 
    { 
        grid[row][col + 1] = updateAstarDistance (grid,leastValueNode, grid[row][col + 1]) 
        sortedNodeArray.push(grid[row][col + 1]);
    }
    
    sortedNodeArray = sortedNodeArray.sort(function (a, b) { 
        return a.distAstar - b.distAstar;
    }) ;
    return [grid, sortedNodeArray];
}

function updateAstarDistance (grid, leastValueNode, currentNode) {

    currentNode.previousNode = leastValueNode;
    currentNode.distance = leastValueNode.distance + 1;
    currentNode.distAstar = currentNode.distance + currentNode.heuristicDist;
    return currentNode;
}
    
export function getNodesInShortestPathOrder (startNode, finishNode) {
    
    const nodesInShortestPathOrder = []; 
    let currentNode = finishNode;
    console.log(startNode.previousNode);
    
    while (currentNode != null) {
    nodesInShortestPathOrder.unshift (currentNode);
    currentNode = currentNode.previousNode;
    }
    console.log ("nodes in Shortest Path" + nodesInShortestPathOrder); 
    return nodesInShortestPathOrder;
    
}