import React from 'react'
import styled from 'styled-components';
import Logo from '../Logo/Logo'
import NavBar from '../Navigation/NavBar';

const Navigation = styled.nav`
    display: flex;
    justify-content: space-between;
  padding-top: 20px;
`

export default function TopBar() {


    return (
        <React.Fragment>
            <Navigation>
                <Logo/>
                <NavBar />
            </Navigation>
        </React.Fragment>
    )
}
