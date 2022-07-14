import {React,useState,useContext,useCallback} from 'react'
import './App.css'
import {MdClose} from 'react-icons/md'
import {FiCopy,FiLock,FiStar} from 'react-icons/fi'
import {BsGrid} from 'react-icons/bs'
import { ColorContext } from './App'

function ColorPalette({color,i,onPaletteChange}) {
    const colors=useContext(ColorContext);
    const [isShown, setIsShown] = useState(false);
    const [showShades, setshowShades] = useState(false);
    const actions=[
        {icon:<MdClose size={28}/>,tooltipText:"Remove Color"},
        {icon:<BsGrid size={24}/>,tooltipText:"Show Shades"},
        {icon:<FiCopy size={24}/>,tooltipText:"Copy HEX"},
        {icon:<FiStar size={24}/>,tooltipText:"Add to Favourite"},
        {icon:<FiLock size={24}/>,tooltipText:"Lock Color"}
    ];
    function copyToClipBoard() {
        navigator.clipboard.writeText("#"+color);
    }
    function toggleShades() {
        setshowShades(prev=>!prev);
    }
    const removeColor=useCallback(
        (idx) => {
           let arr= colors.splice(idx,1,Math.floor(Math.random()*14468846).toString(16));
            onPaletteChange(colors) ;
            console.log(colors);  
            console.log("Removed color "+arr);
        },
        [colors,onPaletteChange],
    )

    function performAction(i) {
        switch (i) {
            case 0:
                console.log('remove color');
                removeColor(i);
                break;
            case 1:
                toggleShades();
                break;
            case 2:
                copyToClipBoard();
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
    function ColorPaletteChild({color}) {
        let arr=[];
        for (let i = 0; i < 20; i++) {
            arr.push(<div className="palette-child" style={{backgroundColor:`#${color}`,opacity:i*0.06 , display: `${showShades?"block":"none"}`}} key={i}></div>);
        }
        return arr
    }
    return (
        <div className="palette" style={{backgroundColor:`${!showShades? `#${color}` : "transparent"}`}}  onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>
            {isShown && ( <div className="toolbars" >
                <ul>
                    {actions.map((action,index)=><li key={index} onClick={()=>performAction(index)}  className="tooltip">{action.icon}<span className="tooltiptext">{action.tooltipText}</span></li>)}
                </ul>
            </div>)
            }
            <ColorPaletteChild color={color}/>
         <h2>{color.toUpperCase()}</h2>
        </div>
    )
}


export default ColorPalette
