import React, { useState } from 'react'
import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const About = () => {
    const [isShown, setIsShown] = useState(false)
    return (
        <div className="about-container">
            <Button
                size="small"
                variant="outlined"
                onClick={() => {
                    setIsShown(true)
                }}
            >
                About
            </Button>
            <Dialog
                open={isShown}
                onClose={() => setIsShown(false)}
                aria-labelledby="about-dialog-title"
                aria-describedby="about-dialog-description"
            >
                <DialogTitle id="about-dialog-title">About Conway's Game of Life</DialogTitle>
                <DialogContent>
                    <DialogContentText id="about-dialog-description">
                        Invented by John Conway in 1970, the Game of Life showcases cellular automation to force cells to die or come to life automatically based on a set of rules. See{" "}
                        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank" rel="noopener noreferrer">Wikipedia Game of Life</a> for more info.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsShown(false)} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

export default About