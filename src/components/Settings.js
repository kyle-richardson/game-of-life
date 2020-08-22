import React from 'react'
import produce from "immer"

const Settings = ({
    setRunning,
    running,
    runSimulation,
    grid,
    setGrid,
    setGeneration,
    setCurrSpeed,
    createEmptyGrid,
    setNumRows,
    setNumCols,
    generation,
    numRows,
    numCols,
    currSpeed,
    setSingleStep,
    aliveColor,
    deadColor,
    borderColor,
    setAliveColor,
    setDeadColor,
    setBorderColor,
    originalGrid,
    setOriginalGrid

}) => {
    return (
        <div className="selectors-container">
            <button
                onClick={async () => {
                    await setRunning(!running) //async to prevent race case with simulation 
                    runSimulation()
                }}>
                {running ? 'Stop' : 'Start'}
            </button>
            <button onClick={
                () => {
                    setGrid(createEmptyGrid())
                    setGeneration(0)
                    setRunning(false)
                }
            }>
                Clear
            </button>
            <button onClick={() => {
                const rows = []
                for (let i = 0; i < Number(numRows); i++) {
                    rows.push(Array.from(Array(Number(numCols)), () => Math.random() > .75 ? 1 : 0)) //.8 here makes it less alive sqaures than .5 would (more sparse).
                }
                setGrid(rows)
                setRunning(false)
                setGeneration(0)
                setOriginalGrid(rows)
            }}>
                Random
            </button>
            <button onClick={async () => {
                await setRunning(true)
                await setSingleStep(true)
                runSimulation()
            }}>
                Step
            </button>
            <button onClick={() => {
                setGrid(originalGrid)
                setGeneration(0)
                setRunning(false)
            }}>Original</button>
            <button onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                    for (let i = 0; i < Number(numRows); i++) {
                        for (let k = 0; k < Number(numCols); k++) {
                            gridCopy[i][k] = grid[i][k] === 1 ? 0 : 1
                        }
                    }
                })
                setGrid(newGrid)
                setRunning(false)
                setGeneration(0)
                setOriginalGrid(newGrid)
            }}>Invert</button>
            <button onClick={() => {
                const rows = []
                for (let i = 0; i < Number(numRows); i++) {
                    rows.push(Array.from(Array(Number(numCols)), (c, k) => k === 0 || k === Number(numCols) - 1 || i === 0 || i === Number(numRows) - 1 ? 1 : 0))
                }
                setGrid(rows)
                setRunning(false)
                setGeneration(0)
                setOriginalGrid(rows)
            }}>Preset: Square</button>
            <button onClick={() => {
                const rows = []
                for (let i = 0; i < Number(numRows); i++) {
                    rows.push(Array.from(Array(Number(numCols)), (c, k) => i === k || i === Number(numCols) - 1 - k ? 1 : 0))
                }
                setGrid(rows)
                setRunning(false)
                setGeneration(0)
                setOriginalGrid(rows)
            }}>Preset: X</button>
            <button onClick={() => {
                const rows = []
                for (let i = 0; i < Number(numRows); i++) {
                    rows.push(Array.from(Array(Number(numCols)), (c, k) => i === Math.floor(Number(numRows) / 2) ? 1 : 0))
                }
                setGrid(rows)
                setRunning(false)
                setGeneration(0)
                setOriginalGrid(rows)
            }}>Preset: line</button>
            <button onClick={() => {
                const rows = []
                for (let i = 0; i < Number(numRows); i++) {
                    rows.push(Array.from(Array(Number(numCols)), (c, k) => i === Math.floor(Number(numRows) / 2) || k === Math.floor(Number(numCols) / 2) ? 1 : 0))
                }
                setGrid(rows)
                setRunning(false)
                setGeneration(0)
                setOriginalGrid(rows)
            }}>Preset: cross</button>
            <select
                name="Speed"
                onChange={(e) => setCurrSpeed(e.target.value)}
                value={currSpeed}>
                <option value="slow">Slow</option>
                <option value="medium">Medium</option>
                <option value="fast">Fast</option>
                <option value="faster">Faster</option>
                <option value="fastest">Fastest</option>
            </select>
            <select //todo, not working to change size of grid currently
                name="Size"
                onChange={(e) => {
                    setNumRows(e.target.value)
                    setNumCols(e.target.value)
                    const rows = []
                    for (let i = 0; i < Number(e.target.value); i++) {
                        rows.push(Array.from(Array(Number(e.target.value)), () => 0))
                    }
                    setGrid(rows)
                    setRunning(false)
                    setGeneration(0)
                }}
            >
                <option value={25}>25x25</option>
                <option value={40}>40x40</option>
                <option value={60}>60x60</option>
                <option value={75}>75x75</option>
            </select>
            <select
                name="alive-color"
                onChange={(e) => {
                    setAliveColor(e.target.value)
                }}
                value={aliveColor}>
                <option value="red">Red</option>
                <option value="pink">Pink</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="brown">Brown</option>
                <option value="black">Black</option>
                <option value="white">White</option>
            </select>
            <select
                name="dead-color"
                onChange={(e) => {
                    setDeadColor(e.target.value)
                }}
                value={deadColor}>
                <option value="red">Red</option>
                <option value="pink">Pink</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="brown">Brown</option>
                <option value="black">Black</option>
                <option value="white">White</option>
            </select>
            <select
                name="border-color"
                onChange={(e) => {
                    setBorderColor(e.target.value)
                }}
                value={borderColor}>
                <option value="red">Red</option>
                <option value="pink">Pink</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="brown">Brown</option>
                <option value="black">Black</option>
                <option value="white">White</option>
            </select>
            <form onSubmit={async (e) => {
                e.preventDefault()
                await setRunning(true)
                await setGeneration(0)
                await setGrid(originalGrid)
                runSimulation(generation)

            }}>
                <label>Generation:</label>
                <input type="text" name="generation" onFocus={() => {
                    setRunning(false)
                }}
                    onChange={(e) => {
                        setGeneration(e.target.value)
                    }}

                    value={generation} />
                <button type="submit">Go</button>
            </form>
        </div >

    )
}

export default Settings