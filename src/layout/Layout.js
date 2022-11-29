import React from 'react'
import Footer from '../components/Footer/Footer'
import TopBar from '../components/TopBar/TopBar'
import './layout.styles.scss';

export default function Layout({children}) {


    return (
        <React.Fragment>
            <div>
                <TopBar />
            </div>
            <main >{children}</main>
            <div className={'footer-container'}>
                <Footer/>
            </div>
        </React.Fragment>
    )
}
