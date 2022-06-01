import React from 'react'
import {StyledLink} from "../../styledHelpers/Components";

export default function OvalButton(props) {
    return (
        <button
        style={{
            backgroundColor: props.backgroundColor,
            color: props.color,
            borderRadius: props.borderRadius,
            padding: props.padding,
            margin: props.margin,
            width: props.width,
            fontSize: props.fontSize,
            fontWeight: props.fontWeight,
            fontFamily: 'OverPass',
            border: 'none',
            cursor: 'pointer'
        }}
        >
            <StyledLink to={props.url}>{props.content}</StyledLink>
        </button>
    )
}
