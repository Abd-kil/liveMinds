// src/ColorModeContext.tsx
import React, { createContext, useMemo, useState, FC, ReactNode } from 'react';
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
    const [mode, setMode] = useState<PaletteMode>('light');

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
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
