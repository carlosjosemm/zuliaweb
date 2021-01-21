import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
    sm: '30em',
    md: '48em',
    lg: '64em',
    xl: '80em',
  })

// const theme = extendTheme({
//   breakpoints
// })

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const fonts = { mono: `'Menlo', monospace` };

const theme = extendTheme({ 
// config,
fonts,
breakpoints,
});

  export default theme;