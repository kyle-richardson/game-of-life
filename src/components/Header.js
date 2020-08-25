import React from 'react'
import About from "./About"
import Rules from "./Rules"

const Header = () => {
    return (
        <div className="header-container">
            <h1 style={{ marginBottom: "10px" }}>Conway's Game of Life</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                <About />
                <Rules />
            </div>

        </div>

    )
}

export default Header