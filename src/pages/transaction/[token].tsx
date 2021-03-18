import { Box, Center, Flex, Heading, Image, Link, Spinner, useBreakpoint } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import React, { useRef } from "react";
import { useEffect, 
    useState 
} from "react";
import Header from "../../components/Header";
import HeaderMobile from "../../components/HeaderMobile";
import db from "../../firebase";
import styles from "../../../styles/Home.module.css";

// type outcomeTypes = "accredited" | "pending_contingency" | "cc_rejected_other_reason" | "cc_rejected_call_for_authorize" | "cc_rejected_insufficient_amount" | "cc_rejected_bad_filled_security_code" | "cc_rejected_bad_filled_date" | "cc_rejected_bad_filled_other" | "none";
const outcomeType = {
    accredited: "accredited",
    pending_contingency: "pending_contingency",
    cc_rejected_other_reason: "cc_rejected_other_reason",
    cc_rejected_call_for_authorize: "cc_rejected_call_for_authorize",
    cc_rejected_insufficient_amount: "cc_rejected_insufficient_amount",
    cc_rejected_bad_filled_security_code: "cc_rejected_bad_filled_security_code",
    cc_rejected_bad_filled_date: "cc_rejected_bad_filled_date",
    cc_rejected_bad_filled_other: "cc_rejected_bad_filled_other",
    none: "none",
} 
const Transaction: NextPage<{token: string}> = ({token}) => {
    const [outcome, setOutcome] = useState('loading');
    const [paymentData, setPaymentData] = useState(null);
    const [displayText, setDisplayText] = useState(null);
    const br = useBreakpoint();

    useEffect(() => {
        const checkToken = async () => {  
            console.log('detail: ', paymentData?.detail);
            //Check for display text:
            if (outcome!=='loading') {
                console.log('outcome from switch: ', outcome);
                console.log('paymentData from switch: ', paymentData);
                switch (paymentData.detail) {
                    case outcomeType.accredited: 
                        setDisplayText("Pago procesado. Nos pondremos en contacto contigo muy pronto.");
                        break;
                    case outcomeType.cc_rejected_bad_filled_date:
                        setDisplayText("Pago fallido. Fecha de expiracion invalida.");
                        break;
                    case outcomeType.cc_rejected_bad_filled_other:
                        setDisplayText("Pago fallido. Hubo un error en el procesamiento del pago.")
                        break;
                    case outcomeType.cc_rejected_bad_filled_security_code:
                        setDisplayText("Pago fallido. Codigo de seguridad invalido.");
                        break;
                    case outcomeType.cc_rejected_call_for_authorize:
                        setDisplayText("Pago fallido. Hubo un error en el procesamiento del pago.");
                        break;
                    case outcomeType.cc_rejected_insufficient_amount:
                        setDisplayText("Pago fallido. Saldo insuficiente.");
                        break;
                    case outcomeType.pending_contingency:
                        setDisplayText("Pago pendiente. El proceso de pago esta en progreso, nos pondremos en contacto muy pronto.");
                        break;
                    default:
                        setDisplayText("Parece que hubo un error!Por favor, intenta de nuevo.");
                }
                console.log('displayText: ', displayText)
            };
            outcome=='loading' && await db.collection('data store').doc(token).get().then((doc) => {
                if (doc.exists) {
                    const buffer = doc.data();
                    setPaymentData(buffer);
                    setOutcome(buffer.outcome);

                    console.log('outcome: ', outcome);
                    console.log('paymentData: ', paymentData);
                } else {
                    setOutcome(null);
                };
            })
        };    
        //Call the function:
        checkToken();
         
    }, [outcome]);

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
                <div>{displayText}</div>
                {outcome? 

                    (outcome=='approved')? 
                        (paymentData.detail=='accredited')?
                        <>
                        <Flex w="100%" alignItems="center" flexDir="column" my="1rem">
                            <Image src="https://i.imgur.com/mMVWT59.png" maxW="50vw" w="20ch" h="20ch" maxH="50vh" />
                            <Heading
                            as="h2" size="lg" maxWidth="100%" textAlign="center" my="1ch" fontWeight="400"
                            >
                                Pago procesado. Nos pondremos en contacto contigo muy pronto.
                            </Heading>
                        </Flex>
                        </>
                        : <></>
                    :
                    (outcome=='loading')?
                        <Center w="100%" my="1rem">
                        <Spinner />
                        </Center>
                        :
                        <Center w="100%">
                            <Heading
                            as="h2" size="xl" maxWidth="100%" textAlign="center" my="1rem" fontWeight="400"
                            >
                                Algo salio mal! Vuelve a intentarlo.
                            </Heading>
                        </Center>
                : <>
                    <Center w="100%">
                        <Heading
                        as="h2" size="xl" maxWidth="100%" textAlign="center" my="1rem" fontWeight="400"
                        >
                            Parece que estas perdido 🤔 vuelve al <Link href="/">inicio</Link>.
                        </Heading>
                    </Center>
                </>}
            </Box>

        </div>
    );
}

Transaction.getInitialProps = ({query}) => {
    return {
        token: query.token as string
    }
}

export default Transaction;