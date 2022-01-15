import React, {createContext, useContext, useState} from 'react';

const ThemeContext = createContext();

export function useTheme(){
    return useContext(ThemeContext);
}



export const ThemeProvider = ({ children }) => {
  
    const [darkMode, setDarkMode] = useState(true);
    
    function setOutlineDarkMode(variant){
        if(darkMode) return variant
        return 'outline-' + variant
    }

    
    return (
        <ThemeContext.Provider
        value={{
            darkMode,
            setDarkMode, 
            setOutlineDarkMode, 
        }}>
            {children}
        </ThemeContext.Provider>
    )
}