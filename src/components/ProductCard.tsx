import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { ProductData } from "../types";
import styles from "../../styles/home.module.css";
import { useDisclosure } from "@chakra-ui/react";
import ProductModal from "./ProductModal";


interface ProductCardProps extends ProductData {
    id?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({...props}) => {
    const [finalprice, useFinalprice] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    useEffect(() => {
        if (props.ofert) {
            useFinalprice(props.price * props.discount);
        } else {
            useFinalprice(props.price);
        }
    }, [])

    return (
        <>
         <Card className={styles.productCard}>
            <Card.Img variant="top" src={props.photoURL} style={{borderRadius: "0.25rem", maxHeight: "300px", objectFit: "contain"}}/>
            <Card.Body className={styles.productCardBody}>
                <Card.Text className={styles.productName} >{props.name}</Card.Text>

                    <div className={styles.productCardInfo}>
                        <Card.Text className={styles.initialPrice} >
                            {props.ofert ? `$${props.price}` : null}
                        </Card.Text>
                        <Card.Text className={styles.finalPrice}>
                            {`$${finalprice}`}
                        </Card.Text>
                    </div>
                <Button className={styles.addButton} variant="primary" onClick={onOpen}>Agregar al carrito</Button>
            </Card.Body>
        </Card>

        <ProductModal isOpen={isOpen} onClose={onClose} product={props}/>
        </>
    );
}

export default ProductCard;