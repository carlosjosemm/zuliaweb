import { Box, Center, Spinner, useBreakpoint } from "@chakra-ui/react"
import Head from "next/head"
import styles from "../../styles/Home.module.css";
import React, { useEffect, useRef, 
    // useState 
} from "react"
import HeaderMobile from "../components/HeaderMobile";
import Header from "../components/Header";
import { useDataLayer } from "../DataLayer";
import {v4} from 'uuid';
import axios from 'axios';
import { actionTypes } from "../reducer";

const pagar = () => {
    const [{cart, user, paytoken}, dispatch] = useDataLayer();
    const br = useBreakpoint();
    // const [paytoken, setPaytoken] = useState(v4());
    // const paytoken = useRef(null);

    // if (!paytoken.current) {
    //     paytoken.current = v4();
    //     console.log('paytoken.current: ', paytoken.current);
    // }
    // const buffer = v4();
    // if (!paytoken) {
    //     dispatch({type: actionTypes.SET_PAYTOKEN, paytoken: buffer });
    //     console.log('paytoken: ', paytoken);
    // }
    
    const initPay = (e) => {
        e.preventDefault();
        const host = (process.env.NODE_ENV=='production')? 'https://zuliaweb.vercel.app/api/pending' : 'http://localhost:3000/api/pending';
        axios.post(`${host}/${paytoken}`, {
            total: 100,
            user: 'carlos@carlos.com',
            cart: ['queso', 'leche']
        }).then((res) => console.log(res)).catch(error => console.error(error));
    }

    useEffect(() => {
        const buffer = v4();
        //To avoid multiple children appended, this only runs on first load when paytoken is null:
        if (!paytoken) {
            dispatch({type: actionTypes.SET_PAYTOKEN, paytoken: buffer });
            console.log('paytoken: ', paytoken);
            let script = document.createElement("script");
            script.setAttribute("src", "https://www.mercadopago.com.ar/integrations/v1/web-tokenize-checkout.js");
            script.type = "text/javascript";
            script.setAttribute("data-public-key", "TEST-2ae58add-cfc4-4931-8531-92b47a74bff2");
            script.setAttribute("data-transaction-amount", "100.00");
            // const test = document.getElementById('ml-button');
            document.getElementById('ml-button').appendChild(script);    
        };
        console.log('paytoken post-render: ', paytoken);
    }, [paytoken])


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
            <form id="ml-button" action={(process.env.NODE_ENV=='production')? `https://zuliaweb.vercel.app/api/checkout/${paytoken}` : `http://localhost:3000/api/checkout/${paytoken}`} method="POST" onClick={initPay} ></form>
            </Center>
            </Box>

        </div>
    );
}

export default pagar;