import React, {useContext} from 'react'
import styled from 'styled-components';
import styles from './footer.module.scss'
import { StyledLink, Line } from '../../styledHelpers/Components'
import Logo from '../Logo/Logo'
import { Colors } from '../../styledHelpers/Colors';
import OvalButton from '../Buttons/OvalButton';
import {UserContext} from "../../contexts/UserContext";

const StyledFooter = styled.footer`
  background: ${Colors.catalinaBlue};
  color: ${Colors.white};
  margin: 0 auto;
  max-width: 1200px;
  padding: 50px 50px 0 50px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 0.25fr);
  grid-column-gap: 0;
  grid-row-gap: 0;
`;
export default function Footer() {
    const { currentUser } = useContext(UserContext);

    return (
        <StyledFooter>
            <Logo color={'#fff'}
                  textShadow={'0 4px 4px rgba(255, 251, 251, 0.3)'}
                  letterSpacing={'1.4px'} className={styles.logo}/>
            <div className={styles.div1}>
                <h3>Dla dziecka</h3>
                <ul>
                    <li><StyledLink to="/stories">Opowiadania</StyledLink></li>
                    <li><StyledLink to="/cartoons">Bajki</StyledLink></li>
                    <li><StyledLink to="/songs">Piosenki</StyledLink></li>
                </ul>
            </div>
            <div className={styles.div2}>
                <h3>Dla twórcy</h3>
                <ul>
                    <li><StyledLink to="/how-it-works">Jak to działa?</StyledLink></li>
                    <li><StyledLink to="/profile">Moje konto</StyledLink></li>
                </ul>
            </div>
            <div className={styles.div3}>
                <h3>O nas</h3>
                <ul>
                    <li><StyledLink to="/contact">Kontakt</StyledLink></li>
                    <li><StyledLink to="/history">Historia</StyledLink></li>
                    <li><StyledLink to="/docs">Dokumentacja</StyledLink></li>
                </ul>
            </div>
            {!currentUser &&
                <div className={styles.div4}>
                    <OvalButton
                        backgroundColor={'#fff'}
                        color={'#4753BC'}
                        borderRadius={'20px'}
                        padding={'7px 0'}
                        margin={'0 0 7px 0'}
                        width={'100%'}
                        url={'/register'}
                        content={'Zarejestruj'}></OvalButton>
                    <OvalButton
                        backgroundColor={'#4753BC'}
                        color={'#fff'}
                        borderRadius={'20px'}
                        padding={'7px 0'}
                        margin={'7px 0 0 0'}
                        width={'100%'}
                        url={'/login'}
                        content={'Zaloguj'}></OvalButton>
                </div>
            }
            <Line className={styles.div5}/>
            <div className={styles.div6}>
                &copy; KidTales 2022
            </div>
        </StyledFooter>
    )
}
