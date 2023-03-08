import React, { useState } from 'react'
import './App.css'
import { MdClose } from 'react-icons/md'
import { FiCopy, FiLock, FiStar } from 'react-icons/fi'
import { BsGrid } from 'react-icons/bs'
import ColorPaletteChild from './components/ColorPaletteChild'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function ColorPalette({ color, removeSingleColorFromPalette, index }) {
    const [isShown, setIsShown] = useState(false);
    const [showShades, setshowShades] = useState(false);
    const actions = [
        { icon: <MdClose size={28} />, tooltipText: "Remove Color" },
        { icon: <BsGrid size={24} />, tooltipText: "Show Shades" },
        { icon: <FiCopy size={24} />, tooltipText: "Copy HEX" },
        // { icon: <FiStar size={24} />, tooltipText: "Add to Favourite" },
        { icon: <FiLock size={24} />, tooltipText: "Lock Color" },
        { icon: <FiStar size={24} />, tooltipText: "Create Shades" }
    ];

    function copyToClipBoard(text) {
        navigator.clipboard.writeText("#" + text);
        toast(`Copied #${text}`, {
            autoClose: 800,
            type: toast.TYPE.SUCCESS,
            hideProgressBar: true,
        });
    }
    function toggleShades() {
        setshowShades(prev => !prev);
    }
    function performAction(i) {
        switch (i) {
            case 0:
                removeSingleColorFromPalette(index);
                break;
            case 1:
                toggleShades();
                break;
            case 2:
                copyToClipBoard(color);
                break;
            case 3:
                console.log('Add to fav');
                break;
            case 4:
                console.log('lock');
                break;
            default:
                break;
        }
    }
    return (
        <div className="palette" style={{ backgroundColor: `${!showShades ? `#${color}` : "transparent"}` }} onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}>
            {isShown && (<div className="toolbars" >
                <ul>
                    {actions.map((action, index) => <li key={index} onClick={() => performAction(index)} className="tooltip">{action.icon}<span className="tooltiptext">{action.tooltipText}</span></li>)}
                </ul>
            </div>)
            }
            <ColorPaletteChild color={color} showShades={showShades} />
            <h2>{color.toUpperCase()}</h2>
            <ToastContainer />
        </div>
    )
}


export default ColorPalette
