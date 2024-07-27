export type Coordinate = {
    col: number,
    row: number
}

export type NodeType = {
    col: number
    row: number
    isVisited: boolean,
    isWall: boolean,
    distance: number,
    prevNode: NodeType | null,
    isStart: boolean,
    isEnd: boolean
}

export type Grid = NodeType[][]
