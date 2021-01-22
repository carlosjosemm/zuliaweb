import { Box, Center, 
    Heading, 
    Radio, 
    RadioGroup, 
    Spinner, 
    Stack, 
    useBreakpoint 
} from "@chakra-ui/react";
import React, { 
    useEffect, 
    useRef, 
    useState, 
} from "react";
import { useDataLayer } from "../DataLayer";
import styles from "../../styles/Home.module.css";
import HeaderMobile from "../components/HeaderMobile";
import Header from "../components/Header";
import Head from "next/head";
import { GoogleMap, 
    Marker, 
    useLoadScript ,
    DistanceMatrixService,
    DirectionsService,
    DirectionsRenderer,
} from "@react-google-maps/api";

const key = process.env.NEXT_PUBLIC_GOOGLEMAPSKEY;

const contacto = () => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: key,
        libraries: ['places'],
    });
    const [distance, setDistance] = useState(null);
    const MapCenter = useRef({center: {
            lat: -34.58828073401789,
            lng: -58.40096530040079, 
    }});
    // const directions = useRef(null);
    const [directions, setDirections] = useState(null);
    const [{user, cart}, dispatch] = useDataLayer();
    const [userLoc, setUserLoc] = useState(null);
    const [travel, setTravel] = useState('TRANSIT');
    const br = useBreakpoint();

    if (!isLoaded) {
        console.log('loading map')
    } else {
        console.log('map loaded sucessfully')
    };

    if (loadError) {
        console.log('map failed to load: ', loadError);
    }

    const mapStyle={
        width: "100%",
        height: (br=='base')? '40vh' : '60vh',
    };
    
    const mapInitCenter = {
        lat: -34.58828073401789,
        lng: -58.40096530040079, 
    }

    // useEffect(() => {
    //     // window.addEventListener("scroll", () => {
    //     //     if (window.scrollY > 150) {
    //     //         useShow(true);
    //     //     } else {
    //     //         useShow(false);
    //     //     }
    //     //     return () => {
    //     //         window.removeEventListener("scroll", this.window);
    //     //     };
    //     // });
    // }
    // , []);
    
    return (
        <div className={styles.backgroundImg}>
            <Head>
                <title>Contactanos - Zulia Pa' Llevar☀️</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
                <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                crossOrigin="anonymous"
                />
                <meta
                name="description"
                content="Del Zulia para Buenos Aires!"
                />
            </Head>

            <noscript>You need to enable JavaScript to run this app.</noscript>

            <Box maxW="1000px" margin="auto" padding="0px" mb="0px" bgColor="#EBFAFF" h="100vh">
                {br? (br=='base')? <HeaderMobile /> : <Header /> : <Center><Spinner /></Center>}
                <Heading
                    as="h2" size="md" maxWidth="100%" textAlign="center" my="1ch"
                >
                   📍 Donde estamos 📍
                </Heading>
                <Box
                    w="100%"
                    h="100%"
                    my="1ch"
                >
                    {isLoaded? 
                    <>
                        <GoogleMap
                            
                            mapContainerStyle={mapStyle}
                            onLoad={(map) => {
                                MapCenter.current.center.lat = map.center.lat();
                                MapCenter.current.center.lng = map.center.lng();
                            }}
                            zoom={15}
                            center={MapCenter.current.center}
                            onClick={event => {
                                setUserLoc({
                                    lat: event.latLng.lat(),
                                    lng: event.latLng.lng(), 
                                });
                            }}
                        >
                            <Marker position={mapInitCenter}><span>AQUI ESTAMOS</span></Marker>
                            {/* {userLoc? <Marker position={userLoc}><span>AQUI ESTA EL USUARIO</span></Marker> : null} */}
                            {userLoc? <>
                            <DirectionsService 
                                options={{
                                    destination: mapInitCenter,
                                    origin: userLoc,
                                    travelMode: travel,
                                }}
                                callback={ res => setDirections(res) }
                            /> 
                            <DirectionsRenderer
                                // required
                                options={{
                                    directions: directions
                                }}
                                // optional
                                // onLoad={directionsRenderer => {
                                //     console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                                // }}
                                // optional
                                // onUnmount={directionsRenderer => {
                                //     console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                                // }}
                            />
                            </>
                            : null}
                        </GoogleMap>

                        {userLoc? //SI EL USUARIO MARCA UBICACION, SE CALCULA DISTANCIA
                            <DistanceMatrixService 
                            options={{
                                destinations: [mapInitCenter],
                                origins: [userLoc],
                                travelMode: "DRIVING",
                              }}
                              callback={(res) => {
                                if (distance) {
                                if (res.rows[0].elements[0].distance.value!==distance.value) {
                                setDistance({
                                    text: res.rows[0].elements[0].distance.text,
                                    value: res.rows[0].elements[0].distance.value,
                                })}} else {
                                    setDistance({
                                        text: res.rows[0].elements[0].distance.text,
                                        value: res.rows[0].elements[0].distance.value,
                                    })
                                }
                              }}
                        />
                        :
                        null
                        }
                        
                        </>
                    : <Center>Cargando Mapa... <Spinner /></Center>}

                    <RadioGroup  onChange={(nextValue:string) => setTravel(nextValue)} value={travel} mt="1ch">
                    <Stack direction="row" justifyContent="center">
                        <Radio colorScheme="yellow" value="TRANSIT">Transito</Radio>
                        <Radio colorScheme="yellow" value='WALKING'>Caminando</Radio>
                        <Radio colorScheme="yellow" value='DRIVING'>Automovil</Radio>
                        <Radio colorScheme="yellow" value='BICYCLING'>Bicicleta</Radio>
                    </Stack>
                    </RadioGroup>

                    <Heading
                        as="h2" size="md" maxWidth="100%" textAlign="center" my="0.5ch"
                    >
                        {distance? `La distancia hasta tu ubicacion es de ${distance.text}`: 'Marca tu ubicacion en el mapa!'}
                    </Heading>
                </Box>
            </Box>

        </div>
    );
}

export default contacto;