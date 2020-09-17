import React from 'react';
import { Redirect } from "react-router-dom";

const LogOut = (props) => {
    localStorage.clear();
    return(
        <div>
            <Redirect to="/login"/>
        </div>
    );
}

export default LogOut;