import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#2693a6' },
          secondary: { main: '#e0f7fa' },
          background: { default: '#fff', paper: '#fff' },
          text: { primary: '#000', secondary: grey[800] },
        }
      : {
          primary: { main: '#e0f7fa' },
          secondary: { main: '#2693a6' },
          background: { default: '#000', paper: '#000' },
          text: { primary: '#fff', secondary: grey[500] },
        }),
  },
});
