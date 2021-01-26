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
    LightMode,
} from "@chakra-ui/react";
import firebase from "firebase";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useDataLayer } from "../DataLayer";
import { auth, fbprovider, ggprovider } from "../firebase";
import { actionTypes } from "../reducer";
import {FaFacebook} from "react-icons/fa";


interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const MiCuentaDrawer: React.FC<DrawerProps> = ({isOpen, onClose}) => {
    const [{user}, dispatch] = useDataLayer();

    const signInGoogle = () => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(async () => {
            const result = await auth.signInWithPopup(ggprovider);
            const cleanCart = [];
            dispatch(
                { type: actionTypes.SET_USER, user: result.user, cart: cleanCart, dbTotal: 0 }
            );
        })
        .catch((error) => {
            // Handle Errors here.
            // var errorCode = error.code;
            var errorMessage = error.message;
            console.log('error: ', errorMessage);
        });
    };

    const signInFacebook = () => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then( async () => {
            fbprovider.addScope('email');
            await firebase.auth().signInWithPopup(fbprovider).then( (result) => {
                // @type {firebase.auth.OAuthCredential}
                // var credential = result.credential;
    
                // The signed-in user info.
                var userlogged: firebase.User = result.user;
                const cleanCart = [];

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                // var accessToken = credential.accessToken;
            })
            .catch((error) => {
                // Handle Errors here.
                // var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                // var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                // var credential = error.credential;
                console.log('error message: ', errorMessage);
                // ...
            });
        }
        )

            
    };
    const darkerGrey = '#404040';

    return (
        <>
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
                        {user? `Hola, ${user.displayName}!` : 'Mi Cuenta Zulia'}
                    </DrawerHeader>
                                
                    <DrawerBody 
                        display='flex' 
                        flexDirection='column' 
                        justifyContent='flex-end'
                        pb="50px"
                    >
                    
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
                        <>
                        <Button leftIcon={<Icon as={FcGoogle} w="25px" h="25px" />} 
                            variant="outline" 
                            color={darkerGrey} 
                            _active={{bg: 'grey'}}
                            borderColor="darkgrey" 
                            bgColor="white"
                            _hover={{bg: 'lighgrey'}}
                            _focus={{border: '1px solid darkgrey'}}
                            onClick={signInGoogle}
                            mb="10px"
                        >
                        Iniciar sesión con Google
                        </Button>
                        
                        <LightMode>
                            <Button leftIcon={<Icon as={FaFacebook} w="25px" h="25px" />} 
                            colorScheme="facebook"
                            onClick={signInFacebook}
                            >
                            Iniciar sesión con Facebook
                        </Button>
                        </LightMode>
                        </>
                    }
                    </DrawerBody>

                    <DrawerFooter>
                    </DrawerFooter>
                </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
}

export default MiCuentaDrawer;