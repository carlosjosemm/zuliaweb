import { Box, Center, Heading, Spinner, useBreakpoint } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import styles from "../../styles/Home.module.css";
import Header from "../components/Header";
import HeaderMobile from "../components/HeaderMobile";
import ProductCatSlide from "../components/ProductCatSlide";

const categorias = () => {
    const br = useBreakpoint();

    return (
        <div className={styles.backgroundImg}>
            <Head>
                <title>Categorías - Zulia Pa' Llevar☀️</title>
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

            <Box maxW="1000px" margin="auto" padding="0px" mb="0px" bgColor="#EBFAFF" minH="100vh">
                {br? (br=='base')? <HeaderMobile /> : <Header /> : <Center><Spinner /></Center>}
                <Heading
                    as="h2" size="2xl" maxWidth="100%" textAlign="center" my="1ch" fontWeight="400"
                >
                   Productos por categoría
                </Heading>
{/* ////////////////////////////////////////////////////////////////////////////////////// */}
                <Heading
                    as="h2" size="lg" maxWidth="100%" textAlign="center" my="1ch" fontWeight="500"
                >
                   Harinas
                </Heading>
                <ProductCatSlide productCat="harinas" />
{/* //////////////////////////////////////////////////////////////////////////////////// */}
                <Heading
                    as="h2" size="lg" maxWidth="100%" textAlign="center" my="1ch" fontWeight="500"
                >
                   Frituras
                </Heading>
                <ProductCatSlide productCat="frituras" />
{/* /////////////////////////////////////////////////////////////////////////////////// */}
                <Heading
                    as="h2" size="lg" maxWidth="100%" textAlign="center" my="1ch" fontWeight="500"
                >
                   Preparados
                </Heading>
                <ProductCatSlide productCat="preparados" />
{/* /////////////////////////////////////////////////////////////////////////////// */}
                <Heading
                    as="h2" size="lg" maxWidth="100%" textAlign="center" my="1ch" fontWeight="500"
                >
                   Ingredientes
                </Heading>
                <ProductCatSlide productCat="ingredientes" />
{/* ////////////////////////////////////////////////////////////////////////////// */}
                <Heading
                    as="h2" size="lg" maxWidth="100%" textAlign="center" my="1ch" fontWeight="500"
                >
                   Bebidas
                </Heading>
                <ProductCatSlide productCat="bebidas" />
{/* /////////////////////////////////////////////////////////////////////////////// */}
                <Heading
                    as="h2" size="lg" maxWidth="100%" textAlign="center" my="1ch" fontWeight="500"
                >
                   Lácteos
                </Heading>
                <ProductCatSlide productCat="lacteos" />
{/* //////////////////////////////////////////////////////////////////////////// */}
                <Heading
                    as="h2" size="lg" maxWidth="100%" textAlign="center" my="1ch" fontWeight="500"
                >
                   Snacks
                </Heading>
                <ProductCatSlide productCat="snacks" />
            </Box>
        </div>
    );
}

export default categorias;