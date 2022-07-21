import React from 'react';
import {Route, Routes,} from "react-router-dom";
import './App.css';
import {NavBar} from "./components/NavBar";
import {MainScreen} from "./screens/MainScreen";
import {DetailedProductScreen} from "./screens/DetailedProductScreen";
import {FavouriteProductScreen} from "./screens/FavouriteProductScreen";
import {Dimmer, Loader} from 'semantic-ui-react';
import {store} from "./store";
import {Provider, useSelector} from 'react-redux';
import {UiState} from "./store/ui/state";

export function App() {
    return (
        <Provider store={store}>
            <AppComponent/>
        </Provider>
    );
}

function AppComponent() {
    const isBusy = useSelector<UiState, boolean>(state => state.isBusy);

    return (
        <div className="app">
            <NavBar/>
            {
                isBusy ? (
                    <Dimmer active>
                        <Loader/>
                    </Dimmer>
                ) : null
            }
            <Routes>
                <Route path="/" element={<MainScreen/>}/>
                <Route path="/product/:id" element={<DetailedProductScreen/>}/>
                <Route path="/favourites" element={<FavouriteProductScreen/>}/>
            </Routes>
        </div>
    );
}

export default App;
