import React from 'react'
import ColorPalette from './ColorPalette';
import './App.css'
import { ColorPaletteContext } from './hooks/paletteHook';

function App() {
  return (
    <div className="main">
      <ColorPaletteContext.Consumer>
        {({ colorPalette, removeSingleColorFromPalette }) => {
          return colorPalette.map((color, index) => <ColorPalette color={color} key={index}  index={index}removeSingleColorFromPalette={removeSingleColorFromPalette} />)
        }}
      </ColorPaletteContext.Consumer>
    </div>
  )
}

export default App
