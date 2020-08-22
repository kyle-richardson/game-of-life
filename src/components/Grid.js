import React from 'react'
import produce from "immer"

const Grid = ({
    numCols, numRows, running, setGrid, grid, aliveColor, deadColor, borderColor
}) => {
    return (
        <div className="grid-container">
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${numCols}, 20px)`,
                gridTemplateRows: `repeat(${numRows}, 20px)`,
                justifyContent: 'center',
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
                                width: 20,
                                height: 20,
                                backgroundColor: grid[i][k] ? aliveColor : deadColor, //green if alive
                                border: `solid 1px ${borderColor}`
                            }}>
                        </div>))
                }
            </div>
        </div>

    )
}

export default Grid