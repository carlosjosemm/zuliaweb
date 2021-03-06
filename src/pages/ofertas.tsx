import React, { useEffect, useState } from 'react';  
import { Box, Center, Heading, IconButton, LightMode, Link, Spinner, useBreakpoint } from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
import Head from 'next/head';
import HeaderMobile from '../components/HeaderMobile';
import Header from '../components/Header';
import { useDataLayer } from '../DataLayer';
import { actionTypes } from '../reducer';
import db from '../firebase';
import ProductCard from '../components/ProductCard';
import { ProductData } from '../types';
import { SiWhatsapp } from 'react-icons/si';

const ofertas = () => {
    const br = useBreakpoint();
    const [{ofertproducts}, dispatch] = useDataLayer();
    const [show, useShow] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 150) {
                useShow(true);
                } else {
                useShow(false);
                }}
            )
        };

        const queryBuffer = []; 
        const getOfertProducts = () => {
            !ofertproducts?
            db.collection("products").where("ofert","==",true).where("availability", "==",true).get().then(
                (query) => {
                    query.forEach( product =>
                        queryBuffer.push(product.data())            
                    );
                    dispatch({
                        type: actionTypes.SET_OFERT_PRODUCTS, ofertproducts: queryBuffer,
                    });
                }
            ) : null
        };

        getOfertProducts();

        ofertproducts && console.log(ofertproducts.map(pr => pr.ofert)); 

        return () => {
            window.removeEventListener("scroll", () => {
                if (window.scrollY > 150) {
                useShow(true);
                } else {
                useShow(false);
                }} );
            };
    }, [ofertproducts]);

    return (
        <div className={styles.backgroundImg}>
           {console.log(br)}
           <noscript>You need to enable JavaScript to run this app.</noscript>
           <Head>
                <title>Ofertas⚡ - Zulia Pa' Llevar☀️</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/> */}
                <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                crossOrigin="anonymous"
                />
                {/* <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css' rel='stylesheet' /> */}
                <meta
                name="description"
                content="Ofertas del Zulia para Buenos Aires!"
                />
            </Head>

            <Box maxW="1000px" margin="auto" padding="0px" mb="0px" bgColor="#EBFAFF" minH="100vh">
                {br? (br=='base')? <HeaderMobile /> : <Header /> : <Center><Spinner /></Center>}
                <Center my="20px" textAlign="center">
                    <Heading as="h2" size="2xl" fontWeight="400">
                        Productos en descuento
                    </Heading>
                </Center>

                <Box d="flex" flexWrap="wrap" flexDir="row" justifyContent="center">
                    {ofertproducts? 
                        ofertproducts
                        .map((pr:ProductData, index:number) => (
                            <ProductCard product={pr} key={index} />
                        ))
                    : null}
                </Box>
                
                <LightMode>
                <Link href="https://wa.link/8xxfzu" isExternal >
                    <IconButton 
                        className={!show? styles.floatingButtonWhatsapp__hidden : styles.floatingButtonWhatsapp}
                        colorScheme="whatsapp" 
                        aria-label="Whatsapp"
                        borderRadius="full"
                        icon={<SiWhatsapp size="23px"/>}
                        color="white"
                        ></IconButton>
                </Link>
                </LightMode>
            </Box>
        </div>
    );
}

export default ofertas;