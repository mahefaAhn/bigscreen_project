import React from 'react';
import './Header.css';
import LogoLight from '../../Assets/img/logo.png';

const Header = (props) => {
    return (
        <div className="bsHeader">
            <div className="container">
                <img src={LogoLight} className="bsLogoMedium"/>
            </div>
        </div>
    );
}

export default Header;