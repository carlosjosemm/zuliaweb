import { Box } from '@chakra-ui/react'
import Header from '../components/Header'
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
      <Box bgColor="yellow.100">
        <Header />
        {/* <HeaderMobile /> */}     
      </Box>
    </div>
    
  )
}
