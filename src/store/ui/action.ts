import {createAction} from 'deox';

export const setBusy = createAction(
    'SET_BUSY',
    resolve => (busy: boolean) => resolve({busy}),
);

export const addBasket = createAction(
    'ADD_BASKET',
    resolve => (productId: number, quantity: number) => resolve({productId, quantity}),
);

export const updateBasket = createAction(
    'UPDATE_BASKET',
    resolve => (productId: number, quantity: number) => resolve({productId, quantity}),
);

export const clearBasket = createAction(
    'CLEAR_BASKET',
    resolve => () => resolve({}),
);

