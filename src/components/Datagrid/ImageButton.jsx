import * as React from 'react';

export default function ImageButton(props) {
    if (!props.onClick || !props.alt || !props.src || !props.height || !props.width)
        return null;
    return <div>
        <button type = "button" onClick={() => props.onClick(props.params)} aria-label={props.arialLabel}>
            <input type="image" alt={props.alt} height={props.height} width={props.width}
            src={props.src}/>
        </button>
    </div>
}