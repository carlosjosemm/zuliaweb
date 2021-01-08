import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { ProductData } from "../types";
import styles from "../../styles/home.module.css";


interface ProductCardProps extends ProductData {
    id?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({...props}) => {
    const [finalprice, useFinalprice] = useState(null);
    
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
            <Card.Img variant="top" src={props.photoURL} style={{borderRadius: "0.25rem", maxHeight: "300px", objectFit: "cover"}}/>
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
                <Button className={styles.addButton} variant="primary">Agregar al carrito</Button>
            </Card.Body>
        </Card>
        </>
    );
}

export default ProductCard;