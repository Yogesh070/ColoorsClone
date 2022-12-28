import React, { useState, useEffect, createContext, useContext } from "react";

export const ColorPaletteContext = createContext({ palette: {}, removeSingleColorFromPalette: () => { } });

export const ColorPaletteProvider = ({ children }) => {
    const [colorPalette, setColorPalette] = useState([]);

    useEffect(() => {
        randomColorGenerator();
        window.addEventListener("keydown", (e) => {
            if (e.key === ' ') {
                randomColorGenerator();
            }
            if ((e.metaKey || e.ctrlKey) && e.code === 'KeyX') {
                console.log('fire!')
            }
        });
        // return ()=> window.removeEventListener("keydown",)

        //eslint-disable-next-line
    }, []);

    const getSingleRandomColor = () => {
        let randomColor = Math.floor(Math.random() * 14468846).toString(16);
        return randomColor;
    }
    const randomColorGenerator = () => {
        let tempArr = [];
        for (let i = 0; i < 5; i++) {
            let randomColor = getSingleRandomColor();
            const element = randomColor;
            tempArr.push(element);
        }
        setColorPalette(tempArr);
    }

    const removeSingleColorFromPalette = (index) => {
        let color = getSingleRandomColor();
        let tempArr = [...colorPalette];
        tempArr[index] = color;
        setColorPalette(tempArr);

    }
    return <ColorPaletteContext.Provider value={{ colorPalette, removeSingleColorFromPalette }}>
        {children}
    </ColorPaletteContext.Provider>
}

export const usePalette = () => {
    const colorPalette = useContext(ColorPaletteContext);
    return colorPalette;
}