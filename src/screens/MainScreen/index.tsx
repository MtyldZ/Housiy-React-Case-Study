import React, {createContext, useCallback, useEffect, useRef, useState} from "react";
import {BrowseVideSideBar} from "../../components/FilterSideBar";
import {FilterHeaderBar} from "../../components/FilterHeaderBar";
import {ProductService} from "../../api/ProductService";
import {ProductTile} from "../../components/ProductTile";
import {Product} from "../../models/Product";
import './index.css';
import {Pagination, PaginationProps} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {setBusy} from "../../store/ui/action";

export type SortType = {
    field: keyof Product,
    direction: number,
}

export type FilterType = {
    brand?: number[];
    price?: { min?: number; max?: number };
    rate?: { min?: number; max?: number };
    searchTerm?: string;
    sort?: SortType;
}

type FilterContextType = {
    filter: FilterType;
}

const initialFilterValue: FilterType = {
    brand: [],
    price: {},
    rate: {},
    searchTerm: undefined,
    sort: undefined,
}

export const FilterContext = createContext<FilterContextType>({
    filter: initialFilterValue,
});


export function MainScreen() {
    const filterRef = useRef<FilterType>(initialFilterValue);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);

    const dispatch = useDispatch();

    const fetchProducts = useCallback(async () => {
        dispatch(setBusy(true));
        const {brand, price, rate, searchTerm, sort} = filterRef.current;
        const filter = {
            productBrand: brand,
            productRate: rate,
            productPrice: price,
            searchTerm,
            from: (page - 1) * 5,
            limit: 5,
            sort,
        };
        const productList = await ProductService.getProducts(filter);
        const productCount = await ProductService.getProductCount(filter);
        setProducts(productList);
        setLastPage(productCount / 5);
        dispatch(setBusy(false));
    }, [dispatch, page]);

    const onPageChange = useCallback((_: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
        setPage(data.activePage as number);
    }, []);

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <div>
            <FilterContext.Provider value={{filter: filterRef.current}}>
                <BrowseVideSideBar onSearchPressed={fetchProducts}/>
                <FilterHeaderBar fetchProducts={fetchProducts}/>
                <div className="browse-product-container">
                    {
                        products.length ? (
                            <Pagination
                                activePage={page}
                                onPageChange={onPageChange}
                                pointing
                                secondary
                                totalPages={lastPage}
                            />
                        ) : null
                    }
                    {
                        products.map(((product, index) => (
                            <ProductTile product={product} key={`key_${index}`}/>
                        )))
                    }
                    {
                        products.length ? (
                            <Pagination
                                activePage={page}
                                onPageChange={onPageChange}
                                pointing
                                secondary
                                totalPages={lastPage}
                            />
                        ) : null
                    }
                </div>
            </FilterContext.Provider>
        </div>
    );
}
