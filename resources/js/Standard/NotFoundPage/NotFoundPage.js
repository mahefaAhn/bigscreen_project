import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
/* Header */
import Header       from '../../FrontEnd/Header/Header';
/* Footer */
import Footer       from '../../FrontEnd/Footer/Footer';
/* CSS */
import './NotFoundPage.css';

const NotFoundPage = (props) => {
    const prod_url = 'https://localhost:3000/';
    const uniqLink = '';
    return (
        <div className="notFoundPageContainer">
            <Header/>
            <div className="container bodyNotFoundPageContainer">
                <div className="row">
                    <div className="col-sm bodyNotFoundPage">
                        <h1 className="bigscreen_h1 font-weight-bold">Oups...</h1>
                        <p className="centerSentence"> 
                            La page que vous tentez de joindre n'est pas disponible.
                        </p>
                        <Link to="/"><button type="button" className="btn btn-outline-light">Retourner à la page d'accueil</button></Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default NotFoundPage;