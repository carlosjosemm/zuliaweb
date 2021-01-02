import { Box, Button, Flex, Icon, Image, Input, InputGroup, InputRightElement, Spacer } from "@chakra-ui/react";
import {HiMenu} from 'react-icons/hi';
import {BiSearch} from 'react-icons/bi';
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
    // MenuDivider,
  } from "@chakra-ui/react";

const Header: React.FC<{}> = () => {
    return (
            <Flex position="sticky" top="0" bg='purple.500' justifyContent="space-between" height="70px" alignItems="center" >
                <Box >
                    <Menu colorScheme="purple">
                        {({isOpen}) => (
                            <>
                            <MenuButton isActive={isOpen} as={Button} rightIcon={!isOpen ? 
                                <Icon as={HiMenu} h="30px" w="30px" color="purple.50" /> :
                                <Icon as={IoClose} h="30px" w="30px" color="purple.50" /> } />
                        
                            <MenuList bgColor="purple.200" color="purple.700">
                                <MenuItem>Download</MenuItem>
                                <MenuItem>Create a Copy</MenuItem>
                                <MenuItem>Mark as Draft</MenuItem>
                                <MenuItem>Delete</MenuItem>
                                <MenuItem>Attend a Workshop</MenuItem>
                            </MenuList>
                            </>
                        )}
                    </Menu>
                </Box>
                <Box p="2">
                    <Image
                        boxSize="120px"
                        objectFit="contain"
                        src="https://i.imgur.com/3xajgtl.png"
                        alt="logo"
                        />
                    
                </Box>

                <Spacer />

                <Box mx="10px">
                    <InputGroup>
                    <InputRightElement children={
                        <Icon 
                            mx="10px" 
                            as={BiSearch} 
                            h="30px" w="30px" 
                            color="purple.50" 
                        />} 
                    />

                    <Input variant="filled" placeholder="Buscar producto..." size="md" />    
                    </InputGroup>
                </Box>               
            </Flex>
    );
}

export default Header;