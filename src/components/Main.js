import React, { useState, useCallback, useRef } from 'react'
import Grid from "./Grid"
import Settings from "./Settings"
import produce from 'immer'

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
    'super_fast': 50
}


const Main = () => {
    const [numRows, setNumRows] = useState(25)
    const [numCols, setNumCols] = useState(25)
    const [numGenerations, setNumGenerations] = useState(0)
    const createEmptyGrid = () => {
        const rows = []
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0)) // 0 means dead, 1 means alive. setting all to 0 is clearing/making empty grid
        }
        return rows
    }
    const [grid, setGrid] = useState(createEmptyGrid())
    const [originalGrid, setOriginalGrid] = useState(grid)
    const [previousGrid, setPreviousGrid] = useState()
    const [running, setRunning] = useState(false)
    const [currSpeed, setCurrSpeed] = useState("medium")
    const [isStable, setIsStable] = useState(false)
    const [singleStep, setSingleStep] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [nthTerm, setNthTerm] = useState(0)

    const runningRef = useRef(running); //able to use updated running state within callback function below
    runningRef.current = running

    const speedRef = useRef(currSpeed)
    speedRef.current = currSpeed

    const generationRef = useRef(numGenerations)
    generationRef.current = numGenerations

    const isStableRef = useRef(isStable)
    isStableRef.current = previousGrid == grid

    const singleStepRef = useRef(singleStep)
    singleStepRef.current = singleStep

    const nthTermRef = useRef(nthTerm)
    nthTermRef.current = nthTerm

    const isLoopingRef = useRef(isLooping)
    isLoopingRef.current = isLooping

    const runSimulation = useCallback(() => { //useCallback so this function is only created once, not on every re-render
        if (!runningRef.current || isStableRef.current) {
            return
        }

        if (generationRef.current === 0) {
            setOriginalGrid(grid)
        }
        setPreviousGrid(grid)
        setNumGenerations(generationRef.current + 1)
        const newGrid = (currGrid) => {
            return produce(currGrid, gridCopy => {
                for (let i = 0; i < numRows; i++) {
                    for (let k = 0; k < numCols; k++) {
                        let neighbors = 0;
                        gridNeighbors.forEach(([x, y]) => { //generating list of neighbors for each cell
                            const newI = i + x
                            const newK = k + y;
                            if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) { //off grid edges are considered dead
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
        setGrid(newGrid)
        if (singleStepRef.current) {
            setSingleStep(false)
            setRunning(false)
        }
        else if (nthTermRef.current !== 0 && !isLoopingRef.current) {
            setIsLooping(true)
            for (let i = 0; i < nthTerm; i++) {
                runSimulation()
            }
            setIsLooping(false)
        }
        else if (!isLoopingRef.current) {
            setTimeout(runSimulation, speeds[speedRef.current]) //relies on reference of speed, so changes state can be read by this function
        }

    }, [])
    return (
        <>
            {/* start of buttons and above grid */}
            <Settings
                running={runningRef.current}
                setRunning={setRunning}
                setGrid={setGrid}
                setNumGenerations={setNumGenerations}
                setCurrSpeed={setCurrSpeed}
                setNumCols={setNumCols}
                setNumRows={setNumRows}
                generation={generationRef.current}
                createEmptyGrid={createEmptyGrid}
                runSimulation={runSimulation}
                numRows={numRows}
                numCols={numCols}
                currSpeed={currSpeed}
                setSingleStep={setSingleStep}
                setNthTerm={setNthTerm}
            />
            {/* start of grid */}
            <Grid
                numCols={numCols}
                numRows={numRows}
                running={runningRef.current}
                setGrid={setGrid}
                grid={grid}
            />
        </>

    )
}

export default Main