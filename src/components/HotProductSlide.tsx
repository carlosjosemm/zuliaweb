import React, { 
    useEffect, 
} from "react";
import { useDataLayer } from "../DataLayer";
import db from "../firebase";
import { actionTypes } from "../reducer";
import { ProductData } from "../types";
import { Box, Heading } from "@chakra-ui/react";
import Carousel from "react-elastic-carousel";
import { Center } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

const HotProductSlide = () => {
    const [{hotproducts}, dispatch] = useDataLayer();

    const breakPoints = [
        { width: 1, itemsToShow: 1, itemsToScroll: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 1 },
        { width: 768, itemsToShow: 3, itemsToScroll: 1 },
        { width: 1200, itemsToShow: 3, itemsToScroll: 1 }
      ];
    

    useEffect(() => {
        const queryBuffer = []; 
        const getHotProducts = () => {
            db.collection("products").where("hot","==",true).get().then(
                (query) => {
                    query.forEach( product =>
                        queryBuffer.push(product.data())            
                    );
                    dispatch({
                        type: actionTypes.SET_HOT_PRODUCTS, hotproducts: queryBuffer
                    });
                    // console.log('hotproducts: ', hotproducts.map((pr:ProductData) => pr.price));            
                }
            )
        };
        getHotProducts();
        // dispatch({
        //     type: actionTypes.SET_HOT_PRODUCTS, hotproducts: queryBuffer
        // });
        console.log(`useEffect was here...`);
        // hotproducts? console.log('hotproducts: ', hotproducts.map((pr:ProductData) => pr.price)) : null;
    }, []);

    return (
        <>
            <Center my="20px">
                <Heading as="h2" size="2xl">
                    Destacados
                </Heading>
            </Center>

            <Box marginX="5vw">
                    <Carousel className="rec-arrow" breakPoints={breakPoints} focusOnSelect={false} disableArrowsOnEnd={false}>
                    {hotproducts? hotproducts.map((pr:ProductData, index) => (
                            <ProductCard
                                key={index}
                                photoURL={pr.photoURL}
                                price={pr.price}
                                unity={pr.unity}
                                availability={pr.availability}
                                discount={pr.discount}
                                hot={pr.hot}
                                ofert={pr.ofert}
                                name={pr.name}
                                unit={pr.unit} 
                            />
                    )) : <div></div> }
                    </Carousel>
            </Box>
        </>
    );
}

export default HotProductSlide;