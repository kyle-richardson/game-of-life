import React, { useState } from 'react'
import Grid from "./Grid"
import produce from 'immer'

const numRows = 50
const numCols = 50

const Main = () => {
    const [grid, setGrid] = useState(() => {
        const rows = []
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0))
        }
        return rows
    })
    return (
        <div classname="main-container" style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}>
            <h1>The Game of Life</h1>
            <Grid />
            {grid.map((rows, i) =>
                rows.map((col, k) =>
                    <div
                        key={`${i}-${k}`}
                        onClick={() => {
                            setGrid(produce())
                            grid[i][k] = 1
                        }}
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: grid[i][k] ? "green" : undefined,
                            border: "solid 1px black"
                        }}>
                    </div>))
            }
        </div>

    )
}

export default Main