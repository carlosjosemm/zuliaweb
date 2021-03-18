import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import styles from '../../styles/Home.module.css';
// import { LightMode, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import NumberinputMobile from './NumberinputMobile';
import { CartItem } from '../types';

interface CartItemCardProps {
    cartItem: CartItem;
}

const CartItemPay: React.FC<CartItemCardProps> = ({cartItem}) => {
    return (
        <>
          <Card className={styles.CartItemPay}>
            <CardMedia
                className={styles.CartItemPay__photo}
                src={cartItem.product.photoURL}
                title="Imagen referencial"
                component="img"
                // height="140px"
            />
            
            <div className={styles.CartItemPay__details}>
              <CardContent className={styles.CartItemPay__content}>
                <Typography component="h6" variant="h6">
                  {cartItem.product.name}
                </Typography>
              </CardContent>
              <div className={styles.CartItemPay__input}>
                  <NumberinputMobile cartItem={cartItem} />
              </div>
              <Typography variant="subtitle1" color="textSecondary" style={{textAlign: "center"}}>
                Subtotal ({cartItem.quantity} item{(cartItem.quantity==1)? '':'s'}): ${cartItem.quantity * cartItem.finalprice}
              </Typography>
     
            </div>
          </Card>
        </>
    );
}

export default CartItemPay;