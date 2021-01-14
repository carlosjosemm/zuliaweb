import { Button, 
    HStack, 
    IconButton, 
    Input, 
    useNumberInput 
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useDataLayer } from "../DataLayer";
import { actionTypes } from "../reducer";
import { CartItem } from "../types";

interface NumberInputMobileProps {
    cartItem: CartItem;
}

const NumberinputMobile: React.FC<NumberInputMobileProps> = ({cartItem}) => {
    const [quantity, setQuantity] = useState(cartItem.quantity);
    const [{cart}, dispatch] = useDataLayer();

    const format = (val) => val + ` ${cartItem.product.unit}${(cartItem.product.unity==false)? '(es)': '(s)' }`;
    const {
        getInputProps,
        getIncrementButtonProps,
        getDecrementButtonProps,
      } = useNumberInput({
        step: (cartItem.product.unity==true)? 0.1 : 1 ,
        defaultValue: cartItem.quantity,
        min: (cartItem.product.unity==true)? 0.1 : 1,
        max: (cartItem.product.unity==true)? 10 : 100 ,
        precision: (cartItem.product.unity==true)? 1 : 0,
        onChange(valueAsNumber) {
            setQuantity(parseInt(valueAsNumber, 10))
        },
        value: format(quantity.toString()),
        focusInputOnChange: false,
        // isReadOnly: true
      })
      const inc = getIncrementButtonProps({style: {padding: "0px 0px"}});
      const dec = getDecrementButtonProps({style: {marginLeft: "0px", padding: "0px 0px"}});
      const input = getInputProps({style: {marginLeft: "0px", textAlign: "center", padding: "0px 0px", width: "13ch"}});
      
      console.log(quantity);

      function remove() {
        const item = {quantity: 0, product: cartItem.product, finalprice: cartItem.finalprice};
        dispatch(
            {type: actionTypes.CHANGE_QUANTITY, item: item, subtotal: 0 }
        );
      }
      
      useEffect(() => {
          const item = {quantity: quantity, product: cartItem.product, finalprice: cartItem.finalprice};
          const newSubTotal = quantity * cartItem.finalprice;
          dispatch(
              {type: actionTypes.CHANGE_QUANTITY, item: item, subtotal: newSubTotal }
          )
      }, [quantity]);

    return (
        <>
            <HStack maxW="250px">
                <Button {...inc} size="sm" marginLeft="0px">+</Button>
                <Input {...input} fontSize="small" marginLeft="0px"/>
                <Button {...dec} size="sm" marginLeft="0px">-</Button>
                <IconButton marginLeft="0px" aria-label={`Quitar ${cartItem.product.name} del carrito`} icon={<BiTrash />} onClick={() => remove()} />
            </HStack>
        </>
    );
}

export default NumberinputMobile;