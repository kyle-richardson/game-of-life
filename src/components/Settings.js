import React from 'react'
import produce from "immer"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'


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
            <Button
                style={{ marginBottom: "10px" }}
                disableRipple
                disableElevation
                size="small"
                color={running ? "secondary" : "primary"}
                variant="contained"
                onClick={async () => {
                    await setRunning(!running) //async to prevent race case with simulation 
                    runSimulation()
                }}>
                {running ? 'Stop' : 'Start'}
            </Button>
            <Button style={{ marginBottom: "10px" }}
                disableRipple
                disableElevation
                size="small"
                color="secondary"
                variant="outlined"
                onClick={
                    () => {
                        setGrid(createEmptyGrid())
                        setGeneration(0)
                        setRunning(false)
                    }
                }>
                Clear
            </Button>
            <Button

                style={{ marginBottom: "10px" }}
                disableRipple
                disableElevation
                size="small"
                // color="primary"
                variant="outlined"
                onClick={() => {
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
            </Button>
            <Button

                style={{ marginBottom: "10px" }}
                disableRipple
                disableElevation
                size="small"
                // color="primary"
                variant="outlined"
                onClick={async () => {
                    await setRunning(true)
                    await setSingleStep(true)
                    runSimulation()
                }}>
                Step
            </Button>
            <Button

                style={{ marginBottom: "10px" }}
                disableRipple
                disableElevation
                size="small"
                // color="primary"
                variant="outlined"
                onClick={() => {
                    setGrid(originalGrid)
                    setGeneration(0)
                    setRunning(false)
                }}>Original
            </Button>
            <Button

                style={{ marginBottom: "10px" }}
                disableRipple
                disableElevation
                size="small"
                // color="primary"
                variant="outlined"
                onClick={() => {
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
                }}>Invert
            </Button>
            <Button

                style={{ marginBottom: "10px" }}
                disableRipple
                disableElevation
                size="small"
                // color="primary"
                variant="outlined"
                onClick={() => {
                    const rows = []
                    for (let i = 0; i < Number(numRows); i++) {
                        rows.push(Array.from(Array(Number(numCols)), (c, k) => k === 0 || k === Number(numCols) - 1 || i === 0 || i === Number(numRows) - 1 ? 1 : 0))
                    }
                    setGrid(rows)
                    setRunning(false)
                    setGeneration(0)
                    setOriginalGrid(rows)
                }}>Preset: Square
            </Button>
            <Button

                style={{ marginBottom: "10px" }}
                disableRipple
                disableElevation
                size="small"
                // color="primary"
                variant="outlined"
                onClick={() => {
                    const rows = []
                    for (let i = 0; i < Number(numRows); i++) {
                        rows.push(Array.from(Array(Number(numCols)), (c, k) => i === k || i === Number(numCols) - 1 - k ? 1 : 0))
                    }
                    setGrid(rows)
                    setRunning(false)
                    setGeneration(0)
                    setOriginalGrid(rows)
                }}>Preset: X
            </Button>
            <Button

                style={{ marginBottom: "10px" }}
                disableRipple
                disableElevation
                size="small"
                // color="primary"
                variant="outlined"
                onClick={() => {
                    const rows = []
                    for (let i = 0; i < Number(numRows); i++) {
                        rows.push(Array.from(Array(Number(numCols)), (c, k) => i === Math.floor(Number(numRows) / 2) ? 1 : 0))
                    }
                    setGrid(rows)
                    setRunning(false)
                    setGeneration(0)
                    setOriginalGrid(rows)
                }}>Preset: line
                </Button>
            <Button

                style={{ marginBottom: "10px" }}
                disableElevation
                disableRipple
                size="small"
                // color="primary"
                variant="outlined"
                onClick={() => {
                    const rows = []
                    for (let i = 0; i < Number(numRows); i++) {
                        rows.push(Array.from(Array(Number(numCols)), (c, k) => i === Math.floor(Number(numRows) / 2) || k === Math.floor(Number(numCols) / 2) ? 1 : 0))
                    }
                    setGrid(rows)
                    setRunning(false)
                    setGeneration(0)
                    setOriginalGrid(rows)
                }}>Preset: cross
            </Button>
            <FormControl

                style={{ marginBottom: "10px" }} size="small" variant="outlined">
                <InputLabel>Speed</InputLabel>
                <Select
                    labelId="speed-label"
                    id="speed-select"
                    value={currSpeed}
                    onChange={(e) => setCurrSpeed(e.target.value)}
                    label="Speed"
                >
                    <MenuItem value="slow">Slow</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="fast">Fast</MenuItem>
                    <MenuItem value="faster">Faster</MenuItem>
                    <MenuItem value="fastest">Fastest</MenuItem>
                </Select>
            </FormControl>
            <FormControl style={{ marginBottom: "10px" }} size="small" variant="outlined">
                <InputLabel>Size</InputLabel>
                <Select
                    labelId="size-label"
                    id="size-select"
                    value={numRows}
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
                    label="Size"
                >
                    <MenuItem value={25}>25x25</MenuItem>
                    <MenuItem value={40}>40x40</MenuItem>
                    <MenuItem value={60}>60x60</MenuItem>
                    <MenuItem value={75}>75x75</MenuItem>
                </Select>
            </FormControl>
            <FormControl style={{ marginBottom: "10px" }} size="small" variant="outlined">
                <InputLabel>Live Cell Color</InputLabel>
                <Select
                    labelId="live-color-label"
                    id="live-color-select"
                    value={aliveColor}
                    onChange={(e) => {
                        setAliveColor(e.target.value)
                    }}
                    label="Live Cell Color"
                >
                    <MenuItem value="red">Red</MenuItem>
                    <MenuItem value="pink">Pink</MenuItem>
                    <MenuItem value="orange">Orange</MenuItem>
                    <MenuItem value="yellow">Yellow</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                    <MenuItem value="blue">Blue</MenuItem>
                    <MenuItem value="purple">Purple</MenuItem>
                    <MenuItem value="brown">Brown</MenuItem>
                    <MenuItem value="black">Black</MenuItem>
                    <MenuItem value="white">White</MenuItem>
                </Select>
            </FormControl>
            <FormControl style={{ marginBottom: "10px" }} size="small" variant="outlined">
                <InputLabel>Dead Cell Color</InputLabel>
                <Select
                    labelId="dead-color-label"
                    id="dead-color-select"
                    value={deadColor}
                    onChange={(e) => {
                        setDeadColor(e.target.value)
                    }}
                    label="Dead Cell Color"
                >
                    <MenuItem value="red">Red</MenuItem>
                    <MenuItem value="pink">Pink</MenuItem>
                    <MenuItem value="orange">Orange</MenuItem>
                    <MenuItem value="yellow">Yellow</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                    <MenuItem value="blue">Blue</MenuItem>
                    <MenuItem value="purple">Purple</MenuItem>
                    <MenuItem value="brown">Brown</MenuItem>
                    <MenuItem value="black">Black</MenuItem>
                    <MenuItem value="white">White</MenuItem>
                </Select>
            </FormControl>
            <FormControl style={{ marginBottom: "10px" }} size="small" variant="outlined">
                <InputLabel>Grid Border Color</InputLabel>
                <Select
                    labelId="grid-color-label"
                    id="grid-color-select"
                    value={borderColor}
                    onChange={(e) => {
                        setBorderColor(e.target.value)
                    }}
                    label="Grid Border Color"
                >
                    <MenuItem value="red">Red</MenuItem>
                    <MenuItem value="pink">Pink</MenuItem>
                    <MenuItem value="orange">Orange</MenuItem>
                    <MenuItem value="yellow">Yellow</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                    <MenuItem value="blue">Blue</MenuItem>
                    <MenuItem value="purple">Purple</MenuItem>
                    <MenuItem value="brown">Brown</MenuItem>
                    <MenuItem value="black">Black</MenuItem>
                    <MenuItem value="white">White</MenuItem>
                </Select>
            </FormControl>
            <form onSubmit={async (e) => {
                e.preventDefault()
                await setRunning(true)
                await setGeneration(0)
                await setGrid(originalGrid)
                runSimulation(generation)

            }}>
                <TextField
                    onFocus={() => {
                        setRunning(false)
                    }}
                    size="small"
                    id="generation-input"
                    label="Generation"
                    variant="outlined"
                    onChange={(e) => {
                        setGeneration(e.target.value)
                    }}

                    value={generation} />
                <Button type="submit" variant="outlined" color="primary">Go</Button>
            </form>
        </div >

    )
}

export default Settings