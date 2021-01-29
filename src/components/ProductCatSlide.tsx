import { Box, Center, Heading, Spinner, useBreakpoint } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ProductData } from "../types";
import ProductCard from "./ProductCard";
import Carousel from "react-elastic-carousel";
import db from "../firebase";
import { actionTypes } from "../reducer";
import { useDataLayer } from "../DataLayer";

interface ProductCatSlideProps {
    productCat: string;
}

const ProductCatSlide: React.FC<ProductCatSlideProps> = ({productCat}) => {
    const [{}, dispatch] = useDataLayer();
    const [productsFromCat, setProductsFromCat] = useState(null);
    const br = useBreakpoint();
    const breakPoints = [
        { width: 1, itemsToShow: 2, itemsToScroll: 1 },
        { width: 450, itemsToShow: 2, itemsToScroll: 1 },
        { width: 650, itemsToShow: 3, itemsToScroll: 1 },
        { width: 1200, itemsToShow: 3, itemsToScroll: 1 }
      ];

      useEffect(() => { 

        const queryBuffer = []; 
        const getHotProducts = () => {
            //Checking if it has already been fetched from firestore
            productsFromCat ?? db.collection("products").where("category","==", productCat).where("availability", "==",true).get().then(
                (query) => {
                    query.forEach( product =>
                        queryBuffer.push(product.data())            
                    );
                    setProductsFromCat(queryBuffer);
                }
            )
        };

        getHotProducts();
    }, []);

    return (
        <>
            {/* <Center my="20px">
                <Heading as="h2" size="2xl">
                    Destacados
                </Heading>
            </Center> */}
            <Box marginX={(br=='base')? '0px' : '2rem'}>
                    <Carousel  breakPoints={breakPoints} focusOnSelect={false} disableArrowsOnEnd={false} enableMouseSwipe={false}>
                    {productsFromCat? productsFromCat.map((pr:ProductData, index:number) => (
                            <ProductCard
                                key={index}
                                product={pr}
                            />
                    )) : <div><Center><Spinner /></Center></div> }
                    </Carousel>
            </Box>
        </>
    );
}

export default ProductCatSlide;