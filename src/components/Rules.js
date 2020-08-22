import React from 'react'

const Rules = () => {
    return (
        <div className="rules-container">
            <h3 style={{ textAlign: "center" }}>Rules</h3>
            <ul>
                <p>On next generation:</p>
                <li>If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.</li>
                <li>If the cell is dead and has exactly 3 neighbors, then it comes to life. Else it remains dead.</li>
                <li>Off grid edges are considered permanent dead cells, and edges do not wrap.</li>
            </ul>
        </div>

    )
}

export default Rules