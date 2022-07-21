import React, {useCallback, useContext} from 'react';
import {Dropdown, DropdownProps, Grid} from "semantic-ui-react";
import "./index.css";
import {FilterContext, FilterType} from "../../screens/MainScreen";

type CustomDropdownProps = {
    id: keyof FilterType;
} & DropdownProps;

export function CustomDropdown(props: CustomDropdownProps) {
    const {id} = props;
    const {filter } = useContext(FilterContext);

    const onChange = useCallback((e: any, data: any) => {
        filter[id] = data.value;
    }, [filter, id]);

    return (
        <Grid.Column className="customer-dropdown-container">
            <h4>{props.text}</h4>
            <Dropdown
                onChange={onChange}
                placeholder={props.text}
                fluid
                multiple={props.multiple}
                search
                selection
                clearable
                options={props.options}
            />
        </Grid.Column>
    );
}
