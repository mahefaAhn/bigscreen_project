import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
/* Header */
import Header       from '../Header/Header';
/* Footer */
import Footer       from '../Footer/Footer';
/* CSS */
import './Thanks.css';
/* Not Found Page */
import NotFoundPage from '../../components/NotFoundPage/NotFoundPage';

const Thanks = ({match}) => {
    const id            = match.params.uri;
    const urlRedirect   = '/response/'+id;
    const urlUserAnswer = '/userResponse/'+id;
    const prod_url      = `www.${window.location.host}/response/${id}`;
    const [hasResult, setHasResult]             = useState(false);

    useEffect(() => {
        axios
        .get(urlUserAnswer)
        .then(response => (
            (response.data.length==0) ? setHasResult(false) : setHasResult(true)
        ));
    }, [])

    console.log(hasResult);

    return (
        <div className="thanksContainer">
            <Header/>
            {   
                (hasResult==false) ? <NotFoundPage/> :
                <div className="container bodyThanksContainer">
                    <div className="row">
                        <div className="col-sm bodyThanks">
                                <div>
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
                </div>   
            }
            <Footer/>
        </div>
    );
}

export default Thanks;