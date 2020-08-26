import React from 'react'
import About from "./About"
import Rules from "./Rules"
import Button from "@material-ui/core/Button"
import Brightness4Icon from '@material-ui/icons/Brightness4';

const Header = ({ toggleDarkMode }) => {
    return (
        <div className="header-container">
            <h1 style={{ marginBottom: "10px" }}>Conway's Game of Life</h1>
            <div style={{ position: "absolute", top: "4%", right: "5%" }} onClick={toggleDarkMode}>
                <Brightness4Icon />
            </div>

            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: '50%'
            }}>
                <About />
                <Rules />
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => window.open("https://github.com/kyle-richardson/game-of-life", "_blank")}
                >
                    View Code
                </Button>
            </div>

        </div>

    )
}

export default Header