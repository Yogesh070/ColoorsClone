import React from 'react'
import './App.css'

function Snackbar({message, showBool}) {
    let isShown=showBool;
    return (
        <>
            <div id="snackbar" className={isShown?"show":""}>{message}</div>
        </>
    )
}

export default Snackbar
