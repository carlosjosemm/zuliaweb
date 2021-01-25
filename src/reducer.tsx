import db from "./firebase";
import { CartItem, ProductData } from "./types";

export const initialState = {
    user: null,
    hotproducts: null,
    cart: [],
    total: 0,
    ofertproducts: null
};

interface actionType {
    type: "SET_USER"|"SET_HOT_PRODUCTS"|"ADD_TO_CART"|"CHANGE_QUANTITY"|"SET_OFERT_PRODUCTS"|"FETCH_CART";
    user: any;
    hotproducts: Array<any>;
    subtotal: number;
    item: CartItem;
    ofertproducts: Array<any>;
    cart: Array<any>;
    dbTotal: number;
};

interface stateType {
    user: any;
    hotproducts: Array<object>;
    cart: Array<CartItem>;
    total: number;
    ofertproducts: Array<object>;
}

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_HOT_PRODUCTS: "SET_HOT_PRODUCTS",
    ADD_TO_CART: "ADD_TO_CART",
    CHANGE_QUANTITY: "CHANGE_QUANTITY",
    SET_OFERT_PRODUCTS: "SET_OFERT_PRODUCTS",
    FETCH_CART: "FETCH_CART",
};

function checkCart (this:CartItem, item:CartItem) {
    return item.product.name == this.product.name;
}

const reducer = (state:stateType, action:actionType) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            console.log('dbCart: ', action.cart);
            console.log('dbCart: ', action.dbTotal);
            return {...state, user: action.user, cart: action.cart, total: action.dbTotal };

        case actionTypes.FETCH_CART:
            return {...state, cart: action.cart };

        case actionTypes.SET_HOT_PRODUCTS:
            return {...state, hotproducts: action.hotproducts};

        case actionTypes.ADD_TO_CART:
            console.log('state.cart: ', state.cart);
            const cartBuffer = state.cart;
            console.log('initial buffer: ', cartBuffer);
            const exists = cartBuffer.findIndex(checkCart, action.item); //check if item exists on cart
            (exists!==-1) ? //if it is already on cart then changes quantity, else add it to cart
            cartBuffer[exists].quantity = state.cart[exists].quantity + action.item.quantity :
            cartBuffer.push(action.item);
            const totalBuffer = state.total + action.subtotal;
            state.user && db.collection('users').doc(state.user.email).set({
                cart: cartBuffer,
                carttotal: totalBuffer,
            });
            console.log('final buffer: ', cartBuffer);
            return {...state, cart: cartBuffer, total: totalBuffer};

        case actionTypes.CHANGE_QUANTITY:
            const modifiedItem = state.cart.find(checkCart, action.item);
            const modifiedItemIndex = state.cart.findIndex(checkCart, action.item);
            if (action.item.quantity!==0) {
                state.cart[modifiedItemIndex].quantity = action.item.quantity;
                // const newTotalBuffer = state.total + action.subtotal - (modifiedItem.quantity * modifiedItem.finalprice);
                const newSubTotalBuffer = state.cart.map((item) => (item.quantity * item.finalprice));
                const newTotalBuffer =  (newSubTotalBuffer.length!==0)? newSubTotalBuffer.reduce((total, subtotal) => {return total + subtotal}) : 0;
                console.log('total buffer: ', newTotalBuffer);
                state.user && db.collection('users').doc(state.user.email).set({
                    cart: state.cart,
                    carttotal: newTotalBuffer,
                });    
                return {...state, total: newTotalBuffer}; 
            } else {
                state.cart.splice(modifiedItemIndex,1);
                // const newTotalBuffer = state.total - (modifiedItem.quantity * modifiedItem.finalprice);
                const newSubTotalBuffer = state.cart.map((item) => (item.quantity * item.finalprice))
                const newTotalBuffer =  (newSubTotalBuffer.length!==0)? newSubTotalBuffer.reduce((total, subtotal) => {return total + subtotal}) : 0;
                console.log('total buffer: ', newTotalBuffer)
                state.user && db.collection('users').doc(state.user.email).set({
                    cart: state.cart,
                    carttotal: newTotalBuffer,
                });
                return {...state, total: newTotalBuffer}; 
                };

        case actionTypes.SET_OFERT_PRODUCTS:
            return {...state, ofertproducts: action.ofertproducts};
            
        default:
            return state;
    }
};

export default reducer;