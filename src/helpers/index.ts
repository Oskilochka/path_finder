import { Grid, NodeType } from "general/types";

export function sortNodesByDistance(unvisitedNodes: NodeType[]) {
    unvisitedNodes.sort( (nodeA: NodeType, nodeB: NodeType) => nodeA.distance - nodeB.distance );
}

export function getNeighbors(node: NodeType, grid: Grid) {
    const neighbors: NodeType[] = [];
    const { col, row } = node;

    if ( row > 0 ) neighbors.push( grid[row - 1][col] );
    if ( row < grid.length - 1 ) neighbors.push( grid[row + 1][col] );
    if ( col > 0 ) neighbors.push( grid[row][col - 1] );
    if ( col < grid[0].length - 1 ) neighbors.push( grid[row][col + 1] );

    return neighbors.filter( n => !n.isVisited );
}

export function getAllNodes(grid: Grid) {
    const nodes = [];

    for ( const row of grid ) {
        for ( const node of row ) {
            nodes.push( node );
        }
    }

    return nodes;
}

export function updateNeighbors(node: NodeType, grid: Grid) {
    const neighbors: NodeType[] = getNeighbors( node, grid );

    for ( const neighbor of neighbors ) {
        neighbor.distance = node.distance + 1;
        neighbor.prevNode = node;
    }
}

export function getGridWithWallToggled(grid: Grid, row: number, col: number) {
    const newGrid = grid.slice();
    const node = grid[row][col];

    newGrid[row][col] = { ...node, isWall: !node.isWall };

    return newGrid;
}

export const getNodesInShortestPathOrder = (endNode: NodeType) => {
    const nodesInShortestPathOrder = [];
    let currentNode: NodeType | null = endNode;
    while ( currentNode !== null ) {
        nodesInShortestPathOrder.unshift( currentNode );
        currentNode = currentNode.prevNode;
    }
    return nodesInShortestPathOrder;
};
