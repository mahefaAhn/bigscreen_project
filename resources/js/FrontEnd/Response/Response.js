import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
/* Question */
import Question     from '../../components/Question/Question';
/* Header */
import Header       from '../Header/Header';
/* Footer */
import Footer       from '../Footer/Footer';

const Response = ({match}) => {
    const userLink                              = match.params.uri;
    const urlUserAnswer                         = '/userResponse/'+userLink;
    const [error,setError]                      = useState(null);
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
        <div>
            <Header/>
            <div className="container formContainer">
                <div className="row">
                    <div className="col-sm">
                        <h1 className="bigscreen_h1">Vos réponses</h1>
                        <p>Les réponses enregistrées ne peuvent pas être modifiées.</p>
                        <form className="needs-validation">
                            {answerQuestion.map(ans => (
                                <Question key={'question'+ans.questions.id} data={ans.questions}  nbQuestion={answerQuestion.length} answerUser={ans.content}/>
                            ))}
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Response;