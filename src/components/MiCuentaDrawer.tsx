import { 
    Drawer, 
    DrawerOverlay, 
    DrawerContent, 
    DrawerCloseButton, 
    DrawerHeader, 
    DrawerBody, 
    Button, 
    Icon, 
    DrawerFooter, 
    Center 
} from "@chakra-ui/react";
import firebase from "firebase";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useDataLayer } from "../DataLayer";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const MiCuentaDrawer: React.FC<DrawerProps> = ({isOpen, onClose}) => {
    const [{user}, dispatch] = useDataLayer();

    const signInGoogle = () => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(async () => {
            const result = await auth.signInWithPopup(provider);
            dispatch(
                { type: actionTypes.SET_USER, user: result.user }
            );
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    };

    const darkerGrey = '#404040';

    return (
        <div>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                // finalFocusRef={btnRef}
            >
                <DrawerOverlay >
                <DrawerContent bgColor="yellow.100">
                    <DrawerCloseButton color="yellow.800" />
                    <DrawerHeader color="yellow.800" borderBottom="1px solid darkgrey">
                        {user? `Hola, ${user.displayName}!` : 'Crea tu Cuenta'}
                    </DrawerHeader>
                                
                    <DrawerBody display='flex' flexDirection='column' justifyContent='space-around'>
                    
                    <Center>
                    {user ? 
                        
                        <Button  
                            variant="outline" 
                            color={darkerGrey} 
                            borderColor="darkgrey" 
                            bgColor="white"
                            _hover={{bg: 'lighgrey'}}
                            _active={{bg: 'grey'}}
                            _focus={{border: '1px solid darkgrey'}}
                            onClick={() => 
                                {firebase.auth().signOut().then(() => {
                                    // Sign-out successful.
                                  }).catch((error) => {
                                    // An error happened.
                                    console.log(error)
                                  });
                                }
                            }   
                        >
                            Cerrar sesion
                        </Button> :
                        <Button leftIcon={<Icon as={FcGoogle} w="25px" h="25px" />} 
                            variant="outline" 
                            color={darkerGrey} 
                            _active={{bg: 'grey'}}
                            borderColor="darkgrey" 
                            bgColor="white"
                            _hover={{bg: 'lighgrey'}}
                            _focus={{border: '1px solid darkgrey'}}
                            onClick={signInGoogle}
                        >
                        Iniciar sesión con Google
                        </Button>
                    }
                    </Center>                    
                    </DrawerBody>

                    <DrawerFooter>
                    {/* <Button boxShadow="0 2px 3px  rgba(0, 0, 0, 0.2)" borderColor="yellow.800" color="yellow.800" variant="outline" mr={3} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button color="yellow.800" borderColor="yellow.500" boxShadow="0 2px 3px  rgba(0, 0, 0, 0.2)" bgColor="#feb800" variant="outline">
                        Save
                    </Button> */}
                    </DrawerFooter>
                </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </div>
    );
}

export default MiCuentaDrawer;