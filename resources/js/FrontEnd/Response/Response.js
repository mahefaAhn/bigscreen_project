import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
/* Question */
import Question     from '../../components/Question/Question';
/* Header */
import Header       from '../Header/Header';
/* Footer */
import Footer       from '../Footer/Footer';
/* Not Found Page */
import NotFoundPage from '../../components/NotFoundPage/NotFoundPage';

const Response = ({match}) => {
    const userLink                              = match.params.uri;
    const urlUserAnswer                         = '/userResponse/'+userLink;
    const [error,setError]                      = useState(null);
    const [answerQuestion, setAnswerQuestion]   = useState([]);
    const [dateAction, setDateAction]           = useState(null);
    const [timeAction, setTimeAction]           = useState(null);
    const [hasResult, setHasResult]             = useState(false);

    useEffect(() => {
        axios
        .get(urlUserAnswer)
        .then(response => (
            setAnswerQuestion(response.data.answers),
            setDateAction(response.data.dateAction),
            setTimeAction(response.data.timeAction),
            console.log(response.data),
            (response.data.length==0) ? setHasResult(false) : setHasResult(true)
        ));
    }, [])

    return (
        <div>
            <Header/>
            {(hasResult==false) ? 
                <NotFoundPage/>
                :
                <div className="container formContainer">
                    <div className="row">
                        <div className="col-sm">
                            <div>
                                <p>Vous trouverez ci-dessous les réponses que vous avez apportées à notre sondage le {dateAction} à {timeAction}</p>
                                <form className="needs-validation">
                                    {answerQuestion.map(ans => (
                                        <Question key={'question'+ans.questions.id} data={ans.questions}  nbQuestion={answerQuestion.length} answerUser={ans.content}/>
                                    ))}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Footer/>
        </div>
    );
}

export default Response;