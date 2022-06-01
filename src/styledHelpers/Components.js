import styled from 'styled-components';
import { Colors } from './Colors';
import { fontSize } from './FontSizes';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  display: flex;
`;

export const LogoComponent = styled.h1`
    font-family: 'Lilita One', cursive;
    color: ${Colors.catalinaBlue};
    font-size: ${fontSize[48]};
    margin: 0;
	text-shadow: 0 4px 4px rgba(255, 251, 251, 0.6) ; 
	-webkit-text-shadow: 0 4px 4px rgba(255, 251, 251, 0.6) ; 
	-moz-text-shadow: 0 4px 4px rgba(255, 251, 251, 0.6) ; 
`;

export const MainTitle = styled.h1`
    font-family: 'Lilita One', cursive;
    color: ${Colors.catalinaBlue};
    font-size: ${fontSize[64]};
    margin: 40px 0 25px 0;
    letter-spacing: 1.5px;
`;

export const StyledTitle = styled.h1`
    font-family: 'Lilita One', cursive;
    color: ${Colors.catalinaBlue};
    font-size: ${fontSize[18]};
    margin: 0
`;

export const StyledLink = styled(Link)`
    text-decoration: none
`;

export const Line = styled.hr`
  height: 1px;
  border: none;
  width: 100%;
  background: #A4ADFE;
`;


export const Dot = styled.span`
  height: 55px;
  width: 55px;
  border-radius: 50%;
  display: inline-block;
`;