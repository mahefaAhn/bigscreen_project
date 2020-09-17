import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu     from '../Menu/Menu';

/* CSS */
import '../../CommonCSS/style.css';

const Responses = (props) => {
    const url_answer_list                   = '/listAnswers';
    const [error,setError]                  = useState(null);
    const [answerList, setAnswerList]       = useState([]);
    var randomKey                           = require("randomstring");

    useEffect(() => {
        axios
        .get(url_answer_list)
        .then(response => (
            setAnswerList(response.data)
        ));
    }, [])

    return (
        <div className="container">
            <div className="row admin_fullContainer rounded">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 admin_menuContent rounded">
                    <Menu/>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 admin_mainContent rounded">
                    <h2 className="admin_h2">Liste des réponses</h2>
                    {answerList.map(answerChild => (
                        <table className="table table-dark" key={randomKey.generate(7)}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Question</th>
                                    <th scope="col">Réponses</th>
                                </tr>
                            </thead>
                            <tbody>
                                { answerChild.map(answer => (
                                <tr key={randomKey.generate(7)}>
                                    <th scope="row">{answer.questions_id}</th>
                                    <td>{answer.questions.title}</td>
                                    <td>{answer.content}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table> 
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Responses;