import React from 'react'
import Footer from '../components/Footer/Footer'
import TopBar from '../components/TopBar/TopBar'
import './layout.css';

export default function Layout({children}, props) {

    const isLoggedIn = props.isLoggedIn;
    const isParent = props.isParent;
    return (
        <React.Fragment>
            <div>
                <TopBar isLoggedIn={isLoggedIn} isParent={isParent}/>
            </div>
            <main >{children}</main>
            <div className={'footer-container'}>
                <Footer/>
            </div>
        </React.Fragment>
    )
}
