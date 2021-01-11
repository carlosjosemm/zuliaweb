import { CartItem } from "./types";

export const initialState = {
    user: null,
    hotproducts: null,
    cart: [],
    total: 0,
};

interface action {
    type: "SET_USER"|"SET_HOT_PRODUCTS"|"ADD_TO_CART";
    user: any;
    hotproducts: any;
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
        default:
            return state;
    }
};

export default reducer;