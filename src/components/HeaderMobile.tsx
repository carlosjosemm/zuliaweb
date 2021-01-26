import { Box, Grid, GridItem, Icon, IconButton, Image, Input, InputGroup, InputRightElement, useBreakpoint, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import {BiSearch, BiUser, BiCart} from 'react-icons/bi';
import React, { useEffect, useState } from "react";
import { useDataLayer } from "../DataLayer";
import MiCuentaDrawer from "./MiCuentaDrawer";
import MiCarritoDrawer from "./MiCarritoDrawer";
import MobileMenu from "./MobileMenu";
import firebase from "firebase";
import db from "../firebase";
import { actionTypes } from "../reducer";

const HeaderMobile: React.FC<{}> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();    
    const [{user, cart}, dispatch] = useDataLayer();
    const [openCart, setOpenCart] = useState(false);
    const strongcolor = 'yellow.50';
    const lightcolor = 'yellow.500';
    const logoSize = useBreakpointValue({sm: '130px', base: '300px', md: '130px', lg: '130px', xl:'130px'})
    const br = useBreakpoint();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
                db.collection('users').doc(user.email).get().then( //fetch cartData from firebase
                    query => {
                        const dbCartData = query.data() //parse it
                        const cleanCart = [];
                        dispatch(
                            {type: actionTypes.SET_USER, user: user, cart: dbCartData?.cart ?? cleanCart , dbTotal: dbCartData?.carttotal ?? 0}
                        );
                    }
                );                
            } else {
              // No user is signed in.
              const cleanCart = [];
              dispatch(
                {type: actionTypes.SET_USER, user: null, cart: cleanCart, dbTotal: 0}
            );
            }
          });
    }, [user]);


    return (
        <>
            <Box position="sticky" zIndex="999" top="0" bg={lightcolor} height="60px" w="100vw" >
                <Grid 
                    templateRows="repeat(2, 1fr)"
                    templateColumns="repeat(10, 1fr)"
                    w="100%"
                    p="0px"
                    h="100%"
                    margin="0px"
                    alignItems="center"
                >
                    <GridItem
                    rowSpan={2} colSpan={1}
                    >
                        {/* HEADER LEFT */}
                            <MobileMenu />
                    </GridItem>
                    
                    <GridItem
                    rowSpan={2} colSpan={3}
                    >
                        <Image
                            boxSize={logoSize}
                            p="0.5ch 1ch 0.5ch 0.5ch"
                            objectFit="contain"
                            src="https://i.imgur.com/3xajgtl.png"
                            alt="logo"
                            w="100%"
                            h="100%"
                        />                            
                    </GridItem>
                    
                    <GridItem
                    rowSpan={2} colSpan={4}
                    >
                        {/* HEADER CENTER */}
                        <InputGroup>
                            <InputRightElement children={
                                <Icon 
                                    as={BiSearch} 
                                    h="2.5ch" w="2.5ch" 
                                    color={strongcolor} 
                                />} 
                            />
                            <Input variant="outline" bgColor={lightcolor} borderColor={strongcolor} color={strongcolor} focusBorderColor={strongcolor} placeholder="Buscar producto..." size="sm" />    
                        </InputGroup>
                    </GridItem>
                    
                    <GridItem
                    rowSpan={2} colSpan={1}
                    >
                        {/* HEADER RIGHT            */}
                        <IconButton 
                            bgColor={lightcolor} 
                            color={strongcolor} 
                            aria-label="Mi cuenta"
                            size="lg"
                            onClick={onOpen}
                            icon={ <BiUser  
                                size="2.5ch"
                            />} />
                    </GridItem>

                    <GridItem
                    rowSpan={2} colSpan={1}
                    >
                        <IconButton 
                            bgColor={lightcolor} 
                            color={strongcolor} 
                            aria-label="Mi carrito"
                            size="lg"
                            onClick={() => setOpenCart(true)}
                            icon={ <BiCart  
                                size="3ch"
                            />} />
                    </GridItem>
                </Grid>
            </Box>
            <MiCuentaDrawer isOpen={isOpen} onClose={onClose} />
            <MiCarritoDrawer openCart={openCart} setOpenCart={setOpenCart} />
        </>
    );
}

export default HeaderMobile;