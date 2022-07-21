import {Grid, Input} from "semantic-ui-react";
import React, {useCallback, useContext, useState} from "react";
import './index.css';
import {filterNaN} from "../../utils/filterNaN";
import {FilterContext, FilterType} from "../../screens/MainScreen";

type CustomInputProps = {
    type?: 'min/max';
    id: string;
    text: string;
}

export function CustomInput(props: CustomInputProps) {
    const {filter} = useContext(FilterContext);
    const [minValue, setMinValue] = useState<string>("");
    const [maxValue, setMaxValue] = useState<string>("");

    const onChange = useCallback((value: string, secondFiled?: 'min' | 'max') => {
        if (props.type === 'min/max') {
            if (secondFiled) {
                (filter[props.id as keyof FilterType] as { min?: number; max?: number })[secondFiled] = parseFloat(filterNaN(value));
            }
            if (secondFiled === 'min') return setMinValue(filterNaN(value));
            return setMaxValue(filterNaN(value));
        } else {
            filter.searchTerm = value;
        }
    }, [filter, props.id, props.type]);


    return (
        <Grid.Column className="custom-input-container">
            <h4>{props.text}</h4>
            {
                props.type === 'min/max' ? (
                    <Grid.Row className="min-max-container">
                        <Grid.Row>
                            <h5>Min:</h5>
                            <Input
                                value={minValue}
                                onChange={(_, data) =>
                                    onChange(data.value, 'min')
                                }
                                fluid
                            />
                        </Grid.Row>
                        <Grid.Row>
                            <h5>Max:</h5>
                            <Input
                                value={maxValue}
                                onChange={(_, data) =>
                                    onChange(data.value, 'max')
                                }
                                fluid
                            />
                        </Grid.Row>
                    </Grid.Row>
                ) : (
                    <Input
                        onChange={(_, data) =>
                            onChange(data.value)
                        }
                        fluid
                    />
                )
            }
        </Grid.Column>
    );
}
