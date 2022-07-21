import React, {useEffect, useState} from "react";
import './index.css';
import {useParams} from "react-router";
import {Product} from "../../models/Product";
import {ProductService} from "../../api/ProductService";
import {ProductDetailedTile} from "../../components/ProductDetailedTile";
import {useDispatch} from "react-redux";
import {setBusy} from "../../store/ui/action";

export function DetailedProductScreen() {
    const {id} = useParams();
    const [product, setProduct] = useState<Product>();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBusy(true));
        ProductService.getProductById(parseInt(id as string)).then((product) => {
            setProduct(product);
        }).finally(() => setBusy(false));
    }, [dispatch, id]);

    return (
        <div>
            <div className="favourite-product-container">
                {
                    product ? (
                        <ProductDetailedTile product={product}/>
                    ) : null
                }
            </div>
        </div>
    );
}
