// JavaScript source code let flag = false;

let flag = false;
export function DFS(grid, node, visitedNodesInOrder){
    visitedNodesInOrder.push(node);
    node.isVisited = true;
    const newGrid = grid.slice(); 
    const newNode = {
        ...node,
        isVisited: true,
    };
    newGrid[node.row][node.col] = newNode;
    const row = node.row; 
    const col = node.col;
    if (node.isFinish) {
        flag = true;
        return visitedNodesInOrder;
    }
    if (row > 0 && !grid[row - 1] [col].isWall && !grid[row - 1] [col].isVisited && !flag) DFS (newGrid, grid[row - 1] [col], visitedNodesInOrder, flag)
    if (col > 0 && !grid[row][col - 1].isWall && !grid[row][col - 1].isVisited && !flag) DFS (newGrid, grid[row][col - 1], visitedNodesInOrder, flag); 
    if (row < grid.length - 1 && !grid[row + 1] [col].isWall && !grid[row + 1][col].isVisited && !flag) DFS (newGrid, grid[row + 1] [col],visitedNodesInOrder, flag);
    if (col < grid[0].length - 1 && !grid[row][col + 1] .isWall && !grid[row][col + 1] .isVisited && !flag) DFS (newGrid, grid[row] [col + 1], visitedNodesInOrder, flag);
    
    return visitedNodesInOrder;
}
