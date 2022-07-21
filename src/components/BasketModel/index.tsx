import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Button, Divider, Grid, Header, Image, Modal} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {BasketProductType, UiState} from "../../store/ui/state";
import './index.css';
import {Product} from "../../models/Product";
import {ProductService} from "../../api/ProductService";
import {clearBasket, updateBasket} from "../../store/ui/action";
import {currencyFormatter} from "../../utils/currencyFormatter";

type BasketModelProps = {
    onClose: () => void;
}

export function BasketModel(props: BasketModelProps) {
    const {onClose} = props;
    const dispatch = useDispatch();

    const basketProducts = useSelector<UiState, BasketProductType>(state => state.basketProducts);
    const [products, setProducts] = useState<Product[]>([]);

    const basketTotalPrice = useMemo(() => products.reduce((prev, cur) => (
        prev + cur.ProductPrice * basketProducts[cur.ProductId]), 0
    ), [basketProducts, products]);

    const onBasketQuantityChanged = useCallback((product: Product, quantityChange: number) => {
        const {ProductId, ProductMinBasket, ProductMaxBasket} = product;
        if (basketProducts[ProductId]) {
            if (ProductMinBasket && basketProducts[ProductId] < ProductMinBasket) return;
            if (ProductMaxBasket && basketProducts[ProductId] > ProductMaxBasket) return;
        }
        dispatch(updateBasket(ProductId, basketProducts[ProductId] + quantityChange));
    }, [basketProducts, dispatch]);

    const onClearBasketPressed = useCallback(() => {
        dispatch(clearBasket());
        onClose();
    }, [dispatch, onClose]);

    const fetchBasketProductList = useCallback(async () => {
        const productList = await ProductService.getProducts({
            ids: Object.keys(basketProducts).map(x => Number(x)),
            limit: -1,
        });
        setProducts(productList);
    }, [basketProducts]);

    useEffect(() => {
        fetchBasketProductList()
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [fetchBasketProductList]);

    return (
        <Modal onClose={onClose} open>
            <Modal.Header>
                <Header size="small">Shopping Basket</Header>
                <Header size="tiny">
                    Basket Total {currencyFormatter(basketTotalPrice || 0)}
                </Header>
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    {
                        products.map((product, index) => (
                            <Grid.Row className="basket-container" key={`key_${index}`}>
                                <div className="product-image">
                                    <Image src={product.ProductImage} alt={product.ProductName}/>
                                </div>
                                <div className="product-info">
                                    <h3>{product.ProductName}</h3>
                                    <Divider/>
                                    <h4>Brand: {product.ProductBrand.ProductBrandName}</h4>
                                    <h4>Price: {product.ProductPrice}</h4>
                                    <h4>Quantity: {basketProducts[product.ProductId] || 0}</h4>
                                </div>
                                <div className="product-actions">
                                    <Button.Group>
                                        <Button icon="minus" onClick={() => onBasketQuantityChanged(product, -1)}/>
                                        <h3>{currencyFormatter((product.ProductPrice * basketProducts[product.ProductId]) || 0)}</h3>
                                        <Button icon="plus" onClick={() => onBasketQuantityChanged(product, 1)}/>
                                    </Button.Group>
                                </div>
                            </Grid.Row>
                        ))
                    }
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                {
                    products.length ? (
                        <Button
                            content="Clear Basket"
                            labelPosition='right'
                            icon='x'
                            onClick={onClearBasketPressed}
                            negative
                        />
                    ) : null
                }
                <Button
                    content="Continue Shopping"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={onClose}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}
