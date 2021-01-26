import React, { 
    useEffect, 
} from "react";
import { useDataLayer } from "../DataLayer";
import db from "../firebase";
import { actionTypes } from "../reducer";
import { ProductData } from "../types";
import { Box, Heading, useBreakpoint } from "@chakra-ui/react";
import Carousel from "react-elastic-carousel";
import { Center } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

const HotProductSlide = () => {
    const [{hotproducts}, dispatch] = useDataLayer();
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
            db.collection("products").where("hot","==",true).where("availability", "==",true).get().then(
                (query) => {
                    query.forEach( product =>
                        queryBuffer.push(product.data())            
                    );
                    dispatch({
                        type: actionTypes.SET_HOT_PRODUCTS, hotproducts: queryBuffer
                    });
                }
            )
        };
        getHotProducts();
    }, []);

    return (
        <>
            <Center my="20px">
                <Heading as="h2" size="2xl">
                    Destacados
                </Heading>
            </Center>
            <Box marginX={(br=='base')? '0px' : '2rem'}>
                    <Carousel  breakPoints={breakPoints} focusOnSelect={false} disableArrowsOnEnd={false} enableMouseSwipe={false}>
                    {hotproducts? hotproducts.map((pr:ProductData, index:number) => (
                            <ProductCard
                                key={index}
                                product={pr}
                            />
                    )) : <div></div> }
                    </Carousel>
            </Box>
        </>
    );
}

export default HotProductSlide;