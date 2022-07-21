import {createReducer} from 'deox';
import {UiState} from "./state";
import {addBasket, clearBasket, setBusy, updateBasket} from "./action";

const initialState: UiState = {
    isBusy: false,
    busyCount: 0,
    basketProducts: {},
};

export const uiReducer = createReducer(initialState, handle => [
    handle(setBusy, (state, action) => {
        if (action.payload.busy) state.busyCount++;
        else state.busyCount--;

        return {...state, isBusy: action.payload.busy, busyCount: state.busyCount < 0 ? 0 : state.busyCount};
    }),
    handle(addBasket, (state, action) => {
        const {basketProducts} = state;
        const {productId, quantity} = action.payload;
        const newQuantity = quantity + (basketProducts[productId] || 0);
        return {
            ...state,
            basketProducts: {...basketProducts, [productId]: newQuantity},
        };
    }),
    handle(updateBasket, (state, action) => {
        const {basketProducts} = state;
        const {productId, quantity} = action.payload;
        if (quantity === 0) delete basketProducts[productId];
        else basketProducts[productId] = quantity;
        return {
            ...state,
            basketProducts: {...basketProducts},
        };
    }),
    handle(clearBasket, (state, action) => {
        return {
            ...state,
            basketProducts: {},
        };
    }),

]);
