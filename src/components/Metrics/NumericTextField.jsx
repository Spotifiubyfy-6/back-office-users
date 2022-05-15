import React from "react";
import { useState } from 'react';
import TextField from '@mui/material/TextField';

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
} //From https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number

function validateNumberAndCallHandler(input, handler, setError, defaultNumber, handlerArgs) {
    setError(false);
    if (input === '') {
        handler(defaultNumber, handlerArgs);
        return;
    }
    if (!isNumeric(input)) {
        setError(true);
        return;
    }
    handler(parseInt(input), handlerArgs);
}

export default function NumericTextField(props) {
    const [error, setError] = useState(false);
    if (!props.handler)
        return null;
    return (<div>
        <TextField error={error} label="Days ago" inputProps={{ 'aria-label': 'daysAgoTextField' }} margin="normal"
                   defaultValue={(props.defaultValue)?props.defaultValue:''} helperText="Enter a number."
                   onChange={(e)=> validateNumberAndCallHandler(e.target.value, props.handler,
                       setError, props.defaultValue, props.handler_args)}
        />
    </div>);
}