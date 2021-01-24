export function dijkstra (grid, startNode, finishNode){

    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid); 
    while (!!unvisitedNodes.length){

        sortNodesByDistance (unvisitedNodes);
        const closestNode = unvisitedNodes. shift();
        if (closestNode.isWall) continue; 
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbour (grid, closestNode);

    }
}

function getAllNodes (grid) {

    const nodes = []; 
    for (const row of grid) {
        for (const node of row) {
            nodes.push (node);
        }
    }
    return nodes;
}

function sortNodesByDistance (unvisitedNodes) { 
    unvisitedNodes. sort ((nodeA, nodeB) => nodeA.distance - nodeB. distance);
    }
    
function updateUnvisitedNeighbour (grid, closestNode) {
    
    const neighbours = [];
    const row = closestNode. row;
    const col = closestNode.col;

    if (row > 0) neighbours.push(grid[row - 1][col]); 
    if (row < grid.length - 1) neighbours.push (grid[row + 1] [col]);
    if (col > 0) neighbours.push (grid[row][col - 1]);
    if (col < grid[0] .length - 1) neighbours. push (grid[row] [col + 1]);
    const unvisitedNeighbour = neighbours.filter (neighbour => !neighbour.isVisited) 
    for (const neighbour of unvisitedNeighbour) {    
        neighbour.distance = closestNode.distance + 1;
        neighbour.previousNode = closestNode;
    }
}

export function getNodesInShortestPathOrder (startNode, finishNode){
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    console.log (startNode. previousNode);
    while (currentNode!=null) {
        nodesInShortestPathOrder.unshift (currentNode); 
        currentNode = currentNode.previousNode;
    }
    console.log ("nodes in Shortest Path" + nodesInShortestPathOrder);
    return nodesInShortestPathOrder;
}
