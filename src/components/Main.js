import React, { useState, useCallback, useRef } from 'react'
import produce from 'immer'

import Grid from "./Grid"
import Settings from "./Settings"
import About from "./About"
import Rules from "./Rules"


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
    const [numRows, setNumRows] = useState(25)
    const [numCols, setNumCols] = useState(25)
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
    const [currSpeed, setCurrSpeed] = useState("medium")
    // eslint-disable-next-line
    const [isStable, setIsStable] = useState(false)
    const [singleStep, setSingleStep] = useState(false)
    const [aliveColor, setAliveColor] = useState("green")
    const [deadColor, setDeadColor] = useState("pink")
    const [borderColor, setBorderColor] = useState("black")

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
            <About />
            <div>
                {/* start of settings above grid */}
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
            </div>
            <Rules />

        </div>

    )
}

export default Main