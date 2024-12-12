import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 1440px)': {
            maxWidth: '1440px',
          },
        },
      },
    },
  },
});

export default theme;
