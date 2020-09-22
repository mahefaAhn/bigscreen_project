import React, { useState, useEffect } from 'react';
/* Question */
import Question     from '../../components/Question/Question';
/* Header */
import Header       from '../Header/Header';
/* Footer */
import Footer       from '../Footer/Footer';

import axios from 'axios';
import './Forms.css';

/* Sweet Alert */

const Form = (props) => {
    const url_getQuestionList                   = '/questions';
    const url_getUserWhoAnswered                = '/userWhoAnswered';
    const url_post_insert_data                  = '/saveForm';
    const prod_url                              = 'https://localhost:3000/';
    /* Check mail */
    const [errorMail,setErrorMail]              = useState(null);
    /* Questions */
    const [questionList, setQuestionList]       = useState([]);

    const [resultUser, setResultUser]           = useState([]);
    const [userWhoAnswered, setUserWhoAnswered] = useState([]);
    const [disabledForm, setDisabledForm]       = useState(true);

    useEffect(() => {
        // Get list of question
        axios
        .get(url_getQuestionList)
        .then(response => (
              setQuestionList(response.data)
        ));
        // Get list of users who answered
        axios
        .get(url_getUserWhoAnswered)
        .then(response => (
            setUserWhoAnswered(response.data.emailList)
        ));
    }, [])

    // Check if email is valid
    const checkEmailValidity = (email) => {
        const regex             = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const checkRegex        = regex.test(String(email).toLowerCase());
        const hasAnswer         = userWhoAnswered.includes(email.toLowerCase());
        const refreshDisable    = (checkRegex && !hasAnswer) ? false : true;
        setDisabledForm(refreshDisable);
        let errorToShow         = null;
        if(checkRegex && hasAnswer) errorToShow = "Cet utilisateur a déjà rempli le questionnaire.";
        if(!checkRegex){
            if(email=='')       errorToShow = "Veuillez renseigner une adresse email.";
            else                errorToShow = "Le format de l'adresse email est incorrect.";
        }
        setErrorMail(errorToShow);
    };

    // onChange function
    const handleChange = (event) => {
        const formData                 = {...resultUser}
        formData[event.target.name]    = event.target.value
        setResultUser(formData)
        if(event.target.name=='1') checkEmailValidity(event.target.value)
    };

    // Show alert
    const alertUser = (uri) => {
        /*
            <span>
                <span>
                    Tout toute l’équipe de Bigscreen vous remercie pour votre engagement.
                    Grâce à votre investissement, nous vous préparons une application toujours plus facile à utiliser, seul ou en famille.
                    Si vous désirez consulter vos réponse ultérieurement, vous pouvez consultez cette adresse: {prod_url+'response/'+uri}
                </span>
            </span>
        */
    }

    // onSubmit function
    const onSubmitFunction = (event) => {
        event.preventDefault();
        const token         = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const configAxios   = {
            headers: {
                'Access-Control-Allow-Methods'  : 'POST, GET, OPTION',
                'Access-Control-Allow-Origin'   : '*',
            },
        };

        axios.post(url_post_insert_data, resultUser)
        .then(function (response) {
            localStorage.setItem('token', token);
            props.history.push('/answer/'+response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    return (
        <div>
            <Header/>
            <div className="container formContainer">
                <div className="row">
                    <div className="col-sm">
                        <h1 className="bigscreen_h1">Votre avis nous intéresse</h1>
                        <p>Merci de répondre à toutes les questions et de valider le formulaire en bas de page.</p>
                        <form className="needs-validation" onSubmit={onSubmitFunction}>
                            {questionList.map(question => (
                                <Question key={'question'+question.id} data={question} onChangeFunction={handleChange} disableOther={disabledForm} nbQuestion={questionList.length} errorIfMail={errorMail}/>
                            ))}
                            <input type="submit" className="btn btn-bg-dark btn-sm float-right col-md-4" value="Valider"/>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Form;