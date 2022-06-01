import React, {useContext} from 'react'
import styled from 'styled-components';
import { StyledLink } from '../../styledHelpers/Components';
import { fontSize } from '../../styledHelpers/FontSizes';
import { Colors } from '../../styledHelpers/Colors';
import OvalButton from "../Buttons/OvalButton";
import {Link} from "react-router-dom";

import './navBar.css';

import {UserContext} from "../../contexts/UserContext";
import { signOutUser } from '../../utils/firebase/firebase.utils'

const Nav = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const NavItem = styled.li`
  padding: 10px 20px;
  font-size: ${fontSize[18]};
  font-weight: 550;
  color: ${Colors.catalinaBlue};
  
`

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  border-radius: 0 0 10px 10px;
  z-index: 1;
`;
export default function NavBar(props) {
    const { currentUser } = useContext(UserContext);
    // console.log({currentUser})


    if (currentUser ) {
        return (
            <Nav>
                <NavItem><StyledLink to="/parent-zone">Dla dziecka</StyledLink></NavItem>
                <NavItem><StyledLink to="/contact">Kontakt</StyledLink></NavItem>
                <NavItem>
                    <Dropdown className={'dropdown'}>
                        <OvalButton url={'/profile'}
                                      backgroundColor={'#E0F1FA'}
                                      color={'#0C2C80'}
                                      borderRadius={'20px'}
                                      padding={'6px 16px'}
                                      fontSize={'1.13rem'}
                                      fontWeight={'600'}
                                      content={'Mój profil'}
                                      className={'dropdownBtn'}
                        ></OvalButton>
                        <DropdownContent className={'dropdown-content'}>
                            <Link to="/profile">Profil</Link>
                            <Link to="/settings">Ustawienia</Link>
                            <span onClick={signOutUser}>Wyloguj się</span>
                        </DropdownContent>
                    </Dropdown>
                </NavItem>
            </Nav>)
    } else if (currentUser ) {
        return (
            <Nav>
                <NavItem><StyledLink to="/author-zone">Dla autora</StyledLink></NavItem>
                <NavItem><StyledLink to="/contact">Kontakt</StyledLink></NavItem>
                <NavItem>
                    <Dropdown className={'dropdown'}>
                        <OvalButton url={'/profile'}
                                    backgroundColor={'#E0F1FA'}
                                    color={'#0C2C80'}
                                    borderRadius={'20px'}
                                    padding={'6px 16px'}
                                    fontSize={'1.13rem'}
                                    fontWeight={'600'}
                                    content={'Mój profil'}
                                    className={'dropdownBtn'}
                        ></OvalButton>
                        <DropdownContent className={'dropdown-content'}>
                            <Link to="/profile">Profil</Link>
                            <Link to="/settings">Ustawienia</Link>
                            <span onClick={signOutUser}>Wyloguj się</span>
                        </DropdownContent>
                    </Dropdown>
                </NavItem>
            </Nav>
        )
    }
    return (
        <Nav>
            <NavItem><StyledLink to="/parent-zone">Dla dziecka</StyledLink></NavItem>
            <NavItem><StyledLink to="/author-zone">Dla autora</StyledLink></NavItem>
            <NavItem><StyledLink to="/contact">Kontakt</StyledLink></NavItem>
            <NavItem> <OvalButton url={'/register'}
                                  backgroundColor={'#E0F1FA'}
                                  color={'#0C2C80'}
                                  borderRadius={'20px'}
                                  padding={'6px 16px'}
                                  fontSize={'1.13rem'}
                                  fontWeight={'600'}
                                  content={'Dołącz do nas'}
            ></OvalButton></NavItem>
        </Nav>
    )
}
