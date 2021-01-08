export const initialState = {
    user: null,
    hotproducts: null,
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_HOT_PRODUCTS: "SET_HOT_PRODUCTS"
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {...state,user: action.user,};
        case actionTypes.SET_HOT_PRODUCTS:
            return {...state, hotproducts: action.hotproducts};
        default:
            return state;
    }
};

export default reducer;