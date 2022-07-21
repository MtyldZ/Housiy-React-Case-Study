import JsonData from '../../housiy-demodb.json';
import {ProductSeller} from "../../models/ProductSeller";
import {ProductBrand} from "../../models/ProductBrand";
import {ProductCategory} from "../../models/ProductCategory";
import {Product} from "../../models/Product";
import {SortType} from "../../screens/MainScreen";
import {AppStorage} from "../../utils/appStorage";

const sellers: ProductSeller[] = JsonData.ProductSellers;
const brands: ProductBrand[] = JsonData.ProductBrands;
const categories: ProductCategory[] = JsonData.ProductCategories;
let favouriteProductIds: number[] = AppStorage.getFavouriteProductIds();

// @ts-ignore
const products: Product[] = JsonData.Products.map((productData) => {
    const {
        ProductId,
        ProductName,
        ProductImage,
        ProductDetail,
        ProductBrandId,
        ProductCategoryId,
        ProductSeller: ProductSellerId,
        ProductPrice,
        ProductRate,
        ProductMaxBasket,
        ProductMinBasket,
    } = productData;

    const ProductBrand = brands.find((brand) => brand.ProductBrandId === ProductBrandId);
    const ProductCategory = categories.find((category) => category.ProductCategoryId === ProductCategoryId);
    const ProductSeller = sellers.find((seller) => seller.SellerId === ProductSellerId);

    return {
        ProductId,
        ProductName,
        ProductImage,
        ProductDetail,
        ProductBrand,
        ProductCategory,
        ProductSeller,
        ProductPrice,
        ProductRate,
        ProductMaxBasket,
        ProductMinBasket,
    };

});

export type GetProductsType = {
    productBrand?: number[];
    productPrice?: { min?: number; max?: number; };
    productRate?: { min?: number; max?: number; };
    searchTerm?: string;
    from?: number;
    limit?: number;
    sort?: SortType;
    ids?: number[];
}

export class ProductService {
    static getProducts(filters: GetProductsType): Promise<Product[]> {
        const {productBrand, productPrice, productRate, searchTerm, sort, ids} = filters;
        const from = filters.from || 0;
        const limit = filters.limit || 5;

        return new Promise<Product[]>((resolve) => {
            setTimeout(() => {
                let filteredProducts = products.filter((product) => {
                    if (ids && !ids.includes(product.ProductId)) return false;

                    if (productBrand && productBrand.length && !productBrand.includes(product.ProductBrand.ProductBrandId)) return false;
                    if (productPrice) {
                        if (productPrice.min != null && product.ProductPrice < productPrice.min) return false;
                        if (productPrice.max != null && product.ProductPrice > productPrice.max) return false;
                    }
                    if (productRate) {
                        if (productRate.min !== undefined && product.ProductRate < productRate.min) return false;
                        if (productRate.max !== undefined && product.ProductRate > productRate.max) return false;
                    }

                    if (searchTerm && !(
                        product.ProductName.includes(searchTerm) ||
                        product.ProductCategory.ProductCategoryName.includes(searchTerm) ||
                        product.ProductSeller.SellerName.includes((searchTerm)))
                    ) return false;

                    return true;
                })

                if (sort) {
                    const {field, direction} = sort;
                    // @ts-ignore
                    filteredProducts = filteredProducts.sort((a, b) => (a[field] > b[field] ? direction : -direction))
                }
                if (limit > 0) {
                    filteredProducts = filteredProducts.slice(from, from + limit);
                }

                resolve(filteredProducts)
            }, 350);
        });
    }

    static getProductCount(filters: GetProductsType): Promise<number> {
        return this.getProducts({...filters, from: 0, limit: -1}).then((products) => products.length);
    }

    static getProductById(id: number): Promise<Product> {
        return new Promise<Product>((resolve, reject) => {
            setTimeout(() => {
                const product = products.find((product) => product.ProductId === id)
                if (product) resolve(product);
                reject(404);
            }, 350);
        });
    }

    static getFavouriteProducts(): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            setTimeout(() => {
                resolve(products.filter((product) => favouriteProductIds.includes(product.ProductId)));
            }, 350);
        });
    }

    static addFavouriteProduct(productId: number): Promise<{}> {
        favouriteProductIds.push(productId);
        AppStorage.setFavouriteProductIds(favouriteProductIds);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({});
            }, 350);
        })
    }

    static removeFavouriteProduct(productId: number): Promise<{}> {
        favouriteProductIds = favouriteProductIds.filter((id) => id !== productId);
        AppStorage.setFavouriteProductIds(favouriteProductIds);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({});
            }, 350);
        })
    }

    static getBrands(): Promise<ProductBrand[]> {
        return new Promise<ProductBrand[]>((resolve) => {
            setTimeout(() => resolve(brands), 100);
        });
    }
}
