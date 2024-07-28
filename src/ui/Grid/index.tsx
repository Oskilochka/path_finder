import React, { useState } from "react";
import * as d3 from "d3";
import { Grid, NodeType } from "general/types";
import { createGrid, resetGrid } from "general/utils";
import { dijkstra } from "algo/dijkstra";
import { getGridWithWallToggled, getNodesInShortestPathOrder } from "helpers";
import { Node } from "ui";
import "./styles.css";
import { Button } from "../Button";

const endNode = { row: 3, col: 3 };
const startNode = { row: 15, col:35 };
const initialGrid = createGrid( 20, 40, startNode, endNode );

export function GridComponent() {
    const [ grid, setGrid ] = useState<Grid>( initialGrid );

    const handleMouseDown = (row: number, col: number) => {
        const newGrid = getGridWithWallToggled( grid, row, col );
        setGrid( newGrid );
    };

    const handleVisualizeDijkstra = () => {
        const start = grid[startNode.row][startNode.col];
        const end = grid[endNode.row][endNode.col];

        const visitedNodesInOrder = dijkstra( grid, start, end );
        const nodesInShortestPathOrder = getNodesInShortestPathOrder( end );

        animateDijkstra( visitedNodesInOrder, nodesInShortestPathOrder );
    };

    const animateDijkstra = (visitedNodesInOrder?: NodeType[], nodesInShortestPathOrder?: NodeType[]) => {
        if ( !visitedNodesInOrder ) return;

        for ( let i = 0; i <= visitedNodesInOrder.length; i++ ) {
            if ( i === visitedNodesInOrder.length ) {
                setTimeout( () => {
                    animateShortestPath( nodesInShortestPathOrder );
                }, 10 * i );
                return;
            }
            setTimeout( () => {
                const node = visitedNodesInOrder[i];
                d3.select( `#node-${ node.row }-${ node.col }` )
                    .transition()
                    .duration( 200 )
                    .style( "background-color", "lightblue" );
            }, 10 * i );
        }
    };

    const animateShortestPath = (nodesInShortestPathOrder?: NodeType[]) => {
        if ( !nodesInShortestPathOrder ) return;

        for ( let i = 0; i < nodesInShortestPathOrder.length; i++ ) {
            setTimeout( () => {
                const node = nodesInShortestPathOrder[i];
                d3.select( `#node-${ node.row }-${ node.col }` )
                    .transition()
                    .duration( 200 )
                    .style( "background-color", "yellow" );
            }, 50 * i );
        }
    };

    const handleClear = () => {
        const newGrid = resetGrid(grid);
        debugger
        setGrid(newGrid);
    }

    return (
        <div className={"wrapper"}>
            <div className={"actionWrapper"}>
                <Button onClick={ handleVisualizeDijkstra }>Visualize</Button>
                <Button onClick={ handleClear }>Clear</Button>
            </div>

            <div className="grid">
                {
                    grid.map( (row: NodeType[], rowIdx: number) => {
                        return (
                            <div key={ rowIdx } className="row">
                                { row.map( (node, nodeIdx) =>
                                    (
                                        <Node
                                            key={ nodeIdx }
                                            node={ node }
                                            onClick={handleMouseDown}
                                        ></Node>
                                    ) ) }
                            </div>
                        );
                    } )
                }
            </div>
        </div>
    );
}
