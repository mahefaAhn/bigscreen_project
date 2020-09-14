import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Response = (props) => {
    const url_answer_list                   = '/listAnswers';
    const [error,setError]                  = useState(null);
    const [answerList, setAnswerList]       = useState([]);

    useEffect(() => {
        axios
        .get(url_answer_list)
        .then(response => (
            console.log(response.data),
            setAnswerList(response.data)
        ));
    }, [])

    return (
        <div>
            <h2>Liste des réponses</h2>
            {answerList.map(answerChild => (
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Question</th>
                            <th scope="col">Réponses</th>
                        </tr>
                    </thead>
                    <tbody>
                        { answerChild.map(answer => (
                        <tr key={answer.questions_id}>
                            <th scope="row">{answer.questions_id}</th>
                            <td>{answer.questions.title}</td>
                            <td>{answer.content}</td>
                        </tr>
                        ))}
                    </tbody>
                </table> 
            ))}
        </div>
    );
}

export default Response;