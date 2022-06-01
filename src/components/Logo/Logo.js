import React from 'react'
import { LogoComponent, StyledLink} from '../../styledHelpers/Components';


export default function Logo(props) {
    return (
        <LogoComponent
        style={{
            color: props.color,
            textShadow: props.textShadowRadius,
            letterSpacing: props.letterSpacing
        }}>
            <StyledLink to="/">KidsTales</StyledLink>
        </LogoComponent>
    )
}
