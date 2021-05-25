import React from 'react';
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase"

const Login = () => {
    const signIn = (e) => {
        e.preventDefault()
        auth.signInWithPopup(provider)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo%282019%29.svg.png" alt="login logo" />
                <img src="https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg" alt="logo" />
            </div>
            <Button type="submit" onClick={signIn}>
                SignIn
            </Button>

        </div>
    );
};

export default Login;