import React, {SyntheticEvent, useCallback, useContext} from 'react';
import './index.css';
import {Dropdown} from "semantic-ui-react";
import {FilterContext, SortType} from "../../screens/MainScreen";
import {DropdownProps} from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";

const sortByOptionValues: SortType[] = [
    {field: "ProductRate", direction: 1},
    {field: "ProductRate", direction: -1},
    {field: "ProductPrice", direction: 1},
    {field: "ProductPrice", direction: -1},
]

const sortByOptions = [
    {text: "Product Rating: Low to High", key: "Product Rating: Low to High", value: 0},
    {text: "Product Rating: High to Low", key: "Product Rating: High to Low", value: 1},
    {text: "Product Price: Low to High", key: "Product Price: Low to High", value: 2},
    {text: "Product Price: High to Low", key: "Product Price: High to Low", value: 3},
];

type FilterHeaderBarProps = {
    fetchProducts: () => void;
}

export function FilterHeaderBar(props: FilterHeaderBarProps) {
    const {filter} = useContext(FilterContext);

    const onChange = useCallback((_: SyntheticEvent, data: DropdownProps) => {
        filter.sort = sortByOptionValues[data.value as number];
        props.fetchProducts();
    }, [filter, props]);

    return (
        <div className="filter-header-bar-container">
            <h4>Sort By:</h4>
            <Dropdown
                onChange={onChange}
                placeholder={"Sort By"}
                selection
                clearable
                options={sortByOptions}
            />
        </div>
    );
}
