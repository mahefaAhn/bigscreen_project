import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogoLight from '../../Assets/img/logo.png';
// CSS
import '../../CommonCSS/style.css'
import './Login.css'

const Login = (props) => {
    const urlAuthentication                         = '/authentication';
    const [errorEmail,setErrorEmail]                = useState(null);
    const [errorPwd,setErrorPwd]                    = useState(null);
    const [userAuth, setUserAuth]                   = useState([]);
    const [errorLoggin, setErrorLogin]              = useState(null);
    const [buttonLoginStatus, setButtonLoginStatus] = useState('disabled');

    // Redirect to 'administration' if user is already logged in
    const auth_token        = localStorage.getItem('token');
    const auth_userLogged   = localStorage.getItem('userLogged');
    if(auth_token && auth_userLogged) props.history.push('/administration');

    const handleChange = (event) => {
        setErrorLogin(null);
        const formData                 = {...userAuth};
        formData[event.target.name]    = event.target.value;
        setUserAuth(formData);
        // Check if email follows correct format
        const email                     = document.querySelector('#email').value;
        const regex                     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailValid                = regex.test(String(email).toLowerCase());
        // Check if password field is not null
        const password                  = document.querySelector('#password').value;
        const pwdValid                  = (password!='' && password!=null);
        // Set btn status
        if(emailValid && pwdValid){
            setButtonLoginStatus(null);
            setErrorEmail(null);
            setErrorPwd(null);
        }
        else{
            setButtonLoginStatus('disabled');
            if(!emailValid)        setErrorEmail('Email invalide');
            if(!pwdValid)          setErrorPwd('Le mot de passe est requis pour vous identifier.');
        }
    };

    const onSubmitFunction = (event) => {
        event.preventDefault();
        const token         = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const configAxios   = {
            headers: {
                'Access-Control-Allow-Methods'  : 'POST, GET, OPTION',
                'Access-Control-Allow-Origin'   : '*',
            },
        };

        const email         =  document.querySelector('#email').value;
        const password      =  document.querySelector('#password').value;
        if(email=='' && password==''){
            setErrorLogin("Veuillez renseigner l'adresse email et le mot de passe.");
        }
        else{
            setErrorLogin(null);
            axios.post(urlAuthentication, userAuth)
            .then(function (response) {
                const resultAuth    = response.data;
                if(resultAuth.resultFound==1){
                    localStorage.setItem('token', token);
                    localStorage.setItem('userLogged', resultAuth.userFound);
                    setErrorLogin(null);
                    props.history.replace('/administration');
                }else{
                    setErrorLogin("Identifiant ou mot de passe incorrect.");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    return (
        <div className="row justify-content-center align-items-center">
            <div className="loginDivision rounded">
                <form onSubmit={onSubmitFunction}>
                    <center><img src={LogoLight} className="bsLogoLogin"/></center>
                    <center>{(errorLoggin == null) ? '' : <label className="font-weight-bold text-white">{errorLoggin}</label>}</center>
                    <div className="form-group">
                        <label>Adresse email</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={handleChange} placeholder="Votre adresse email"/>
                        {(errorEmail == null) ? '' : <label className="text-danger">{errorEmail}</label>}
                    </div>
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={handleChange} placeholder="Votre mot de passe"/>
                        {(errorPwd == null) ? '' : <label className="text-danger">{errorPwd}</label>}
                    </div>
                    <div className="form-group float-right">
                        <button type="submit" className={buttonLoginStatus+" btn btn-outline-light"}>Se connecter</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
