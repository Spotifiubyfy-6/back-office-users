import React from 'react'
import {Alert} from "@mui/material";


export default function ErrorBox(props) {
    if (props.errorString == '') {
        return null;
    }
    return (<div>
            <Alert variant="filled" severity="error">
                Error: {props.errorString}
            </Alert>
    </div>
    );
}