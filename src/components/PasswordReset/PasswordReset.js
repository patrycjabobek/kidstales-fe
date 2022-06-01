import React, {useRef, useState} from 'react'
import styled from 'styled-components';
import {Wrapper} from "../../styledHelpers/Components";
import {Colors} from "../../styledHelpers/Colors";
import {fontSize} from "../../styledHelpers/FontSizes";
import './passwordReset.css';

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


export default function PasswordReset() {
    const emailRef = useRef();
    const [loading, setLoading] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();

        // try {
        //     setError('')
        //     setLoading(true)
        //     await login(emailRef.current.value, passwordRef.current.value)
        //     navigate.push('/dashboard')
        // } catch {
        //     setError('Failed to sign in')
        // }
        // setLoading(false)
    }

    return (
        <StyledWrapper >
            <StyledDiv>
                <StyledTitle>Przypomnij hasło</StyledTitle>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <StyledLabel htmlFor="email">Email</StyledLabel>
                        <input type="email" id="email" ref={emailRef} required/>
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
