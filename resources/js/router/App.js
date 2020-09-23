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
import Error404 from '../Standard/NotFoundPage/NotFoundPage';

const App = () => {
    return (
        <BrowserRouter>
            <div>
            <Switch>
                {/* FRONT OFFICE */}
                <Route exact path="/" component={Form} />
                <Route exact path="/response/:uri" component={Response} />
                <Route exact path="/answer/:uri" component={Thanks}/>
                {/* BACK OFFICE */}
                <Route exact path="/administration" component={Login} />

                <ProtectedRoute path="/dashboard" component={Home}/>
                <ProtectedRoute path="/responses" component={Responses}/>
                <ProtectedRoute path="/question" component={Question}/>
                <ProtectedRoute path="/logOut" component={LogOut}/>
                
                {/* 404 ERROR */}
                <Route exact path="/404" component={Error404} />
                <Route component={Error404} />
            </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;