import React, {useState} from 'react'
import styled from 'styled-components';
import {Wrapper} from "../../styledHelpers/Components";
import {Colors} from "../../styledHelpers/Colors";
import {fontSize} from "../../styledHelpers/FontSizes";
import './passwordReset.css';
import {sendUserPasswordResetEmail} from "../../utils/firebase/firebase.utils";
import {useNavigate, useParams} from "react-router-dom";

const StyledWrapper = styled(Wrapper)`
  background-color: ${Colors.scampiBlue};
  color: ${Colors.white};
  margin-bottom: 50px;
  padding: 20px 10px;
`;
const StyledTitle = styled.h3`
  color: ${Colors.white};
  font-size: ${fontSize[24]};
  margin-bottom: 15px;
`;

const StyledDiv = styled.div`
  margin: 0 30px;
  width: 40%;
`;

const StyledLabel = styled.label`
  color: ${Colors.white};
`;

const defaultEmailFields = {
    email: ''
};

export default function PasswordReset({navigation}) {
    const [emailField, setEmailField] = useState(defaultEmailFields);
    const { email } = emailField;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const resetFormFields = () => {
        setEmailField(defaultEmailFields);
    };

    const handleChange = (ev) => {
        const { name,value } = ev.target;
        setEmailField({...defaultEmailFields, [name]: value});
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true)
            await sendUserPasswordResetEmail(email);
            console.log('wysłanoe email')
            navigate("/password-reset-confirmation", {state: {email: emailField}});
            console.log('sukces');
        } catch  {
            console.log("BŁĄD")
        }
        setLoading(false)
    }

    return (
        <StyledWrapper >
            <StyledDiv>
                <StyledTitle>Przypomnij hasło</StyledTitle>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <StyledLabel htmlFor="email">Email</StyledLabel>
                        <input type="email"
                               id="email"
                               name='email'
                               value={email}
                               onChange={handleChange}
                        required/>
                    </div>
                    <button disabled={loading}
                            type="submit"
                            className={'submitBtn'}
                    >Przypomnij hasło</button>
                </form> 
            </StyledDiv>
            <StyledDiv>
                <img src="" alt=""/>
            </StyledDiv>
        </StyledWrapper>
    )
}
