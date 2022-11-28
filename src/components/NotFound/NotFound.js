import React,  from 'react'
import styled from 'styled-components';
import { Wrapper} from "../../styledHelpers/Components";
import {Link} from "react-router-dom";
import { Colors } from '../../styledHelpers/Colors';
import { fontSize } from '../../styledHelpers/FontSizes';
import styles from './notfound.module.scss'


const BigError = styled.h1`
  font-family: 'Lilita One', cursive;
  margin: 20px ;
  font-size: 18rem;
  color: ${Colors.white};
  padding: 0;
`;

const KickedError = styled.h1`
  font-family: 'Lilita One', cursive;
  margin: 20px 0;
  font-size: 18rem;
  color: ${Colors.white};
  transform: rotate(45deg);
  padding: 0;
`;

const StyledMainTitle = styled.h1`
  font-family: 'Lilita One', cursive;
  color: ${Colors.catalinaBlue};
  font-size: ${fontSize[48]};
  letter-spacing: 1.5px;
  padding: 0 20px;
  margin: 0;
`;

const StyledLink = styled(Link)`
  font-size: ${fontSize[18]};
  background: ${Colors.white};
  padding: 10px;
  border-radius: 5px;
`;

export default function NotFound() {

    return (
          <div className={styles.errorPage}>
              <Wrapper>
                  <BigError>40</BigError>
                  <KickedError>4</KickedError>
              </Wrapper>
              <StyledMainTitle>Nie ma takiej strony!</StyledMainTitle>
              <div className={styles.link}>
                <StyledLink to={'/'}>Wróć do strony głównej</StyledLink>
              </div>
          </div>
    )
}