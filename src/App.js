import {React,useState,useEffect,createContext} from 'react'
import ColorPalette from './ColorPalette';
import './App.css'

export const ColorContext= createContext([]);
function App() {
    const [colorPalette, setColorPalette] = useState([]);
    useEffect(() => {
      randomColorGenerator();
      window.addEventListener("keydown", (e)=>{
        if (e.key===' ') {
          randomColorGenerator();
        }
        if ((e.metaKey || e.ctrlKey) && e.code === 'KeyX') {
          console.log('fire!')
      }  
      });
    }, []);

    const randomColorGenerator=()=>{
        let tempArr=[];
        for (let i = 0; i < 5; i++) {
            let randomColor = Math.floor(Math.random()*14468846).toString(16);
            const element = randomColor;
            tempArr.push(element);
        }
        setColorPalette(tempArr);
    }

    return (
      <ColorContext.Provider value={colorPalette}>
        <div className="main">
        {colorPalette.map((color,index)=><ColorPalette color={color} key={index} i={index} onPaletteChange={setColorPalette}/>)}
        </div>
      </ColorContext.Provider>
    )
}

export default App

