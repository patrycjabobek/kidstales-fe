import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components';
import { StyledLink } from '../../styledHelpers/Components';
import { fontSize } from '../../styledHelpers/FontSizes';
import { Colors } from '../../styledHelpers/Colors';
import OvalButton from "../Buttons/OvalButton";
import {Link, useNavigate} from "react-router-dom";

import './navbar.styles.css';

import {UserContext} from "../../contexts/UserContext";
import {db, signOutUser} from '../../utils/firebase/firebase.utils';
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";

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
  padding: 10px;
  background-color: #fff;
  min-width: 180px;
  border-radius: 0 0 10px 10px;
  z-index: 1;
`;
export default function NavBar() {
    const {currentUser} = useContext(UserContext);
    const [identity, setIdentity] = useState("")
    console.log('currentUser ', currentUser)
    const navigate = useNavigate();

    async function handleSignOut() {
        await signOutUser();
        navigate('/login');
    }

    useEffect(() => {
        const getUserData = async () => {

            try {
                const usersRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(usersRef);

                const data = docSnap.exists() ? docSnap.data() : null

                setIdentity(data.identity);

            } catch (e) {
                console.log(e)
            }
        }
        getUserData();
    }, [currentUser])


    if (currentUser && identity === "parent") {
        return (
            <Nav>
                <NavItem>{currentUser.displayName}</NavItem>
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
                            <span onClick={handleSignOut}>Wyloguj się</span>
                        </DropdownContent>
                    </Dropdown>
                </NavItem>
            </Nav>)
    } else if (currentUser && identity === "author") {
        return (
            <Nav>
                <NavItem>{currentUser.displayName}</NavItem>
                <NavItem><StyledLink to="/contact">Kontakt</StyledLink></NavItem>
                <NavItem>
                    <Dropdown className={'dropdown'}>
                        <OvalButton url={'/author'}
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
                            <Link to="/author">Profil</Link>
                            <Link to="/settings">Ustawienia</Link>
                            <span onClick={handleSignOut}>Wyloguj się</span>
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
