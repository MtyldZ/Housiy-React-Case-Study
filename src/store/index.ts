import {combineReducers, createStore} from 'redux';
import {uiReducer} from "./ui/reducer";

export const rootReducer = combineReducers({
    ui: uiReducer,
});

export const store = createStore(uiReducer);
