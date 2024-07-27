import React from "react";
import { NodeType } from "general/types";
import "./styles.css";

type NodeProps = {
    node: NodeType,
    onClick: (row: number, col: number) => void
};

export const Node = ({ node, onClick }: NodeProps) => {
    const { row, col, isStart, isEnd, isWall } = node;

    const extraClassName = isStart
        ? "node-start"
        : isEnd
            ? "node-end"
            : isWall
                ? "node-wall"
                : "";

    return (
        <div
            id={ `node-${ row }-${ col }` }
            className={ `node ${ extraClassName }` }
            onClick={ () => onClick(row, col) }
        />
    );
};
