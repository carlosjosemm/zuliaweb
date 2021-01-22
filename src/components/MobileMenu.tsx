import { Button, Drawer, DrawerBody, Text, DrawerContent, DrawerHeader, DrawerOverlay, Icon, Link, useDisclosure, IconButton } from "@chakra-ui/react";
import React from "react";
import { HiMenu } from "react-icons/hi";
import {IoClose, IoCloseSharp} from 'react-icons/io5';

const strongcolor = 'yellow.50';
const lightcolor = 'yellow.500';


const MobileMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton 
                aria-label="menu"
                icon={!isOpen ? 
                <Icon as={HiMenu} h="3ch" w="3ch" color={strongcolor} /> :
                <Icon as={IoClose} h="3ch" w="3ch" color={strongcolor} />} 
                onClick={onOpen}
            />

            <Drawer placement="top" onClose={onClose} isOpen={isOpen} isFullHeight={false} isCentered={true} >
                <DrawerOverlay>
                <DrawerContent bgColor={lightcolor}>
                    <DrawerHeader borderBottomWidth="1px" color="white" d="flex" justifyContent="space-between">
                        <Link 
                            _focus={{border: 'none', textDecoration: 'none'}} 
                            _visited={{color:'white'}} 
                            _active={{border: 'none', textDecoration: 'none'}} 
                            href="/"
                        >
                            <Text fontSize="2xl">Zulia Pa' Llevar ☀️</Text>
                        </Link>
                        <IconButton aria-label="close" icon={<IoCloseSharp />} onClick={onClose} />
                    </DrawerHeader>
                    <DrawerBody 
                        d="flex" 
                        flexDirection="column"
                        color="white"
                    >
                          
                    <Link 
                        my="1ch"
                        _focus={{border: 'none', textDecoration: 'none'}} 
                        _visited={{color:'white'}} 
                        _active={{border: 'none', textDecoration: 'none'}}
                    >
                        <Text fontSize="xl">Ofertas</Text></Link>
                    <Link 
                        my="1ch"
                        _focus={{border: 'none', textDecoration: 'none'}} 
                        _visited={{color:'white'}} 
                        _active={{border: 'none', textDecoration: 'none'}}
                    >
                        <Text fontSize="xl">Categorias</Text></Link>
                    <Link 
                        my="1ch"
                        _focus={{border: 'none', textDecoration: 'none'}} 
                        _visited={{color:'white'}} 
                        _active={{border: 'none', textDecoration: 'none'}}
                    >
                        <Text fontSize="xl">Marcas</Text></Link>
                    <Link 
                        my="1ch" 
                        href="/contacto"
                        _focus={{ textDecoration: 'none'}} 
                        _visited={{color:'white'}}
                        _active={{ textDecoration: 'none'}}
                    >
                        <Text fontSize="xl">Contactanos</Text></Link>
                    </DrawerBody>
                </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
}

export default MobileMenu;