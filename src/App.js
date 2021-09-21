import {React,useState,useEffect} from 'react'
import ColorPalette from './ColorPalette';
import './App.css'

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
        <div className="main">
        {colorPalette.map((color,index)=><ColorPalette color={color} key={index} i={index}/>)}
        </div>
    )
}

export default App

