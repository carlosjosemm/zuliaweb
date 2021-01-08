import { Box } from '@chakra-ui/react'
import Header from '../components/Header'
import HotProductSlide from '../components/HotProductSlide';
import { useDataLayer } from '../DataLayer'
// import db from '../firebase';
// import { useEffect, useState } from 'react';
// import HeaderMobile from '../components/HeaderMobile'

export default function Home() {
  const [{user}, dispatch] = useDataLayer();
  // const [products, useProducts] = useState(null);
  
  // useEffect(() => {
  //     db.collection('products').doc('dontostonajo').set({
  //       availability: true,
  //       discount: 1,
  //       ofert: false,
  //       price: 120,
  //       unit: 'unidad', 
  //       unity: false,
  //       name: "Don Toston Ajo 60gr",
  //       photoURL:"https://i.imgur.com/kVm6VXm.jpg"
  //     }).then((docRef) => {
  //       console.log(`producto creado con id: ${docRef}`);
  //       }).catch(function(error) {
  //         console.error("Error writing document: ", error); 
  //     });

  //       db.collection("products").get().then(pr => {
  //         useProducts(pr.docs.map(
  //           doc => ({
  //             id: doc.id, data: doc.data()
  //           })
  //         ));
  //         console.log(pr.docs.map(doc => (doc.data())));
  //         console.log(products);
  //       });
  //   }
  // , []);

  return (
    
    <div>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossOrigin="anonymous"
      />

      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <Box bgColor="yellow.50">
        <Header />
        {/* <HeaderMobile /> */}     
        <HotProductSlide />
      </Box>
    </div>
    
  )
}
