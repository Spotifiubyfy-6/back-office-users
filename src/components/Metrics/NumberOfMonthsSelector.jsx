import React from "react";
import { useState } from 'react';
import Select from '@mui/material/Select';
import {FormControl, InputLabel, MenuItem} from "@mui/material";

function handleChange(input, handler, handlerArgs) {
    handler(input, handlerArgs);
}

export default function NumberOfMonthsSelector(props) {
    if (!props.handler)
        return null;
    return (<div>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                value={props.defaultValue}
                label="Age"
                onChange={(e) => handleChange(e.target.value, props.handler, props.handler_args)}
            >
                <MenuItem value={1}>1 Month</MenuItem>
                <MenuItem value={3}>3 Months</MenuItem>
                <MenuItem value={6}>6 Months</MenuItem>
                <MenuItem value={9}>9 Months</MenuItem>
                <MenuItem value={12}>12 Months</MenuItem>
            </Select>
        </FormControl>
    </div>);
}
