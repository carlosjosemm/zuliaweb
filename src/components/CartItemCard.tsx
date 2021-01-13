import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import styles from '../../styles/Home.module.css';
import { LightMode, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import NumberinputMobile from './NumberinputMobile';
import { CartItem } from '../types';
import DiscardItemPopover from './DiscardItemPopover';

interface CartItemCardProps {
    cartItem: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({cartItem}) => {
    return (
        <>
            <Card className={styles.cartItemCard}>
      <div className={styles.cartITemCard__details}>
        <CardContent className={styles.cartItemCard__content}>
          <Typography component="h6" variant="h6">
            {cartItem.product.name}
          </Typography>
          {/* <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
          </Typography> */}
        </CardContent>
        <div className={styles.cartItemCard__input}>
            <NumberinputMobile cartItem={cartItem} />
        </div>
      </div>
      <CardMedia
        className={styles.cartItemCard__photo}
        image={cartItem.product.photoURL}
        title="Imagen referencial"
      />
    </Card>
        </>
    );
}

export default CartItemCard;