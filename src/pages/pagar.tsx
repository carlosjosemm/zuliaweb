import { Box, Center, Spinner, useBreakpoint } from "@chakra-ui/react"
import Head from "next/head"
import styles from "../../styles/Home.module.css";
import React, { useEffect } from "react"
import HeaderMobile from "../components/HeaderMobile";
import Header from "../components/Header";

const pagar = () => {
    const br = useBreakpoint();

    useEffect(() => {
        // let script = document.createElement();
        let script = document.createElement("script");
        // let anchor = document.getElementById("inject-comments-for-uterances");
        script.setAttribute("src", "https://www.mercadopago.com.ar/integrations/v1/web-tokenize-checkout.js");
        script.type = "text/javascript";
        script.setAttribute("data-public-key", "TEST-2ae58add-cfc4-4931-8531-92b47a74bff2");
        script.setAttribute("data-transaction-amount", "100.00");
        // docRef.current = script;
        const test = document.getElementById('ml-button'); //appendChild(script);
        document.getElementById('ml-button').appendChild(script);
        console.log(test)
    }, [])


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
            <Center w="100%" my="1rem" >
            <form id="ml-button" action={(process.env.NODE_ENV=='production')? 'https://zuliaweb.vercel.app/api/checkout' : 'http://localhost:3000/api/checkout'} method="POST"></form>
            </Center>
            </Box>

        </div>
    );
}

export default pagar;