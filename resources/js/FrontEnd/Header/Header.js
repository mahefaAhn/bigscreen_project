import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import LogoLight from '../../Assets/img/logo.png';

const Header = (props) => {
    return (
        <div className="bsHeader">
            <div className="container">
                <Link to={'/'}><img src={LogoLight} className="bsLogoMedium"/></Link>
            </div>
        </div>
    );
}

export default Header;