import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

// Protected route
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

// Front End
import Form         from '../FrontEnd/From/Form';
import Response     from '../FrontEnd/Response/Response';
import Thanks       from '../FrontEnd/Thanks/Thanks';

// Back End
import Home         from '../BackEnd/Home/Home';
import Question     from '../BackEnd/Question/Question';
import Responses    from '../BackEnd/Responses/Responses';
import Login        from '../BackEnd/Login/Login';
import LogOut       from '../BackEnd/LogOut/LogOut';

// Standard
import NotFoundPage from '../Standard/NotFoundPage/NotFoundPage';

const App = () => {
    const auth_token        = localStorage.getItem('token');
    const auth_userLogged   = localStorage.getItem('userLogged');
    const loggedIn          = (auth_token!=null && auth_userLogged!=null);
    return (
        <BrowserRouter>
            <div>
            <Switch>
                {/* FRONT OFFICE */}
                <Route exact path="/" component={Form} />
                <Route exact path="/response/:uri" component={Response} />
                <Route exact path="/answer/:uri" component={Thanks}/>
                {/* BACK OFFICE */}
                <Route exact path="/login" component={Login} />

                <ProtectedRoute path="/administration" auth={loggedIn} component={Home}/>
                <ProtectedRoute path="/responses" auth={loggedIn} component={Responses}/>
                <ProtectedRoute path="/question" auth={loggedIn} component={Question}/>
                <ProtectedRoute path="/logOut" auth={loggedIn} component={LogOut}/>
                
                {/* 404 ERROR */}
                <Route exact path="/404" component={NotFoundPage} />
                <Route component={NotFoundPage} />
            </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;