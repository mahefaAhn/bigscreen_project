import React from 'react';
import './Footer.css';
import LogoLight from '../../Assets/img/logo.png';
/*
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebookF, faTwitter, faYoutube, faReddit, faDiscord } from '@fortawesome/free-brands-svg-icons';
*/


const Footer = (props) => {
    return (
        <div className="bsFooter text-light">
            <footer className="page-footer font-small pt-4">
                <div className="container-fluid text-center text-md-left">
                    <div className="row">
                        <div className="col-md-6 mt-md-0 mt-3">
                            <img src={LogoLight} className="bsLogoMedium"/>
                            <p>Nous vous préparons une application toujours plus facile à utiliser, seul ou en famille.</p>
                        </div>
                        <hr className="clearfix w-100 d-md-none pb-3"/>
                        <div className="col-md-3 mb-md-0 mb-3">
                            <h5>Suivez-nous</h5>
                            {/*
                            <a className="bsIconFooter" href="https://twitter.com/bigscreenvr"><FontAwesomeIcon icon={faTwitter} color="white"/></a>
                            <a className="bsIconFooter" href="https://facebook.com/bigscreenvr"><FontAwesomeIcon icon={faFacebookF} color="white" /></a>
                            <a className="bsIconFooter" href="https://youtube.com/bigscreenvr"><FontAwesomeIcon icon={faYoutube} color="white"/></a>
                            <a className="bsIconFooter" href="https://reddit.com/r/bigscreen"><FontAwesomeIcon icon={faReddit} color="white"/></a>
                            <a className="bsIconFooter" href="https://discord.gg/bigscreen"><FontAwesomeIcon icon={faDiscord} color="white"/></a>
                            */}
                        </div>
                        <div className="col-md-3 mb-md-0 mb-3">
                        © 2020 Copyright<br/><a href="https://mahefa-ahn.com/" className="text-light"> Mahefa-AHN.com</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;