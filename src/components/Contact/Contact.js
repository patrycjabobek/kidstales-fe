import React, {useRef, useState} from 'react'
import {Wrapper} from "../../styledHelpers/Components";
import {Link} from "react-router-dom";
import styled from 'styled-components';
import { Colors } from '../../styledHelpers/Colors';
import styles from './contact.module.scss';

const StyledNumber = styled.span`
  color: ${Colors.linkBlue};
`;

const StyledParagraph = styled.p`
  font-size: 12px;
  font-weight: 300;
  padding: 10px 20px;
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainDiv = styled.div`
  background-color: #5961A5;
  color: #fff ;
  margin-bottom: 50px;
  padding: 20px 40px;
`;

const StyledTitle = styled.h3`
  font-size: 24px;
`;

const StyledForm = styled.div`
  min-width: 350px;
  
`;
export default function Contact() {
    const emailRef = useRef();
    const messageRef = useRef();
    const nameRef = useRef();
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
        <MainDiv>
            <Wrapper>
                <StyledTitle>Skontaktuj się z nami!</StyledTitle>
                <StyledParagraph>Masz problem, strona internetowa działa nie tak jak powinna lub masz inny powód? <br/>Śmiało skontaktuj się z nami a my postaramy Ci się pomóc!</StyledParagraph>
            </Wrapper>
            <StyledWrapper >
                <StyledForm>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Imię</label>
                            <input type="name" id="name" ref={nameRef} required/>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" ref={emailRef} required/>
                        </div>
                        <div className={styles.formGroup} >
                            <label htmlFor="message">W czym możemy Ci pomóc?</label>
                            <textarea className={styles.messageArea} rows={'12'} cols={'15'} id="message"  ref={messageRef} required/>
                        </div>

                        <button disabled={loading}
                                type="submit"
                                className={styles.submitBtn}
                        >Wyślij</button>
                    </form>
                    <div className={styles.regulations}>Odpowiadamy w przeciągu <StyledNumber>48</StyledNumber> godzin roboczych</div>
                </StyledForm >
                <div className={styles.contactDetails}>
                    <div className={styles.contactOption}>
                        <div className={styles.contactIcon}>
                            <span className="material-icons">
                              mail_outline
                          </span>
                        </div>
                        <div className={styles.contactText}>
                            <h3>Napisz do nas</h3>
                            <p>Nasz zespoł jest tutaj aby Ci pomóc</p>
                            <a href="mailto: kidstales@help.com ">kidstales@help.com</a>
                        </div>
                    </div>
                    <div className={styles.contactOption}>
                        <div className={styles.contactIcon}>

                            <span className="material-icons">
                                phone_enabled
                            </span>
                        </div>
                        <div className={styles.contactText}>
                            <h3>Kontakt telefoniczny</h3>
                            <p>Od pn - pt, w godz. 10:00 - 16:30</p>
                            <a href="tel: 122 333 444">+48 12 23 33 444</a>
                        </div>

                    </div>
                </div>
            </StyledWrapper>
        </MainDiv>

    )
}


