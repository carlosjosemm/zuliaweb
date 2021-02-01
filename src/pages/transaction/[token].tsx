import { Box, Center, Heading, Image, Link, Spinner, useBreakpoint } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useEffect, 
    useState 
} from "react";
import Header from "../../components/Header";
import HeaderMobile from "../../components/HeaderMobile";
import db from "../../firebase";
import styles from "../../../styles/Home.module.css";

const Transaction: NextPage<{token: string}> = ({token}) => {
    const [outcome, setOutcome] = useState(null);
    const br = useBreakpoint();

    useEffect(() => {
        const checkToken = async () => {
        !outcome && await db.collection('data store').doc(token).get().then((doc) => {
            if (doc.exists) {
                const buffer = doc.data();
                // console.log(buffer)
                setOutcome(buffer.outcome);
            } else {console.log('doc doesnt exists')}
        })};

        checkToken();
        // console.log('token: ', token);
        // console.log('outcome: ', outcome);
    }, [outcome])
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
                {outcome? 
                    (outcome=='approved')?
                    <Center w="100%">
                        <Image src="../../../public/success.svg" />
                        <Heading
                        as="h2" size="xl" maxWidth="100%" textAlign="center" my="1ch" fontWeight="400"
                        >
                            Pago exitoso. Por favor, revisa tu correo.
                        </Heading>
                    </Center>
                    :
                    <Center w="100%">
                        <Heading
                        as="h2" size="xl" maxWidth="100%" textAlign="center" my="1ch" fontWeight="400"
                        >
                            Algo salio mal! Vuelve a intentarlo.
                        </Heading>
                    </Center>
                : <>
                    <Center w="100%">
                        <Heading
                        as="h2" size="xl" maxWidth="100%" textAlign="center" my="1ch" fontWeight="400"
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