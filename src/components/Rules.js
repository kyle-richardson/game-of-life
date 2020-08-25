import React, { useState } from 'react'
import { Button, Pane, Dialog } from "evergreen-ui"

const Rules = () => {
    const [isShown, setIsShown] = useState(false)
    return (
        <div className="rules-container">
            <Button onClick={() => {
                setIsShown(true)
            }}>Rules</Button>
            <Pane>
                <Dialog
                    isShown={isShown}
                    title="Rules"
                    onCloseComplete={() => setIsShown(false)}
                    confirmLabel="Close"
                    hasCancel={false}
                >
                    <ul>
                        <p>On next generation:</p>
                        <li>If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.</li>
                        <li>If the cell is dead and has exactly 3 neighbors, then it comes to life. Else it remains dead.</li>
                        <li>Off grid edges are considered permanent dead cells, and edges do not wrap.</li>
                    </ul>
                </Dialog>
            </Pane>


        </div >

    )
}

export default Rules