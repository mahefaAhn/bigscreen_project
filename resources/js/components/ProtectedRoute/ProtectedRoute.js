import React from 'react';
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
    const loginPage     = '/login';
    const loggedIn      = props.loggedIn;
    const componentName = props.componentName;
    const pathName      = props.pathName;
    
    /*
        <Route exact path="/responses" component={Responses} />
        <Route exact path="/question" component={Question} />
    */

    return (
        (loggedIn) ? <Route exact path={pathName} component={componentName} />
        : <Redirect to={loginPage} />
    );
  };
  
export default ProtectedRoute;