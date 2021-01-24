import React, { Component } from 'react';

import Node from './Node/Node';

import './PathFindingVisualizer.css';

import { dijkstra, getNodesInShortestPathOrder} from './Algorithms/Dijkstra';

import { DFS } from './Algorithms/DFS.jsx';
//import { Astar } from './Algorithms/Astar';

const NUMBER_OF_ROWS = 20;
const NUMBER_OF_COLS = 50;

let START_NODE_ROW = 10;
let START_NODE_COL = 10;
let FINISH_NODE_ROW = 15;
let FINISH_NODE_COL = 30;

let WALL_BOOL = false;
let START = false;
let END = false;
let ALGO = false;
let WALL = false;

export default class PathfindingVisualizer extends Component {

    constructor (props){
        super(props);
        this.state = {
        grid: [],
        mouseIsPressed:  false,
    };
}

    handleMouseDown (row, col) {

        console.log (row, col, "mouseDown" + WALL_BOOL); 
        const { grid } = this.state;
    
        if (START === true) {
    
            const newGrid = grid. slice(); const startNode = newGrid[START_NODE_ROW] [START_NODE_COL]; 
            if (startNode.row === row && startNode.col === col)
            {

            }
            else {
    
                startNode.isStart = false;
    
                newGrid[START_NODE_ROW] [START_NODE_COL] = startNode;
                const newStartNode = newGrid[row][col];
    
                newStartNode.isStart = true;
                START = false;
                START_NODE_ROW = row;
                START_NODE_COL = col;
                const newNode = {
                    ...newStartNode,
                    isStart: true,
                };  
            newGrid[row][col] = newNode;    
            this.setState({ grid: newGrid, mouseIsPressed: true });
            }
        }
        else if (END === true) {
        
            const newGrid = grid.slice ();
            const endNode = newGrid[FINISH_NODE_ROW] [FINISH_NODE_COL];
        
            if (endNode.row === row && endNode.col === col){

            }
            else {
        
                endNode.isFinish = false;
                newGrid[FINISH_NODE_ROW] [FINISH_NODE_COL] = endNode;
                const newFinishNode = newGrid[row][col]; newFinishNode.isFinish = true;
                FINISH_NODE_ROW = row;
                FINISH_NODE_COL = col;
                const newNode = {
                    ...newFinishNode,
                    isFinish: true,
                };
        
                newGrid[row][col] = newNode;
                this.setState ({ grid: newGrid, mouseIsPressed: true });
                END = false;
            }
        }   
        else if (WALL === true && ALGO!=true) { 
            WALL_BOOL = !WALL_BOOL
            const newGrid = grid. slice();
            const node = newGrid[row] [col];
    
            const newNode = {
                ...node,
                isWall: !node.isWall,
            
            };
            newGrid[row][col] = newNode;
            this.setState({ grid: newGrid, mouseIsPressed: true });
        }
    }
        handleMouseEnter (row, col) {

            if (WALL_BOOL) 
            { 
                const { grid } = this.state;
                console.log (row, col, "mouseEnter");
        
                const newGrid = grid.slice(); 
                const node = newGrid[row][col];
        
                const newNode = {
                ...node,
                isWall: ! node.isWall,
                };
                newGrid[row][col] = newNode; 
                this.setState({ grid: newGrid });
            }
        }
    
    handleMouseUp() {
        this.setState ({ mouseIsPressed: false });
    }

    getNewGridWithWallToggled (grid, row, col) { 
        const newGrid = grid. slice (); 
        const node = newGrid[row] [col];    
        const newNode = {
            ...node,
            isWall: !node.isWall,
            };
            newGrid[row] [col] = newNode;
            return newGrid;
    
    }    
    componentDidMount () {

        const grid = [];
        for (let row = 0; row < NUMBER_OF_ROWS; row++) {
        const currentRow = [];
        for (let col = 0; col < NUMBER_OF_COLS; col++) 
        { 
            const currentNode = {
            col,
            row,
            isStart: (START_NODE_ROW === row && START_NODE_COL === col),
            isFinish: (FINISH_NODE_ROW === row && FINISH_NODE_COL === col),
            distance: Infinity,
            isVisited: false,
            isShortest: false,
            iswall: false,
            previousNode: null,
            isVisitedAnimation: false,
            heuristicDist: Infinity, 
            distAstar: Infinity,
            };
        currentRow.push (currentNode)
        }
        grid.push (currentRow) ;
    }
        console.log(grid)
        this.setState({grid})   
    }
    
    visualizeDijkstra(){
        WALL_BOOL = false;
        START = false;
        END = false;
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW] [START_NODE_COL] ;
        const finishNode = grid[FINISH_NODE_ROW] [FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra (grid, startNode,finishNode) ;
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(startNode, finishNode); 
        console.log (visitedNodesInOrder);
        this.animateVisitedAndShortestPath(visitedNodesInOrder, nodesInShortestPathOrder);
        ALGO = false;
        WALL = false;
    
    }

    visualizeDFS () {

        WALL_BOOL = false;
        START = false;
        END = false;
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW] [START_NODE_COL];
        const finishNode = grid [FINISH_NODE_ROW] [FINISH_NODE_COL];

        console.log(startNode);
        console.log (finishNode) ;

        let visitedNodesInOrder = [];
        visitedNodesInOrder = DFS (grid, startNode, visitedNodesInOrder);
        console.log(visitedNodesInOrder);
        this.animateVisitedAndShortestPath(visitedNodesInOrder, visitedNodesInOrder);
        ALGO = false;
        WALL = false;
    }

    resetBoard () {
        this.componentDidMount ();
        WALL_BOOL = false;
        START = false;
        END = false;
        ALGO = false;
        WALL = false;
    }
    
    
    animateVisitedAndShortestPath (visitedNodesInOrder, nodesInShortestPathorder) {
        
        for(let i = 0; i <= visitedNodesInOrder.length; i++) 
        { 
            setTimeout(() => {
                if (i === visitedNodesInOrder.length) { 
                    const grid = this.state.grid;
                    this.animateShortestPath(nodesInShortestPathorder, grid);
                }
                else{
                    const node = visitedNodesInOrder[i];
                    const newGrid = this.state.grid.slice();
                    const newNode = {
                        ...node,
                        isVisitedAnimation: true
                    };
                    newGrid[node.row][node.col] = newNode;
                    this.setState({ grid: newGrid });
                }
            }, 70 * i);
        }
    }

    visualizeAstar () {

        WALL_BOOL = false;
        START = false;
        END = false;
        let { grid } = this.state;
        const finishNode = grid[FINISH_NODE_ROW] [FINISH_NODE_COL]; 
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        var values
        //var values = Astar (startNode, finishNode, grid, 20, 50);
        let newGrid = values [0];
        let visitedNodesInOrder = values [1]; 
        let nodesInShortestPathOrder = getNodesInShortestPathOrder(startNode, finishNode);
        this.animateVisitedAndShortestPath(visitedNodesInOrder, nodesInShortestPathOrder);
        ALGO = false;
        WALL = false;
        this.setState({ grid: newGrid });
    }
    animateShortestPath (nodesInShortestPathOrder, grid) {

        console.log ("shortestPath") 
        console.log (nodesInShortestPathOrder)
        
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {

            setTimeout(() => {
        
                const node = nodesInShortestPathOrder[i];
                const newGrid = grid.slice();   
                const newNode = {
                    ...node,
                    isVisited: false,
                    isShortestAnimation: true,
                };
        
                newGrid[node.row][node.col] = newNode;
        
                this.setState ({ grid: newGrid });

            }, 200 * i);
        }
    }

    startNode(){
        START = true;
    }
    endNode(){
        END = true;
    }
    wall(){
        WALL = true;
    }

    render () {

        const { grid, mouseIsPressed } = this.state;
        
        return(
            <>
            <div className = "background">
                <div className = "top-bar">
                    <button className = "Button" onClick={() => this.startNode()}> 
                        StartNode 
                    </button>
                    <button className = "Button" onClick={() => this.endNode()}> 
                        EndNode 
                    </button>
                    <button className = "Button" onClick={() => this.wall()}> 
                        Wall 
                    </button>
                    <button className = "Button" onClick={() => this.visualizeDijkstra()}> 
                        Dijkstra's Algorithm
                    </button>
                    <button className = "Button" onClick={() => this.visualizeDFS()}> 
                        DFS Algorithm
                    </button>
                    <button className = "Button" onClick={() => this.visualizeAstar()}> 
                        A* Algorithm
                    </button>   
                    <button className = "Button" onClick={() => this.resetBoard()}> 
                        Reset Board
                    </button>
                    </div>
                    <div className = "grid">
                        {grid.map((row, rowIdx) => {
                            return (
                                <div key = {rowIdx}>
                                    {
                                        row.map((node, nodeIdx) => {
                                            const { row, col ,isStart, isFinish, isVisited, isWall, isShortestAnimation, isVisitedAnimation, heuristicDist, distAstar } = node;
                                            return(
                                               <Node key = {nodeIdx}
                                                    onClick
                                                    isStart = {isStart}
                                                    col = {col}
                                                    row = {row}
                                                    isFinish = {isFinish}
                                                    isVisited = {isVisited}
                                                    isShortestAnimation = {isShortestAnimation}
                                                    isVisitedAnimation = {isVisitedAnimation}
                                                    isWall = {isWall}
                                                    mouseIsPressed = {mouseIsPressed}
                                                    onMouseDown = {(row, col) => this.handleMouseDown(row, col)}
                                                    onMouseEnter = {(row, col) => this.handleMouseEnter(row, col)}
                                                    onMouseUp = {() => this.handleMouseUp()}
                                                    heuristicDist = {heuristicDist}
                                                    distAstar = {distAstar}
                                                    >
                                                    </Node>);
                                        })}
                                    </div>
                                    );
                                })}


                                </div>
                            </div>
                    </>
                );
            }

}
                    