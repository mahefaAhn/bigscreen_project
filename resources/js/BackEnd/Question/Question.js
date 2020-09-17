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
        <div className="container">
            <div className="row admin_fullContainer">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 admin_menuContent">
                    <Menu/>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 admin_mainContent">
                    <h2 className="admin_h2">Liste des questions</h2>
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