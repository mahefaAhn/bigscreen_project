import React from 'react';
import { Link } from 'react-router-dom';
/* CSS */
import './NotFoundPage.css';

const NotFoundPage = ({match}) => {
    return (
        <div>
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
        </div>
    );
}

export default NotFoundPage;