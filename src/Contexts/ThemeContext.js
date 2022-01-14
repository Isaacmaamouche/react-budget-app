import React, {createContext, useContext} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext();

export function useTheme(){
    return useContext(ThemeContext);
}



export const ThemeProvider = ({ children }) => {
  
    const [darkMode, setDarkMode] = useLocalStorage('darkMode',true);
    
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