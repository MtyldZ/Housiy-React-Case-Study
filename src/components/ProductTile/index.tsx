import {Product} from "../../models/Product";
import {Button, Divider, Image} from "semantic-ui-react";
import './index.css';
import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {AppStorage} from "../../utils/appStorage";
import {ProductService} from "../../api/ProductService";
import {useDispatch, useSelector} from "react-redux";
import {addBasket, setBusy} from "../../store/ui/action";
import {BasketProductType, UiState} from "../../store/ui/state";

type ProductTileProps = {
    product: Product
};

export function ProductTile(props: ProductTileProps) {
    const {
        product: {
            ProductId,
            ProductName,
            ProductImage,
            ProductBrand,
            ProductSeller,
            ProductCategory,
            ProductPrice,
            ProductRate,
            ProductMinBasket,
            ProductMaxBasket,
        }
    } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const basketProducts = useSelector<UiState, BasketProductType>(state => state.basketProducts);
    const [isFavourite, setIsFavourite] = useState(false);

    const onAddBasketPressed = useCallback(() => {
        if (basketProducts[ProductId]) {
            if (ProductMinBasket && basketProducts[ProductId] < ProductMinBasket) return;
            if (ProductMaxBasket && basketProducts[ProductId] > ProductMaxBasket) return;
        }
        dispatch(addBasket(ProductId, 1));
    }, [ProductId, ProductMaxBasket, ProductMinBasket, basketProducts, dispatch]);


    const onProductClick = useCallback(() => {
        navigate(`/product/${ProductId}`)
    }, [ProductId, navigate]);

    const onFavouriteButtonClicked = useCallback(() => {
        dispatch(setBusy(true));
        if (isFavourite) ProductService.removeFavouriteProduct(ProductId);
        else ProductService.addFavouriteProduct(ProductId);

        setIsFavourite(!isFavourite);
        dispatch(setBusy(false));
    }, [ProductId, dispatch, isFavourite]);


    useEffect(() => {
        setIsFavourite(AppStorage.getFavouriteProductIds().includes(ProductId));
    }, [ProductId]);

    return (
        <div className="product-container">
            <div className="product-image" onClick={onProductClick}>
                <Image src={ProductImage} alt={ProductName}/>
            </div>
            <div className="product-info" onClick={onProductClick}>
                <h3>{ProductName}</h3>
                <Divider/>
                <h4>Category: {ProductCategory.ProductCategoryName}</h4>
                <h4>Brand: {ProductBrand.ProductBrandName}</h4>
                <h4>Seller: {ProductSeller.SellerName}</h4>
                {ProductRate ? (<h4>Rate: {ProductRate}</h4>) : null}
            </div>
            <div className="product-actions">
                <div className="favorite-button" onClick={onFavouriteButtonClicked}>
                    <svg viewBox="0 0 19 17" fill={isFavourite ? "#a00" : "none"} stroke="currentColor">
                        <path
                            d="M9.0986 2.08208L9.60156 2.60167L10.1045 2.08208C11.8883 0.239308 14.7707 0.239308 16.5544 2.08208C18.3506 3.93763 18.3506 6.9552 16.5544 8.81075L9.81712 15.7709C9.69922 15.8927 9.5039 15.8927 9.38601 15.7709L2.64868 8.81075C0.852524 6.9552 0.852524 3.93763 2.64868 2.08208C4.43246 0.239308 7.31482 0.239308 9.0986 2.08208Z"
                            strokeWidth="1.4"/>
                    </svg>
                </div>
                <Button
                    color={"blue"}
                    fluid
                    onClick={onAddBasketPressed}>
                    Add to Basket
                </Button>
                <h2>{ProductPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ₺</h2>
            </div>
        </div>
    )
}
