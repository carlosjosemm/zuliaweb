import '../../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import { DataProvider } from '../DataLayer'
import reducer, { initialState } from '../reducer'
import '../../styles/CarouselStyles.css'


function MyApp({ Component, pageProps }) {
  return (
    <DataProvider initialState={initialState} reducer={reducer}>

      <ChakraProvider resetCSS>
          <Component {...pageProps} />
      </ChakraProvider>
      
    </DataProvider>
  )
}

export default MyApp
