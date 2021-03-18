import React, { useEffect, useRef } from "react";
import Drawer from '@material-ui/core/Drawer';
import { useDataLayer } from "../DataLayer";
import { Box, Center, Flex, Grid, GridItem, Heading, IconButton, useBreakpoint } from "@chakra-ui/react";
import { CartItem } from "../types";
import CartItemCard from "./CartItemCard";
import { IoCloseSharp } from "react-icons/io5";
interface DrawerProps {
    openCart: boolean;
    setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const MiCarritoDrawer: React.FC<DrawerProps> = ({openCart, setOpenCart}) => {

    const [{cart, total}, dispatch] = useDataLayer();
    const br = useBreakpoint();
    const docRef = useRef(null);

    return ( 
        // React.createElement('form', {action: "https://www.example.com/paymentsuccess", method: "POST"}, )
        <>
            <form id="ml-button" action="https://www.example.com/paymentsuccess" method="POST"></form>
            <Drawer variant="temporary" anchor="right" open={openCart} onClose={() => setOpenCart(false)}>
                <Grid
                    h="100vh"
                    minW="340px"
                    w={(br=='base')? '70vw' : '400px'}
                    maxW={(br=='base')? '100vw' : '70vw'}
                    templateRows="repeat(10, 1fr)"
                    templateColumns="repeat(2, 1fr)"
                    bgColor={(br!=='base')? "#c9effc" : 'white'}
                >
                    <GridItem
                        rowSpan={1} colSpan={2}
                    >
                        <Flex w="100%" h="100%" px="1ch" borderBottom="1px solid lightgray" justifyContent="space-between" alignItems="center" >
                            <Center flex="2">
                                <Heading
                                    as="h2" size="lg" isTruncated
                                >
                                    Carrito de Compra
                                </Heading>
                            </Center>
                            <IconButton 
                                aria-label="close" 
                                size="lg" 
                                onClick={() => setOpenCart(false)} 
                                icon={<IoCloseSharp />} 
                            />
                        </Flex>
                    </GridItem>

                    <GridItem
                        rowSpan={7} colSpan={2}
                        overflowY="scroll"
                    >
                        <Box>
                        {cart.map((item:CartItem, index: number) => (
                            <CartItemCard cartItem={item} key={index} />
                        ))}
                        </Box>
                    </GridItem>

                    <GridItem
                        rowSpan={1} colSpan={2}
                    >
                        <Center w="100%" h="100%" borderTop="1px solid lightgrey" borderBottom="1px solid lightgrey" >
                            <Heading
                                as="h2" size="md" isTruncated maxWidth="100%"
                            >
                                 Total: ${total}
                            </Heading>
                        </Center>
                    </GridItem>
                    <GridItem
                        rowSpan={1} colSpan={2}
                    >
                        {/* <Center w="100%" h="100%">
                            <Heading
                                as="h2" size="md" isTruncated maxWidth="100%"
                            >

                            </Heading>
                        </Center> */}
                        {/* <form id="ml-button" name="ml-button" action="https://www.example.com/paymentsuccess" method="POST"></form> */}

                    </GridItem>
                </Grid>
            </Drawer>
        </>
    );
}

export default MiCarritoDrawer;