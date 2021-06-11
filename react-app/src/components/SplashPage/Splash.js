import React from 'react';
import LoginForm from "../auth/LoginForm";
import "./Splash.css";

const Splash = () => {
    return (
        <div className="splash">
            <div className="splash__left">
                <div className="splash__logo">
                    <img src="https://theflybook.s3.amazonaws.com/flybook_logo.png" alt=""/>
                </div>
                <h1>Connect with pilots anywhere in the world</h1>
            </div>
            <div className="splash__right">
                <LoginForm />
            </div>
        </div>
    );
};

export default Splash;
