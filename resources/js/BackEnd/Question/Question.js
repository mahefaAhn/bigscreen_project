import React, { useState, useEffect } from 'react';
import axios    from 'axios';
import Menu     from '../Menu/Menu';

/* CSS */
import '../../CommonCSS/style.css';
import './Question.css';

const Question = (props) => {
    const url_question_list                 = '/questions';
    const [questionList, setQuestionList]   = useState([]);

    useEffect(() => {
        axios
        .get(url_question_list)
        .then(response => (
              setQuestionList(response.data)
        ));
    }, [])

    return (
        <div className="generalContainer">
            <div className="row">
                <div className="col-md-2 menuContainer">
                    <Menu/>
                </div>
                <div className="col-md-10 pageContainer">
                    <h2 className="bsTitleH2">Liste des questions</h2>
                    <table className="table table-dark responsive">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Contenu</th>
                                <th scope="col">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                        {questionList.map(question => (
                            <tr key={question.id}>
                                <th scope="row">{question.id}</th>
                                <td>{question.title}</td>
                                <td>{question.types.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table> 
                </div>
            </div>
        </div>
    );
}

export default Question;