import { Box, Button, Center, Flex, HStack, Icon, IconButton, Image, Input, InputGroup, InputRightElement, LightMode, Link, StackDivider, useDisclosure, VStack } from "@chakra-ui/react";
import firebase from "firebase";
import React, { useEffect, useRef, useState } from "react";
import { BiCart, BiSearch, BiUser } from "react-icons/bi";
import { useDataLayer } from "../DataLayer";
import { actionTypes } from "../reducer";
import MiCuentaDrawer from "./MiCuentaDrawer";
import {FaFacebook, FaInstagram,} from "react-icons/fa";
import {SiWhatsapp} from "react-icons/si";
import { CartItem } from "../types";

interface HeaderProps {};

const Header:React.FC<HeaderProps> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const [{user, cart}, dispatch] = useDataLayer();

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
        <>
            <Flex px="20px" direction="row" alignItems="flex-end" justifyContent="space-between" h="150px">

            {/* HEADER LEFT */}
            <Box mb="20px" ml="20px" >
                <VStack>
                    <Flex mb="10px" minW="130px" w="100%" direction="row" alignItems="flex-end" justifyContent="space-evenly">
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
                    <InputRightElement children={
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
                        size="md"
                        bgColor="#feb800"
                        // bgColor="white"
                    />    
                    </LightMode>
                    
                    </InputGroup>
                </VStack>
            </Box >
                {/* HEADER CENTER  */}
                    <Image
                        h="100%" 
                        p="10px"
                        fit="contain"
                        src="https://i.imgur.com/3xajgtl.png"
                        alt="logo"
                    />
                {/* HEADER RIGHT */}
                <Box 
                    mb="20px" 
                    mr="20px"
                >
                    <VStack>
                    <Button ref={btnRef} onClick={onOpen}
                        size="md"
                        w="100%" 
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

                    <Button size="md" 
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
                                {cart.length}
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
                </Box>
            </Flex>

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



        </>
    );
}

export default Header;