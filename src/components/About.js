import React, { useState } from 'react'
import { Button, Pane, Dialog } from "evergreen-ui"

const About = () => {
    const [isShown, setIsShown] = useState(false)
    return (
        <div className="about-container">
            <Button onClick={() => {
                setIsShown(true)
            }}>About</Button>
            <Pane>
                <Dialog
                    isShown={isShown}
                    title="About Conway's Game of Life"
                    onCloseComplete={() => setIsShown(false)}
                    confirmLabel="Close"
                    hasCancel={false}
                >
                    <p style={{ textAlign: "left" }}>Invented by John Conway in 1970, the Game of Life showcases cellular automation to force cells to die or come to life automatically based on a set of rules. See{" "}
                        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Wikipedia Game of Life</a> for more info.</p>
                </Dialog>
            </Pane>


        </div >

    )
}

export default About