import React from 'react'

const Settings = ({
    setRunning,
    running,
    runSimulation,
    setGrid,
    setNumGenerations,
    setCurrSpeed,
    createEmptyGrid,
    setNumRows,
    setNumCols,
    generation,
    numRows,
    numCols,
    currSpeed,
    setSingleStep,
    setNthTerm
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
                    setNumGenerations(0)
                    setRunning(false)
                }
            }>
                Clear
            </button>
            <button onClick={() => {
                const rows = []
                for (let i = 0; i < numRows; i++) {
                    rows.push(Array.from(Array(numCols), () => Math.random() > .8 ? 1 : 0)) //.8 here makes it less alive sqaures than .5 would (more sparse).
                }
                setGrid(rows)
                setRunning(false)
                setNumGenerations(0)
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
            <input type="text" name="nth" onChange={() => {

            }}
                onSubmit={async (e) => {
                    await setRunning(true)
                    await setNthTerm(e.target.value)
                    runSimulation()
                }} />
            <select
                name="Speed"
                onChange={(e) => setCurrSpeed(e.target.value)}
                value={currSpeed}>
                <option value="slow">Slow</option>
                <option value="medium">Medium</option>
                <option value="fast">Fast</option>
                <option value="super_fast">Super Fast</option>
            </select>
            <select //todo, not working to change size of grid currently
                name="Size"
                onChange={async (e) => {
                    e.persist()
                    try {
                        await setNumCols(e.target.value)
                        await setNumRows(e.target.value)
                        await setGrid(createEmptyGrid())
                    }
                    catch (error) {
                        console.error(error);

                    }
                }}
            >
                <option value={25}>25x25</option>
                <option value={50}>50x50</option>
                <option value={75}>75x75</option>
                <option value={100}>100x100</option>
            </select>
            <span>Generation: {generation}</span>
        </div>

    )
}

export default Settings