import React from 'react';
import { CometChat } from "@cometchat-pro/chat";
import "../styles/Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../adapters/firebase"
import { actionTypes } from "../reducer/reducer";
import { useStateValue } from "../adapters/StateProvider";
import { useHistory } from 'react-router-dom'

export const Logout = () => {

    const logOut = () => {
        auth
            .signOut()
            .then(() => {
                localStorage.removeItem('user')
                history.push('/login')
            })
            .catch((error) => console.log(error.message))
    }
    <div>
        <button className="logout" onClick={logOut}>
            Logout
      </button>
    </div>
}
export default Logout