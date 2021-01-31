import React, { Component } from 'react';
import './Node.css';

export default class Node extends Component{

render () {

const { row, col, isFinish, isStart, isVisitedAnimation, isShortestAnimation, isWall, onMouseDown, onMouseEnter, onMouseUp, heuristicDist, distAstar} = this.props;
const extraclassName = isFinish
    ? 'Node-finish'
    :isStart
        ? 'Node-start'
        : isVisitedAnimation
            ? 'Node-visited'
            : isShortestAnimation
                ? 'Node-shortest' 
                : isWall
                    ?'Node-wall'
                    :'';
            return <div className={ `Node ${extraclassName}`} 
                onMouseDown={ () => onMouseDown (row, col)} 
                onMouseEnter={() => onMouseEnter(row, col)} 
                onMouseUp={ () => onMouseUp () }> </div >;
}
}

export const DEFAULT_NODE = {
    row:0,
    col:0,
}
