import React from "react";
import Drawer from '@material-ui/core/Drawer';
import { useDataLayer } from "../DataLayer";
import { Box, Center, Grid, GridItem, Heading, useBreakpoint } from "@chakra-ui/react";
import { CartItem } from "../types";
import CartItemCard from "./CartItemCard";
interface DrawerProps {
    openCart: boolean;
    setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const MiCarritoDrawer: React.FC<DrawerProps> = ({openCart, setOpenCart}) => {

    const [{cart, total}, dispatch] = useDataLayer();
    const br = useBreakpoint();

    return (
        <>
            <Drawer variant="temporary" anchor="right" open={openCart} onClose={() => setOpenCart(false)}>
                <Grid
                    h="100vh"
                    w={(br=='base')? '70vw' : '400px'}
                    maxW={(br=='base')? '100vw' : '60vw'}
                    templateRows="repeat(10, 1fr)"
                    templateColumns="repeat(2, 1fr)"
                    bgColor={(br!=='base')? "#c9effc" : 'white'}
                >
                    <GridItem
                        rowSpan={1} colSpan={2}
                    >
                        <Center w="100%" h="100%" borderBottom="1px solid lightgray">
                            <Heading
                                as="h2" size="lg" isTruncated maxWidth="100%"
                            >
                                Carrito de Compra
                            </Heading>
                        </Center>
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
                        <Center w="100%" h="100%">
                            <Heading
                                as="h2" size="md" isTruncated maxWidth="100%"
                            >
                                 Boton de comprar o iniciar sesion
                            </Heading>
                        </Center>
                    </GridItem>
                </Grid>
            </Drawer>
        </>
    );
}

export default MiCarritoDrawer;