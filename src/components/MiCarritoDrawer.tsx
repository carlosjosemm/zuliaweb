// import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Icon, LightMode } from "@chakra-ui/react";
import React from "react";
// import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import { useDataLayer } from "../DataLayer";
import { Box, Center, Grid, GridItem, Heading, useBreakpoint } from "@chakra-ui/react";
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { CartItem } from "../types";
import CartItemCard from "./CartItemCard";
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';

interface DrawerProps {
    openCart: boolean;
    setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const MiCarritoDrawer: React.FC<DrawerProps> = ({openCart, setOpenCart}) => {
    const [{cart, total}, dispatch] = useDataLayer();
    const br = useBreakpoint();
    // const classes = useStyles();
    // const toggleDrawer = () => {
    //     setOpenCart(true);
    // };

    return (
        <>
            <Drawer variant="temporary" anchor="right" open={openCart} onClose={() => setOpenCart(false)}>
                {/* <div style={{width: '200px', height: '100vh', backgroundColor: 'black'}}></div> */}
                <Grid
                    h="100vh"
                    w={(br=='base')? '70vw' : '400px'}
                    maxW={(br=='base')? '100vw' : '60vw'}
                    templateRows="repeat(10, 1fr)"
                    templateColumns="repeat(2, 1fr)"
                    bgColor="#c9effc"
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
                        // overflowX="hidden"
                        overflowY="scroll"
                    >
                        <Box>
                        {cart.map((item:CartItem) => (
                            <CartItemCard cartItem={item} />
                        ))}
                        {/* <CartItemCard cartItem={cart[0]} /> */}
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

{/* ////////////////////////////////////////////////////////////////////////////////////////////////         */}
            {/* <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                // finalFocusRef={btnRef}
            >
                <DrawerOverlay >
                <DrawerContent bgColor="yellow.100">
                    <DrawerCloseButton color="yellow.800" />
                    <DrawerHeader color="yellow.800" borderBottom="1px solid darkgrey">
                        Carrito de Compra
                    </DrawerHeader>
                                
                    <DrawerBody 
                        display='flex' 
                        flexDirection='column' 
                        justifyContent='flex-end'
                        pb="50px"
                    >

                    </DrawerBody>

                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
                </DrawerOverlay>
            </Drawer> */}
        </>
    );
}

export default MiCarritoDrawer;