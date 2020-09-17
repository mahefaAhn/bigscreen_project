import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
/* Header */
import Header       from '../Header/Header';
/* Footer */
import Footer       from '../Footer/Footer';
/* CSS */
import './Thanks.css';

const Thanks = ({match}) => {
    const urlRedirect   = '/response/'+match.params.uri;
    const urlUserAnswer = '/userResponse/'+match.params.uri;
    const prod_url      = 'https://localhost:3000'+urlRedirect;
    const [answerQuestion, setAnswerQuestion]   = useState([]);

    useEffect(() => {
        axios
        .get(urlUserAnswer)
        .then(response => (
            setAnswerQuestion(response.data)
        ));
    }, [])

    return (
        (answerQuestion.length==0) ? 
        <Redirect to="/404"/>
        :
        <div className="thanksContainer">
            <Header/>
            <div className="container bodyThanksContainer">
                <div className="row">
                    <div className="col-sm bodyThanks">
                        <h1 className="bigscreen_h1 font-weight-bold">Merci</h1>
                        <p className="thanksSentence"> 
                            Tout toute l’équipe de Bigscreen vous remercie pour votre engagement.
                            Grâce à votre investissement, nous vous préparons une application toujours plus facile à utiliser, seul ou en famille.
                            Si vous désirez consulter vos réponse ultérieurement, vous pouvez consultez cette adresse: <Link className="linkCompleted" to={urlRedirect}>{prod_url}</Link>
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