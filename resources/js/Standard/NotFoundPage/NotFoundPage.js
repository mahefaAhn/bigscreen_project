import React from 'react';
/* Header */
import Header       from '../../FrontEnd/Header/Header';
/* Footer */
import Footer       from '../../FrontEnd/Footer/Footer';
/* CSS */
import './NotFoundPage.css';
/* Not found page */
import NotFoundPage from '../../components/NotFoundPage/NotFoundPage';

const Error404 = (props) => {
    const prod_url = 'https://localhost:3000/';
    const uniqLink = '';
    return (
        <div className="notFoundPageContainer">
            <Header/>
            <NotFoundPage/>
            <Footer/>
        </div>
    );
}

export default Error404;