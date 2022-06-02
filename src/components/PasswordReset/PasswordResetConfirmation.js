import React, {useContext} from 'react'
import styled from 'styled-components';
import {Colors} from "../../styledHelpers/Colors";
import {fontSize} from "../../styledHelpers/FontSizes";
import {UserContext} from "../../contexts/UserContext";
import {sendUserPasswordResetEmail} from "../../utils/firebase/firebase.utils";
import {useLocation} from "react-router-dom";

const ActivationBox = styled.div`
    max-width: 1200px;
    height: 50vh;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledTitle = styled.h1`
  font-family: 'Lilita One', cursive;
  color: ${Colors.catalinaBlue};
  font-size: ${fontSize[48]};
  margin: 40px 0 25px 0;
  letter-spacing: 1.5px;
`;

const StyledParagraph = styled.p`
  color: ${Colors.white};
  font-weight: 300;
`;

const StyledSpan = styled.span`
  color: ${Colors.catalinaBlue};\
  font-weight: 700;
`;

const StyledButton = styled.button`
  font-family: 'Overpass', sans-serif;
  font-size: 16px;
  border: none;
  background: none;
  font-weight: normal;
  color: ${Colors.white};
  cursor: pointer;
  padding: 0;
`;

const StyledText = styled.p`
  color: ${Colors.catalinaBlue};
  font-size: 14px;
`;
export default function PasswordResetConfirmation() {
    const { currentUser } = useContext(UserContext);

    const location = useLocation()
    console.log(location.state.email.email);

    const email = location.state.email.email;
    async function handleClick() {

        try {
            await sendUserPasswordResetEmail(email);
            alert("Link ponownie wysłany. Sprawdź swoję pocztę");
        } catch {
            console.log('Błąd');
        }

    }

    if (!currentUser) {
        return (
            <ActivationBox>
                <StyledTitle>Wysłano link na email!</StyledTitle>
                <div>
                    <StyledParagraph>Na twój adres mailowy <StyledSpan>{email}</StyledSpan> <br/>wysłaliśmy wiadomość z linkiem resetującym hasło.
                        Sprawdź skrzynkę pocztową.</StyledParagraph>
                </div>
                <div>
                    <StyledText>Nie otrzymałeś wiadomości?<br/>
                        Sprawdź w spamie lub <span ><StyledButton onClick={handleClick}>WYŚLIJ PONOWNIE</StyledButton></span></StyledText>
                </div>
            </ActivationBox>
        )
    }

}
