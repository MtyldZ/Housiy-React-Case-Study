import {ProductBrand} from "./ProductBrand";
import {ProductCategory} from "./ProductCategory";
import {ProductSeller} from "./ProductSeller";

export interface Product {
    ProductId: number;
    ProductName: string;
    ProductImage: string;
    ProductDetail: string;
    ProductBrand: ProductBrand;
    ProductCategory: ProductCategory;
    ProductSeller: ProductSeller;
    ProductPrice: number;
    ProductRate: number;
    ProductMaxBasket?: undefined;
    ProductMinBasket?: undefined;
}
