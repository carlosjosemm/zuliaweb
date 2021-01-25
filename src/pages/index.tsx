import Head from 'next/head'
import { Box, Center, IconButton, LightMode, Link, Spinner, useBreakpoint } from '@chakra-ui/react'
import Header from '../components/Header'
import HotProductSlide from '../components/HotProductSlide';
import { useDataLayer } from '../DataLayer'
import IgPostsBanner from '../components/IgPostsBanner';
import React, { 
  useState, 
  useEffect,
} from 'react';
import {SiWhatsapp} from "react-icons/si";
import styles from "../../styles/Home.module.css";
// import InstagramEmbed from 'react-instagram-embed';
// import db from '../firebase';
import HeaderMobile from '../components/HeaderMobile'
import * as ProductDataRaw from '../../data/product-data.json';

export default function Home() {
  const [{user}, dispatch] = useDataLayer();
  const [show, useShow] = useState(true);
  const br = useBreakpoint();
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        useShow(true);
      } else {
        useShow(false);
      }
      return () => {
        window.removeEventListener("scroll", this.window);
    };
  });

  const products = Object.entries(ProductDataRaw)[0][1]; //object with parsed data of products from the json file
  const upQuery = Object.keys(products); // array of all products ids
  console.log(upQuery);
  // upQuery.forEach((id) => {
  //   // console.log(id);
  //   // const data = ProductDataRaw[id];
  //   // console.log(data[0]);
  //   // console.log(products);
  //         db.collection('products').doc(id).set({
  //           availability: (products[id][0].price == 'N/A')? false : true,
  //           discount: products[id][0].discount,
  //           ofert: products[id][0].ofert,
  //           price: parseFloat(products[id][0].price),
  //           unit: products[id][0].unity? 'Kg' : 'unidad', 
  //           unity: products[id][0].unity,
  //           name: products[id][0].name,
  //           photoURL:products[id][0].photoURL,
  //         }).then((id) => {
  //           console.log(`producto creado con id: ${id}`);
  //         }).catch((error) => {
  //           console.error("Error writing document: ", error); 
  //         });
  // })

  //       db.collection("products").get().then(pr => {
  //         useProducts(pr.docs.map(
  //           doc => ({
  //             id: doc.id, data: doc.data()
  //           })
  //         ));
  //         console.log(pr.docs.map(doc => (doc.data())));
  //         console.log(products);
  //       });
    }
  , []);

  return (
    <div className={styles.backgroundImg}>
    {console.log(br)}
      <Head>
        <title>Zulia Pa' Llevar☀️</title>
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
          content="Del Zulia para Buenos Aires!"
        />
      </Head>
      <noscript>You need to enable JavaScript to run this app.</noscript>

      <Box maxW="1000px" margin="auto" padding="0px" mb="0px" bgColor="#EBFAFF" minH="100vh">
        {br? (br=='base')? <HeaderMobile /> : <Header /> : <Center><Spinner /></Center>}
        
        <HotProductSlide />

        {/* <InstagramEmbed
          url='https://www.instagram.com/p/CIopViaj9NG/'
          clientAccessToken='485012469136259|609cdbf6afd98b1a289baeb616eb456b'
          maxWidth={500}
          hideCaption={true}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {console.log('instagram plugin failed')}}
        /> */}

        <IgPostsBanner />

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
  )
}
