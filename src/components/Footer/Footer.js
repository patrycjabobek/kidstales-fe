import React from 'react'
import styled from 'styled-components';
import './footer.css'
import { StyledLink, Line } from '../../styledHelpers/Components'
import Logo from '../Logo/Logo'
import { Colors } from '../../styledHelpers/Colors';
import OvalButton from '../Buttons/OvalButton';

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
    return (
        <StyledFooter>
            <Logo color={'#fff'}
                  textShadow={'0 4px 4px rgba(255, 251, 251, 0.3)'}
                  letterSpacing={'1.4px'} className={'logo'}/>
            <div className={'div1'}>
                <h3>Dla dziecka</h3>
                <ul>
                    <li><StyledLink to="/stories">Opowiadania</StyledLink></li>
                    <li><StyledLink to="/cartoons">Bajki</StyledLink></li>
                    <li><StyledLink to="/songs">Piosenki</StyledLink></li>
                </ul>
            </div>
            <div className={'div2'}>
                <h3>Dla twórcy</h3>
                <ul>
                    <li><StyledLink to="/how-it-works">Jak to działa?</StyledLink></li>
                    <li><StyledLink to="/account">Moje konto</StyledLink></li>
                </ul>
            </div>
            <div className={'div3'}>
                <h3>O nas</h3>
                <ul>
                    <li><StyledLink to="/contact">Kontakt</StyledLink></li>
                    <li><StyledLink to="/history">Historia</StyledLink></li>
                </ul>
            </div>
            <div className={'div4'}>
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
            <Line className={'div5'}/>
            <div className={'div6'}>
                &copy; KidTales 2022
            </div>
        </StyledFooter>
    )
}
