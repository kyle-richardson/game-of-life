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
    const gridWidth = 600
    return (
        <div className="grid-container">
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${numCols}, ${gridWidth / numCols}px)`,
                gridTemplateRows: `repeat(${numRows}, ${gridWidth / numRows}px)`,
                justifyContent: 'center',
                alignItems: 'center',
                width: gridWidth
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
                                width: Math.floor(gridWidth / numCols),
                                height: Math.floor(gridWidth / numRows),
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