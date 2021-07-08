import React from 'react';
import "../styles/Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../adapters/firebase"
import { actionTypes } from "../reducer/reducer";
import { useStateValue } from "../adapters/StateProvider";
import { CometChat } from "@cometchat-pro/chat";
import { AUTH_KEY, APP_ID } from "../adapters/Constants";
import { useState, setLoading } from 'react'


const Login = () => {
    const [loading, setLoading] = useState(false)

    const signIn = () => {
        setLoading(true)
        auth
            .signInWithPopup(provider)
            .then((res) => loginCometChat(res.user))
            .catch((error) => {
                setLoading(false)
                alert(error.message)
            })
    }

    const loginCometChat = (data) => {
        const authKey = AUTH_KEY

        CometChat.login(data.uid, authKey)
            .then((u) => {
                localStorage.setItem('user', JSON.stringify(data))
                window.location.href = '/'
                console.log(u)
                setLoading(false)
            })
            .catch((error) => {
                if (error.code === 'ERR_UID_NOT_FOUND') {
                    signUpWithCometChat(data)
                } else {
                    console.log(error)
                    setLoading(false)
                    alert(error.message)
                }
            })
    }

    const signUpWithCometChat = (data) => {
        const authKey = AUTH_KEY
        const user = new CometChat.User(data.uid)

        user.setName(data.displayName)
        user.setAvatar(data.photoURL)

        CometChat.createUser(user, authKey)
            .then(() => {
                setLoading(false)
                alert('You are now signed up, click the button again to login')
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                alert(error.message)
            })
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src={'/logo.png'} alt="Slack Logo" />

                <h4>Sign in to CometChat</h4>
                <p>cometchat.slack.com</p>
                <Button onClick={signIn}>
                    {!loading ? 'Sign In With Google' : <div id="loading"></div>}
                </Button>
            </div>
        </div>
    )
}

export default Login