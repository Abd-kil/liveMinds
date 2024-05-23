import { createContext, useMemo, useState, useEffect, FC, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { getDesignTokens } from '../theme';

interface ColorModeContextProps {
    toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextProps>({
    toggleColorMode: () => { },
});

interface ColorModeProviderProps {
    children: ReactNode;
}

export const ColorModeProvider: FC<ColorModeProviderProps> = ({ children }) => {
    const storedMode = sessionStorage.getItem('theme') as PaletteMode | null;
    const [mode, setMode] = useState<PaletteMode>(storedMode?storedMode:'light');
    useEffect(() => {
        if (storedMode && storedMode !== mode) {
            setMode(storedMode);
        }
    }, [storedMode]);
    useEffect(()=>{
        const root = document.documentElement;
        root.style.setProperty('--background-color', mode === 'dark' ? '#000' : '#fff');
        root.style.setProperty('--primary-color', mode === 'dark' ? '#e0f7fa' : '#2693a6');
        root.style.setProperty('--secondary-color', mode === 'dark' ? '#2693a6' : '#e0f7fa');
        root.style.setProperty('--font-color', mode === 'dark' ? '#fff' : '#000');
    },[mode]);
    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => {
                const newMode = prevMode === 'light' ? 'dark' : 'light';
                sessionStorage.setItem('theme', newMode);
                return newMode;
            });
        },
    }), []);
    

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
