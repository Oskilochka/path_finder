import { Coordinate, Grid, NodeType } from "./types";

export function createNode(row: number, col: number, isStart: boolean, isEnd: boolean): NodeType {
    return {
        col,
        row,
        isStart,
        isEnd,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        prevNode: null,
    };
}

function isSameCoordinate(nodeA: Coordinate, nodeB: Coordinate) {
    return nodeA.col === nodeB.col && nodeA.row === nodeB.row;
}

export function createGrid(
    height: number,
    width: number,
    startNode: Coordinate,
    endNode: Coordinate
) {
    const nodes: Grid = [];

    for ( let row = 0; row < height; row++ ) {
        const currentRow: NodeType[] = [];

        for ( let col = 0; col < width; col++ ) {
            const isStart = isSameCoordinate( startNode, { col, row } );
            const isEnd = isSameCoordinate( endNode, { col, row } );

            currentRow.push( createNode( row, col, isStart, isEnd ) );
        }
        nodes.push( currentRow );
    }

    return nodes;
}
