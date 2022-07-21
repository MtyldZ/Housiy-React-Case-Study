import React, {useCallback, useEffect, useState} from "react";
import './index.css';
import {ProductService} from "../../api/ProductService";
import {Product} from "../../models/Product";
import {ProductDetailedTile} from "../../components/ProductDetailedTile";
import {useDispatch} from "react-redux";
import {setBusy} from "../../store/ui/action";

export function FavouriteProductScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const dispatch = useDispatch();

    const fetchFavouriteProducts = useCallback(() => {
        dispatch(setBusy(true));
        ProductService.getFavouriteProducts().then((products) => {
            setProducts(products);
        }).finally(() => dispatch(setBusy(false)));
    }, [dispatch]);

    useEffect(() => {
        fetchFavouriteProducts();
    }, []);

    return (
        <div>
            <div className="favourite-product-container">
                {
                    products.length ? products.map((product, index) => (
                        <ProductDetailedTile key={`key_${index}`} product={product}
                                             onProductUnFavouritePressed={fetchFavouriteProducts}/>
                    )) : null
                }
            </div>
        </div>
    );
}
