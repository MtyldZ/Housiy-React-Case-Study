import React, {useEffect, useState} from 'react';
import {Button, Divider, DropdownItemProps, Grid, Segment, Sidebar} from "semantic-ui-react";
import "./index.css";
import {CustomDropdown} from "../CustomDropdown";
import {ProductService} from "../../api/ProductService";
import {CustomInput} from "../CustomInput";
import {useDispatch} from "react-redux";
import {setBusy} from "../../store/ui/action";

type BrowseVideSideBarProps = {
    onSearchPressed: () => void;
}

export function BrowseVideSideBar(props: BrowseVideSideBarProps) {
    const [brandOptions, setBrandOptions] = useState<DropdownItemProps[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBusy(true));
        ProductService.getBrands().then((brands) => {
            setBrandOptions(brands.map((brand) => ({
                value: brand.ProductBrandId, text: brand.ProductBrandName, key: brand.ProductBrandId,
            })));
        }).finally(() => dispatch(setBusy(false)));
    }, [dispatch]);

    return (
        <Sidebar
            className="browse-video-sidebar-container"
            as={Segment}
            animation={"push"}
            direction={"left"}
            visible={true}
        >
            <Grid.Column textAlign='center' style={{justifyContent: 'space-between'}}>
                <Grid.Row className="filter-item">
                    <CustomDropdown id={"brand"} text={"Product Brand"} multiple options={brandOptions}/>
                </Grid.Row>
                <Divider/>
                <Grid.Row className="filter-item">
                    <CustomInput id={"price"} text={"Product Price"} type={"min/max"}/>
                </Grid.Row>
                <Divider/>
                <Grid.Row className="filter-item">
                    <CustomInput id={"rate"} text={"Product Rating"} type={"min/max"}/>
                </Grid.Row>
                <Divider/>
                <Grid.Row className="filter-item">
                    <CustomInput id={"searchTerm"} text={"Search Term"}/>
                </Grid.Row>
                <Grid.Row className="filter-item">
                    <Button color={"brown"} fluid onClick={props.onSearchPressed}>Search</Button>
                </Grid.Row>
            </Grid.Column>
        </Sidebar>
    );
}
