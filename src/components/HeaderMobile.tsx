import { Box, Button, Flex, Icon, Image, Input, InputGroup, InputRightElement, Spacer, useBreakpoint, useBreakpointValue } from "@chakra-ui/react";
import {HiMenu} from 'react-icons/hi';
import {BiSearch, BiUser, BiCart} from 'react-icons/bi';
import {IoClose} from 'react-icons/io5';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    // MenuItemOption,
    // MenuGroup,
    // MenuOptionGroup,
    // MenuIcon,
    // MenuCommand,
    MenuDivider,
  } from "@chakra-ui/react";

const HeaderMobile: React.FC<{}> = () => {
    const strongcolor = 'yellow.50';
    const lightcolor = 'yellow.500';
    const breakpoint = useBreakpointValue({base: 'normal', md: 'medium', sm: 'small', lg: 'lg'});
    const logoSize = useBreakpointValue({sm: '130px', base: '300px', md: '130px', lg: '130px', xl:'130px'})
    const br = useBreakpoint();
    const buttonSize = useBreakpointValue({})
    const menuSize=
    console.log('br: ',br);
    return (
            <Flex position="sticky" top="0" bg={lightcolor} justifyContent="space-between" height="60px" alignItems="center" >
                {/* HEADER LEFT */}
                <Box mx="10px" >
                    <Menu >
                        {({isOpen}) => (
                            <>
                            <MenuButton size='xs' _hover={{bg: 'yellow.100'}} isActive={isOpen} as={Button} rightIcon={!isOpen ? 
                                <Icon as={HiMenu} h="24px" w="24px" color={strongcolor} /> :
                                <Icon as={IoClose} h="30px" w="30px" color={strongcolor} /> } />
                        
                            <MenuList borderWidth="1px" borderColor={strongcolor} bgColor="yellow.50" color={lightcolor}>
                                <MenuItem>Ofertas</MenuItem>
                                <MenuDivider />
                                <MenuItem>Categorias</MenuItem>
                                <MenuDivider/>
                                <MenuItem>Marcas</MenuItem>
                                <MenuDivider/>
                                <MenuItem>Contactanos</MenuItem>
                            </MenuList>
                            </>
                        )}
                    </Menu>
                </Box>

                <Box p="2">
                    <Image
                        boxSize={logoSize}
                        objectFit="contain"
                        src="https://i.imgur.com/3xajgtl.png"
                        alt="logo"
                        />
                    
                </Box>

                <Spacer />
            {/* HEADER CENTER */}
                <Box mx="10px">
                    <InputGroup>
                    <InputRightElement children={
                        <Icon 
                            mx="10px" 
                            as={BiSearch} 
                            h="30px" w="30px" 
                            color={strongcolor} 
                        />} 
                    />

                    <Input variant="outline" bgColor={lightcolor} borderColor={strongcolor} color={strongcolor} focusBorderColor={strongcolor} placeholder="Buscar producto..." size="md" />    
                    </InputGroup>
                </Box>    
                <Spacer />
            {/* HEADER RIGHT            */}
                <Box>
                    <Button _hover={{bg: lightcolor}} bgColor={lightcolor} color={strongcolor} leftIcon={ <Icon  
                            as={BiUser} 
                            h="25px" w="25px" 
                            color={strongcolor} 
                        />}>
                        {((br=='sm')||(br=='base')) ? '' : 'Mi cuenta'}
                    </Button>
                    <Button size="xs" _hover={{bg: lightcolor}} bgColor={lightcolor} color={strongcolor} leftIcon={ <Icon  
                            as={BiCart} 
                            h="25px" w="25px" 
                            color={strongcolor} 
                        />}>
                        {((br=='sm')||(br=='base')) ? '' : 'Mi carrito'}
                    </Button>
                </Box>
            </Flex>
    );
}

export default HeaderMobile;