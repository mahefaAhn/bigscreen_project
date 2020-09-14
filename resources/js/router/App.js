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
                <Route exact path="/response" component={Response} />
                <Route path="/thankyou" component={Thanks} />
                {/* BACK OFFICE */}
                <Route exact path="/login" component={Login} />

                <ProtectedRoute pathName="/administration" loggedIn={loggedIn} componentName={Home}/>
                <ProtectedRoute pathName="/responses" loggedIn={loggedIn} componentName={Responses}/>
                <ProtectedRoute pathName="/question" loggedIn={loggedIn} componentName={Question}/>
                
                {/* 
                <Route exact path="/administration" component={Home} />
                <Route exact path="/responses" component={Responses} />
                <Route exact path="/question" component={Question} />
                */}
                
                {/* 404 ERROR */}
                <Route component={NotFoundPage} />
            </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;