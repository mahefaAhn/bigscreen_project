import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
/* CSS */
import './Menu.css';
import LogoLight from '../../Assets/img/logo.png';

const Menu = (props) => {
    return (
        <div className="menuGroup">
            <ul className="userMenuList">
                <li><img src={LogoLight} className="admin_imgLogo"/></li>
                <li><Link className="menuTitle" to={'/administration'}>Accueil</Link></li>
                <li><Link className="menuTitle"to={'/question'}>Questionnaire</Link></li>
                <li><Link className="menuTitle"to={'/responses'}>Réponses</Link></li>
                <li><Link className="menuTitle"to={'/logOut'}><button className="btn btn-outline-light">Se déconnecter</button></Link></li>
            </ul>
        </div>
    );
}

export default Menu;
