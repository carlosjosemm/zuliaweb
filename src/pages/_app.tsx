import '../../styles/globals.css'
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react"
import { DataProvider } from '../DataLayer'
import reducer, { initialState } from '../reducer'
import '../../styles/CarouselStyles.css'
import React from 'react'
import theme from '../theme'


function MyApp({ Component, pageProps }) {
  return (
    <DataProvider initialState={initialState} reducer={reducer}>

      <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
          options={{
            useSystemColorMode: false,
            initialColorMode: "light",
          }}
        >
          <Component {...pageProps} />
          </ColorModeProvider>
      </ChakraProvider>
      
    </DataProvider>
  )
}

export default MyApp
