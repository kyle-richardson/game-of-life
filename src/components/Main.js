import React, { useState, useCallback, useRef } from 'react'
import produce from 'immer'
import { useLocalStorage } from "../utils/useLocalStorage"

import Grid from "./Grid"
import Settings from "./Settings"


const gridNeighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
]
const speeds = {
    'slow': 1000,
    'medium': 500,
    'fast': 250,
    'faster': 50,
    'fastest': 10
}


const Main = () => {
    const [numRows, setNumRows] = useLocalStorage("numRows", 25)
    const [numCols, setNumCols] = useLocalStorage("numCols", 25)
    const [generation, setGeneration] = useState(0)
    const createEmptyGrid = () => {
        const rows = []
        for (let i = 0; i < Number(numRows); i++) {
            rows.push(Array.from(Array(Number(numCols)), () => 0)) // 0 means dead, 1 means alive. setting all to 0 is clearing/making empty grid
        }
        return rows
    }
    const [grid, setGrid] = useState(createEmptyGrid())
    const [originalGrid, setOriginalGrid] = useState(grid)
    const [previousGrid, setPreviousGrid] = useState()
    const [running, setRunning] = useState(false)
    const [currSpeed, setCurrSpeed] = useLocalStorage("currSpeed", "medium")
    // eslint-disable-next-line
    const [isStable, setIsStable] = useState(false)
    const [singleStep, setSingleStep] = useState(false)
    const [aliveColor, setAliveColor] = useLocalStorage("aliveColor", "green")
    const [deadColor, setDeadColor] = useLocalStorage("deadColor", "pink")
    const [borderColor, setBorderColor] = useLocalStorage("borderColor", "black")

    const runningRef = useRef(running);
    runningRef.current = running

    const speedRef = useRef(currSpeed)
    speedRef.current = currSpeed

    const generationRef = useRef(generation)
    generationRef.current = generation

    const isStableRef = useRef(isStable)
    isStableRef.current = previousGrid === grid

    const singleStepRef = useRef(singleStep)
    singleStepRef.current = singleStep

    const gridRef = useRef(grid)
    gridRef.current = grid

    const rowsRef = useRef(numRows)
    rowsRef.current = numRows

    const colsRef = useRef(numCols)
    colsRef.current = numCols


    const makeNewGrid = (currGrid) => {
        return produce(currGrid, gridCopy => {
            for (let i = 0; i < Number(rowsRef.current); i++) {
                for (let k = 0; k < Number(colsRef.current); k++) {
                    let neighbors = 0;
                    gridNeighbors.forEach(([x, y]) => { //generating list of neighbors for each cell
                        const newI = i + x
                        const newK = k + y;
                        if (newI >= 0 && newI < Number(rowsRef.current) && newK >= 0 && newK < Number(colsRef.current)) { //off grid edges are considered dead
                            neighbors += currGrid[newI][newK]
                        }
                    })
                    if (neighbors < 2 || neighbors > 3) { //rule: if num neighbors < 2 or > 3, that cell dies (changes from 1 to 0)
                        gridCopy[i][k] = 0
                    }
                    else if (currGrid[i][k] === 0 && neighbors === 3) { // rules: if cell is dead but has 3 neighbors, cell becomes alive
                        gridCopy[i][k] = 1
                    }

                }
            }
        })
    }

    /* run Simulation to calculate next generation cells.  parameter is used for recursive call to find nth term, but otherwise is not used*/

    const runSimulation = useCallback((n = -1) => {

        if (!runningRef.current || isStableRef.current || n === 0) {
            setRunning(false)
            return
        }
        if (generationRef.current === 0) {
            setOriginalGrid(gridRef.current)
        }
        setPreviousGrid(gridRef.current)
        setGeneration(generationRef.current + 1)
        const newGrid = makeNewGrid(gridRef.current)
        setGrid(newGrid)
        if (singleStepRef.current) {
            setSingleStep(false)
            setRunning(false)
        }
        else if (n >= 1) {
            runSimulation(n - 1)
            setRunning(false)
        }
        else if (n < 0) {
            setTimeout(runSimulation, speeds[speedRef.current])
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div className="main-container">
            {/* start of grid */}
            <Grid
                numCols={numCols}
                numRows={numRows}
                running={running}
                setGrid={setGrid}
                grid={grid}
                aliveColor={aliveColor}
                deadColor={deadColor}
                borderColor={borderColor}
            />

            {/* start of settings for grid */}
            <Settings
                running={running}
                setRunning={setRunning}
                grid={grid}
                setGrid={setGrid}
                setGeneration={setGeneration}
                setCurrSpeed={setCurrSpeed}
                setNumCols={setNumCols}
                setNumRows={setNumRows}
                generation={generation}
                createEmptyGrid={createEmptyGrid}
                runSimulation={runSimulation}
                numRows={numRows}
                numCols={numCols}
                currSpeed={currSpeed}
                setSingleStep={setSingleStep}
                aliveColor={aliveColor}
                deadColor={deadColor}
                borderColor={borderColor}
                setAliveColor={setAliveColor}
                setDeadColor={setDeadColor}
                setBorderColor={setBorderColor}
                originalGrid={originalGrid}
                setOriginalGrid={setOriginalGrid}

            />
        </div>

    )
}

export default Main