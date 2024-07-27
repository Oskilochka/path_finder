import {
    getAllNodes,
    sortNodesByDistance,
    updateNeighbors
} from "helpers";
import { Grid, NodeType } from "general/types";

export function dijkstra(board: Grid, startNode: NodeType, finishNode: NodeType) {
    const visitedNodes = [];

    startNode.distance = 0;

    const unvisitedNodes = getAllNodes( board );

    while ( unvisitedNodes?.length ) {
        sortNodesByDistance( unvisitedNodes );

        const closestNode: NodeType = unvisitedNodes.shift() || {
            col: -1,
            row: -1,
            isStart: false,
            isEnd: false,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            prevNode: null,
        };

        if ( closestNode?.distance === Infinity ) return visitedNodes;
        if ( closestNode?.isWall ) continue;

        closestNode.isVisited = true;
        visitedNodes.push( closestNode );

        if ( closestNode === finishNode ) return visitedNodes;
        updateNeighbors( closestNode, board );
    }

    return visitedNodes;
}
