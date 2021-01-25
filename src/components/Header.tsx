import { Box, 
    Button, 
    Center, 
    Flex, 
    Grid, 
    GridItem, 
    HStack, 
    Icon, 
    IconButton, 
    Image, 
    Input, 
    InputGroup, 
    InputRightElement, 
    LightMode, 
    Link, 
    StackDivider, 
    useDisclosure,
     VStack 
} from "@chakra-ui/react";
import firebase from "firebase";
import React, { 
    useEffect, 
    useRef, 
} from "react";
import { BiCart, BiSearch, BiUser } from "react-icons/bi";
import { useDataLayer } from "../DataLayer";
import { actionTypes } from "../reducer";
import MiCuentaDrawer from "./MiCuentaDrawer";
import {FaFacebook, FaInstagram,} from "react-icons/fa";
import {SiWhatsapp} from "react-icons/si";
import { CartItem } from "../types";
import MiCarritoDrawer from "./MiCarritoDrawer";
import db from "../firebase";

interface HeaderProps {};

const Header:React.FC<HeaderProps> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();    
    const btnRef = useRef();
    const [{user, cart, total}, dispatch] = useDataLayer();
    const [openCart, setOpenCart] = React.useState(false);

    const totalItems:Array<any> = cart? cart.map((item:CartItem) => {
        return parseInt(item.quantity.toString())
    }) : [0];

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
                db.collection('users').doc(user.email).get().then(
                    query => {
                        const dbCartData = query.data() /*as Array<CartItem>*/
                        // dispatch({
                        //     type: actionTypes.FETCH_CART, cart: dbCart
                        // });
                        dispatch(
                            {type: actionTypes.SET_USER, user: user, cart: dbCartData.cart, dbTotal: dbCartData.carttotal}
                        );
                    }
                );
            //   dispatch(
            //         {type: actionTypes.SET_USER, user: user, cart: dbCart}
            //     );
                
            } else {
              // No user is signed in.
              const cleanCart = [];
              dispatch(
                {type: actionTypes.SET_USER, user: null, cart: cleanCart, dbTotal: total}
            );
            }
          });
    }, [user]);

    return (
        <>  
        <Box
            w="100%"
            h="150px"
        >
            <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(10, 1fr)"
                w="100%"
                p="0px"
                h="150px"
            >
                <GridItem
                    rowSpan={2} colSpan={3}
                >
                    <Flex mb="3ch" ml="3ch" w="100%" h="100%" flexDir="row" justifyContent="flex-start" alignItems="center">
                        <VStack maxW="80%">
                            <Flex mb="1ch" w="100%" direction="row" alignItems="flex-end" justifyContent="space-evenly">
                                <LightMode>
                                    <Link href="https://www.facebook.com/zuliapallevar/" isExternal>
                                    <IconButton //onClick={}
                                        aria-label="Facebook"
                                        color="white"
                                        borderRadius="full"
                                        colorScheme="facebook" 
                                        icon={<FaFacebook />}
                                    ></IconButton>
                                    </Link>
                                </LightMode>
                                
                                <LightMode>
                                <Link href="https://wa.link/8xxfzu" isExternal>
                                    <IconButton 
                                        colorScheme="whatsapp" 
                                        aria-label="Whatsapp"
                                        borderRadius="full"
                                        icon={<SiWhatsapp />}
                                        color="white"
                                        ></IconButton>
                                </Link>
                                </LightMode>

                                <LightMode>
                                <Link href="https://www.instagram.com/zuliapallevar/" isExternal>
                                    <IconButton 
                                        aria-label="Instagram"
                                        icon={<FaInstagram />}
                                        color="white"
                                        borderRadius="full"
                                        bgColor="gray.500"
                                        border="2px solid #718096"
                                        _hover={{bgColor: "gray.600", border: "2px solid #4A5568"}}
                                        ></IconButton>
                                </Link>
                                </LightMode>
                            </Flex>

                            <InputGroup>
                            <InputRightElement 
                                bottom="0px"
                                h="100%"
                                children={
                                <Icon 
                                    mx="10px" 
                                    as={BiSearch} 
                                    h="30px" w="30px" 
                                    color="yellow.800" 
                                />} 
                            />
                            <LightMode>
                            <Input variant="outline" 
                                borderColor="yellow.600"
                                focusBorderColor="yellow.800" 
                                color="yellow.800"
                                placeholder="Buscar producto..." 
                                _placeholder={{color: "white"}}
                                size="sm"
                                bgColor="#feb800"
                                // bgColor="white"
                            />    
                            </LightMode>
                            </InputGroup>
                        </VStack>
                    </Flex>
                </GridItem>
                <GridItem
                    rowSpan={2} colSpan={4}
                >
                    <Link _focus={{border: 'none', textDecoration: 'none'}} _visited={{color:'white'}} _active={{border: 'none', textDecoration: 'none'}} href="/">
                    <Flex w="100%" h="100%" justifyContent="center" alignItems="center" pr="2ch">
                    <Image
                        h="100%" 
                        p="10px"
                        fit="contain"
                        src="https://i.imgur.com/3xajgtl.png"
                        alt="logo"
                    />
                    </Flex>
                    </Link>
                </GridItem>
                <GridItem
                    rowSpan={2} colSpan={3}
                >
                <Flex 
                    mb="3ch" 
                    mr="3ch"
                    w="100%" h="100%"
                    alignItems="center"
                    justifyContent="center"
                >
                    <VStack maxW="80%">
                    <Button ref={btnRef} onClick={onOpen}
                        size="md"
                        w="18ch" 
                        justifySelf="center"
                        _hover= {{bg: "yellow.300", color: "black"}} 
                        bgColor="yellow.200" 
                        borderColor="yellow.200"
                        color="yellow.800"
                        _focus={{outlineColor: "yellow.300"}}
                        leftIcon={ <Icon  
                            as={BiUser} 
                            h="25px" w="25px" 
                            color="inherit"/>}
                    >
                        Mi cuenta
                    </Button>

                    <Button size="md"  onClick={() => setOpenCart(true)}
                        w="18ch" 
                        justifySelf="center"
                        _hover= {{bg: "yellow.300", color: "black"}} 
                        bgColor="yellow.200" 
                        borderColor="yellow.200"
                        _focus={{outlineColor: "yellow.300"}}
                        color="yellow.800" 
                        leftIcon={ <Icon  
                            as={BiCart} 
                            h="25px" w="25px" 
                            color="inherit" 
                        />}
                        rightIcon={(cart.length!==0) ? 
                            (<Center 
                            borderRadius="999px" 
                            bgColor="red.600" 
                            w="3ch" h="3ch" 
                            color="white"
                            >
                                {totalItems.reduce((total, num) => {
                                    return total + num;
                                })}
                            </Center>) : 
                            (<Center 
                                borderRadius="999px" 
                                bgColor="inherit" 
                                w="3ch" h="3ch" 
                                color="white"
                                display="none"
                                >
                                    🚀
                                </Center>)}
                    >
                        Mi carrito
                    </Button>
                    </VStack>
                </Flex>
                </GridItem>
            </Grid>
        </Box>


{/* //////////////////////////////////////////////////////////////             */}


            {/* NAV BAR */}
            <HStack 
                // mx="10px"
                color="white" 
                mt="2px" 
                // borderRadius="5px"
                padding="3px"
                // borderColor= "#57a7dc"
                // borderBottom="3px solid #3182CE"
                // border="3px solid #3182CE"
                fontWeight="500" 
                bgColor="blue.500" 
                px="100px" 
                direction="row" 
                alignItems="center" 
                justifyContent="space-around" 
                h="45px"  
                divider={<StackDivider borderColor="gray.200" />}
                position="sticky"
                top="0"
                zIndex="100"                
            >
                <Box>
                    <Link 
                        _hover={{textDecoration: 'none'}}
                        href="/ofertas"
                    >
                        Ofertas 
                    </Link> ⚡
                </Box>
                <Box>
                    <Link _hover={{textDecoration: 'none'}}>
                        Categorias
                    </Link>
                </Box>
                <Box>
                    <Link _hover={{textDecoration: 'none'}}>
                        Marcas
                    </Link>
                </Box>
                <Box>
                    <Link 
                        _hover={{textDecoration: 'none'}}
                        href="/contacto"
                    >
                        Contáctanos
                    </Link> 📞
                </Box>
                
            </HStack>

            {/* ACCOUNT DRAWER */}
            <MiCuentaDrawer isOpen={isOpen} onClose={onClose} />
            <MiCarritoDrawer openCart={openCart} setOpenCart={setOpenCart} />
        </>
    );
}

export default Header;