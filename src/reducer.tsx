import { CartItem, ProductData } from "./types";

export const initialState = {
    user: null,
    hotproducts: null,
    cart: [],
    total: 0,
};

interface action {
    type: "SET_USER"|"SET_HOT_PRODUCTS"|"ADD_TO_CART"|"CHANGE_QUANTITY";
    user: any;
    hotproducts: Array<any>;
    subtotal: number;
    item: CartItem;
};

interface state {
    user: any;
    hotproducts: Array<object>;
    cart: Array<CartItem>;
    total: number;
}

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_HOT_PRODUCTS: "SET_HOT_PRODUCTS",
    ADD_TO_CART: "ADD_TO_CART",
    CHANGE_QUANTITY: "CHANGE_QUANTITY",
};

function checkCart (this:CartItem, item:CartItem) {
    return item.product.name == this.product.name;
}

const reducer = (state:state, action:action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {...state, user: action.user,};
        case actionTypes.SET_HOT_PRODUCTS:
            return {...state, hotproducts: action.hotproducts};
        case actionTypes.ADD_TO_CART:
            const cartBuffer = state.cart;
            const exists = cartBuffer.findIndex(checkCart, action.item);
            (exists!==-1) ? 
            cartBuffer[exists].quantity = state.cart[exists].quantity + action.item.quantity : 
            cartBuffer.push(action.item);
            const totalBuffer = state.total + action.subtotal;
            return {...state, cart: cartBuffer, total: totalBuffer};
        case actionTypes.CHANGE_QUANTITY:
            const modifiedItem = state.cart.find(checkCart, action.item);
            const modifiedItemIndex = state.cart.findIndex(checkCart, action.item);
            if (action.item.quantity!==0) {
                state.cart[modifiedItemIndex].quantity = action.item.quantity;
                // const newTotalBuffer = state.total + action.subtotal - (modifiedItem.quantity * modifiedItem.finalprice);
                const newSubTotalBuffer = state.cart.map((item) => (item.quantity * item.finalprice))
                const newTotalBuffer =  (newSubTotalBuffer.length!==0)? newSubTotalBuffer.reduce((total, subtotal) => {return total + subtotal}) : 0;
                console.log('total buffer: ', newTotalBuffer)
                return {...state, total: newTotalBuffer}; 
            } else {
                state.cart.splice(modifiedItemIndex,1);
                // const newTotalBuffer = state.total - (modifiedItem.quantity * modifiedItem.finalprice);
                const newSubTotalBuffer = state.cart.map((item) => (item.quantity * item.finalprice))
                const newTotalBuffer =  (newSubTotalBuffer.length!==0)? newSubTotalBuffer.reduce((total, subtotal) => {return total + subtotal}) : 0;
                console.log('total buffer: ', newTotalBuffer)
                return {...state, total: newTotalBuffer}; 
                };
        default:
            return state;
    }
};

export default reducer;