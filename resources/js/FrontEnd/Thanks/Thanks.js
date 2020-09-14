import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
/* Header */
import Header       from '../Header/Header';
/* Footer */
import Footer       from '../Footer/Footer';
/* CSS */
import './Thanks.css';

const Thanks = (props) => {
    const prod_url = 'https://localhost:3000/';
    const uniqLink = '';
    return (
        <div className="thanksContainer">
            <Header/>
            <div className="container bodyThanksContainer">
                <div className="row">
                    <div className="col-sm bodyThanks">
                        <h1 className="bigscreen_h1 font-weight-bold">Merci</h1>
                        <p className="thanksSentence"> 
                            Tout toute l’équipe de Bigscreen vous remercie pour votre engagement.
                            Grâce à votre investissement, nous vous préparons une application toujours plus facile à utiliser, seul ou en famille.
                            Si vous désirez consulter vos réponse ultérieurement, vous pouvez consultez cette adresse: {prod_url+'response/'+uniqLink}
                        </p>
                        <Link to="/"><button type="button" className="btn btn-outline-light">Retourner à la page d'accueil</button></Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Thanks;