import React, { useState } from 'react'
import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Rules = () => {
    const [isShown, setIsShown] = useState(false)
    return (
        <div className="rules-container">
            <Button
                size="small"
                variant="outlined"
                onClick={() => {
                    setIsShown(true)
                }}
            >
                Rules
            </Button>
            <Dialog
                open={isShown}
                onClose={() => setIsShown(false)}
                aria-labelledby="rules-dialog-title"
                aria-describedby="rules-dialog-description"
            >
                <DialogTitle id="rules-dialog-title">Rules of Conway's Game of Life</DialogTitle>
                <DialogContent>
                    <DialogContentText id="rules-dialog-description">
                        <ul>
                            <p>On next generation:</p>
                            <li>If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.</li>
                            <li>If the cell is dead and has exactly 3 neighbors, then it comes to life. Else it remains dead.</li>
                            <li>Off grid edges are considered permanent dead cells, and edges do not wrap.</li>
                        </ul>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setIsShown(false)}
                        color="primary"
                        autoFocus
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default Rules