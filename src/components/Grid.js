import React from 'react'
import produce from "immer"

const Grid = ({
    numCols,
    numRows,
    running,
    setGrid,
    grid,
    aliveColor,
    deadColor,
    borderColor
}) => {
    return (
        <div className="grid-container">
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${numCols}, ${600 / numCols}px)`,
                gridTemplateRows: `repeat(${numRows}, ${600 / numCols}px)`,
                justifyContent: 'center',
                alignItems: 'center',
                width: 600
            }}>
                {grid.map((rows, i) =>
                    rows.map((col, k) =>
                        <div
                            key={`[${i}][${k}]`}
                            onClick={() => {
                                const newGrid = produce(grid, gridCopy => {
                                    gridCopy[i][k] = !running ? (grid[i][k] ? 0 : 1) : grid[i][k] // if not currently running simulation, clicking squares will toggle alive or dead
                                })
                                setGrid(newGrid)
                            }}
                            style={{
                                width: Math.floor(600 / numCols),
                                height: Math.floor(600 / numRows),
                                backgroundColor: grid[i][k] ? aliveColor : deadColor,
                                border: `solid 1px ${borderColor}`
                            }}>
                        </div>))
                }
            </div>
        </div>

    )
}

export default Grid