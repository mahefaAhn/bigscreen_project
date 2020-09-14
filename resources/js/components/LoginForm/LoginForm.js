import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
//import { Formik } from "formik";
import LogoDark from '../../Assets/img/logo-black.png';

import axios from 'axios';

const LoginForm = (props) => {
    const api_url               = window.$api_url;
    const url_post_check_user   = api_url+'api/checkAuthentification';

    const [error,setError]                  = useState(null);
    const [resultUser, setResultUser]       = useState([]);

    const handleChange = (event) => {
        const formData                 = {...resultUser}
        formData[event.target.name]    = event.target.value
        setResultUser(formData)
    };

    const onSubmitFunction = (event) => {
        event.preventDefault();
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        localStorage.setItem('token', token);
        
        const configAxios = {
            headers: { 
                'content-type'      : 'application/json',
                'accept'            : 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers' : '*',
                'Access-Control-Allow-Methods' : '*',
                'Authorization'     : `Basic ${token}` 
            },
        };
        axios.post(url_post_check_user, JSON.stringify(resultUser), configAxios)
        .then(function (response) {
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
        <div>
            <div className="container">
                <form onSubmit={onSubmitFunction} className="form-signin">
                    <img class="mb-4" src={LogoDark} alt="" width="72" height="72"/>
                    <input type="text" id="login" className="fadeIn second md-12" name="login" placeholder="Login" onChange={handleChange}/>
                    <input type="password" id="password" className="fadeIn third md-12" name="login" placeholder="Mot de passe" onChange={handleChange}/>
                    <input type="submit" className="fadeIn fourth" value="S'identifier"/>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;

if (document.getElementById('admin_login_form')) {
    ReactDOM.render(<LoginForm />, document.getElementById('admin_login_form'));
}