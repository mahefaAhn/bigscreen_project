import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
//import { Formik } from "formik";

import OptionGiven from '../Options/OptionGiven';
import OptionInput from '../Options/OptionInput';
import { words } from 'lodash';
import axios from 'axios';

const UserForm = (props) => {
    //const api_url               = window.$api_url;
    const api_url               ='/';
    const url_question_list     = api_url+'questions';
    const url_get_answer_id     = api_url+'answer_id/';
    const url_post_insert_data  = api_url+'saveForm';
    const [error,setError]                  = useState(null);
    const [questionList, setQuestionList]   = useState([]);
    const [resultUser, setResultUser]       = useState([]);

    useEffect(() => {
        axios
        .get(url_question_list)
        .then(response => (
              setQuestionList(response.data)
        ));
    }, [])

    const onChangeFunction = (event) => {
        const formData                 = {...resultUser}
        formData[event.target.name]    = event.target.value
        setResultUser(formData)
        console.log(formData)
    };

    const getAnswerId = (answer) => {
        const newUrl = url_get_answer_id+answer;
        axios
        .get(newUrl)
        .then(response => (
              console.log(response.data)
        ));
    }

    const onSubmitFunction = (event) => {
        event.preventDefault();
        const token         = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const configAxios   = {
            headers: { 
                /*
                'content-type'      : 'application/json',
                'accept'            : 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers' : '*',
                
                'Authorization'     : `Basic ${token}` 
                */
                'Access-Control-Allow-Methods'  : 'POST, GET, OPTION',
                'Access-Control-Allow-Origin'   : '*',
            },
        };

        axios.post(url_post_insert_data, resultUser)
        .then(function (response) {
            localStorage.setItem('token', token);
            console.log("je suis déjà en train de faire l'insertion");
            console.log(response.data);
            //history.push('/');
        })
        .catch(function (error) {
            console.log("oups, une erreur s'est produite");
            console.log(error);
        });
    }


    return (
        <div className="col-md-12">
            <h1 className="bigscreen_h1">Votre avis nous intéresse</h1>
            <form className="needs-validation" onSubmit={onSubmitFunction}>
                {questionList.map(question => (
                    (
                    question.types.name == 'A' || question.types.name == 'C' ? <OptionGiven label={question.title} id={question.id} key={"question_"+question.id} options={question.options.content} onChangeFunction={onChangeFunction}/> 
                    :(<OptionInput label={question.title} id={question.id} key={"question_"+question.id} input_type={question.input_type} onChangeFunction={onChangeFunction}/>)
                    )
                ))}
                <input type="submit" className="btn bigscreen-btn-outline-dark btn-sm float-right col-md-4" value="Valider"/>
            </form>
        </div>
    );
}

export default UserForm;

if (document.getElementById('user_form')) {
    ReactDOM.render(<UserForm />, document.getElementById('user_form'));
}
