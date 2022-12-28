import React from "react";

function ColorPaletteChild({ color,showShades }) {
    let arr = [];
    for (let i = 0; i < 20; i++) {
        arr.push(<div className="palette-child" style={{ backgroundColor: `#${color}`, opacity: i * 0.06, display: `${showShades ? "block" : "none"}` }} key={i}></div>);
    }
    return arr
}

export default ColorPaletteChild;