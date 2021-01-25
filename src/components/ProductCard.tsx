import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { ProductData } from "../types";
import styles from "../../styles/Home.module.css";
import { useBreakpoint, useDisclosure } from "@chakra-ui/react";
import ProductModal from "./ProductModal";


interface ProductCardProps {
    product: ProductData;
    key: number;
};

const ProductCard: React.FC<ProductCardProps> = ({product, key}) => {
    const [finalprice, useFinalprice] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const br = useBreakpoint();
    
    useEffect(() => {
        if (product.ofert) {
            useFinalprice(Math.ceil(product.price * product.discount));
        } else {
            useFinalprice(product.price);
        }
    }, [])

    return (
        <>
         <Card className={(br!=='base')? styles.productCard : styles.productCard__mobile }>
            <Card.Img variant="top" src={product.photoURL} className={(br!=='base')? styles.productCardPhoto : styles.productCardPhoto__mobile} />
            <Card.Body className={(br!=='base')? styles.productCardBody : styles.productCardBody__mobile}>
                <Card.Text className={(br!=='base')? styles.productName : styles.productName__mobile} >{product.name}</Card.Text>

                    <div className={(br!=='base')? styles.productCardInfo : styles.productCardInfo__mobile}>
                        {product.ofert? <Card.Text className={(br!=='base')? styles.initialPrice : styles.initialPrice__mobile} >
                            ${product.price}    
                        </Card.Text> : null}
                        <Card.Text className={(br!=='base')? styles.finalPrice : styles.finalPrice__mobile}>
                            {`$${finalprice}`}
                        </Card.Text>
                    </div>
                <Button className={(br!=='base')? styles.addButton : styles.addButton__mobile} variant="primary" onClick={onOpen}>{(br=='base')? 'Comprar' : 'Agregar al carrito'}</Button>
            </Card.Body>
        </Card>

        <ProductModal isOpen={isOpen} onClose={onClose} product={product}/>
        </>
    );
}

export default ProductCard;