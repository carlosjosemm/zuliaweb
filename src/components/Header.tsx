import { Box, Button, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, HStack, Icon, IconButton, Image, Input, InputGroup, InputRightElement, LightMode, Link, Spacer, StackDivider, useDisclosure, VStack } from "@chakra-ui/react";
import firebase from "firebase";
import React, { useEffect, useRef, useState } from "react";
import { BiCart, BiSearch, BiUser } from "react-icons/bi";
import { useDataLayer } from "../DataLayer";
import { actionTypes } from "../reducer";
import MiCuentaDrawer from "./MiCuentaDrawer";
import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";

interface HeaderProps {};

const Header:React.FC<HeaderProps> = () => {
    const [cartItems, setCartItems] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const [{user}, dispatch] = useDataLayer();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              dispatch(
                    {type: actionTypes.SET_USER, user: user}
                );
            } else {
              // No user is signed in.
              dispatch(
                {type: actionTypes.SET_USER, user: null}
            );
            }
          });

    }, [user]);

    return (
        <div>
            <Flex px="20px" direction="row" alignItems="flex-end" justifyContent="space-between" h="150px">

            {/* HEADER LEFT */}
            <Box mb="20px" ml="20px">
                <VStack>
                    <Flex minW="130px" w="100%" direction="row" alignItems="flex-end" justifyContent="space-evenly">
                        <LightMode>
                            <IconButton //onClick={}
                                // size="md"
                                // w="100%" 
                                aria-label="Facebook"
                                // justifySelf="center"
                                color="white"
                                colorScheme="facebook" 
                                icon={<FaFacebook />}
                            ></IconButton>
                        </LightMode>

                        <LightMode>
                            <IconButton 
                                colorScheme="twitter" 
                                aria-label="Twitter"
                                icon={<FaTwitter />}
                                color="white"
                                ></IconButton>
                        </LightMode>

                        <LightMode>
                            <IconButton 
                                aria-label="Instagram"
                                icon={<FaInstagram />}
                                color="white"
                                bgColor="gray.500"
                                border="2px solid #718096"
                                _hover={{bgColor: "gray.600", border: "2px solid #4A5568"}}
                                ></IconButton>
                        </LightMode>
                </Flex>

                    <InputGroup>
                    <InputRightElement children={
                        <Icon 
                            mx="10px" 
                            as={BiSearch} 
                            h="30px" w="30px" 
                            color="yellow.800" 
                        />} 
                    />

                    <Input variant="outline" 
                        borderColor="yellow.600"
                        focusBorderColor="yellow.800" 
                        color="yellow.800" 
                        placeholder="Buscar producto..." 
                        _placeholder={{color: "white"}}
                        size="md"
                        bgColor="#feb800"
                        />    
                    
                    </InputGroup>
                </VStack>
            </Box >
                        <Spacer />
                {/* HEADER CENTER  */}
                <Box w="40%" h="100%" mr="90px">
                    <Image
                        crossOrigin="anonymous"
                        p="10px"
                        align="50% 50%"
                        boxSize="100%"
                        minH="150px"
                        minW="390px"
                        fit="contain"
                        src="https://i.imgur.com/3xajgtl.png"
                        alt="logo"
                        maxH="150px"
                    />
                </Box>
                        <Spacer />
                {/* HEADER RIGHT */}
                <Box minW="170px" mb="20px" mr="20px">
                    <VStack>
                    <Button ref={btnRef} onClick={onOpen}
                        size="md"
                        w="100%" 
                        justifySelf="center"
                        _hover= {{bg: "orange.400", color: "white"}} 
                        bgColor="#feb800" 
                        borderColor="yellow.800"
                        color="yellow.800"
                        _focus={{outlineColor: "yellow.800"}}
                        leftIcon={ <Icon  
                            as={BiUser} 
                            h="25px" w="25px" 
                            color="inherit"/>}
                    >
                        Mi cuenta
                    </Button>

                    <Button size="md" 
                        justifySelf="center"
                        _hover= {{bg: "orange.400", color: "white"}} 
                        bgColor="#feb800" 
                        borderColor="yellow.800"
                        color="yellow.800" 
                        leftIcon={ <Icon  
                            as={BiCart} 
                            h="25px" w="25px" 
                            color="inherit" 
                        />}
                        rightIcon={(cartItems!==0) ? 
                            (<Center 
                            borderRadius="999px" 
                            bgColor="red.600" 
                            w="3ch" h="3ch" 
                            color="white"
                            >
                                {cartItems}
                            </Center>) : 
                            (<Center 
                                borderRadius="999px" 
                                bgColor="inherit" 
                                w="3ch" h="3ch" 
                                color="white"
                                >
                                    🚀
                                </Center>)}
                    >
                        Mi carrito
                    </Button>
                    </VStack>
                </Box>
            </Flex>

            {/* NAV BAR */}
            <HStack 
                mx="10px"
                color="white" 
                mt="2px" 
                borderRadius="5px"
                borderColor= "#57a7dc"
                fontWeight="500" 
                bgColor="#57a7dc" 
                px="100px" 
                direction="row" 
                alignItems="center" 
                justifyContent="space-around" 
                h="40px"  
                divider={<StackDivider borderColor="gray.200" />}
            >
                <Box>
                    <Link _hover={{textDecoration: 'none'}}>
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
                    >
                        Contáctanos
                    </Link> 📞
                </Box>
                
            </HStack>

            {/* ACCOUNT DRAWER */}

            <MiCuentaDrawer isOpen={isOpen} onClose={onClose} />



        </div>
    );
}

export default Header;