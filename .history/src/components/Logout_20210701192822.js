import React from 'react';
import { CometChat } from "@cometchat-pro/chat";
import "../styles/Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../adapters/firebase"
import { actionTypes } from "../reducer/reducer";
import { useStateValue } from "../adapters/StateProvider";
import { useHistory } from 'react-router-dom'

const Logout = () => {
    const history = useHistory()

    const logOut = () => {
        auth
            .signOut()
            .then(() => {
                localStorage.removeItem('user')
                history.push('/login')
            })
            .catch((error) => console.log(error.message))
    }


    <button className="logout" onClick={logOut}>
        Logout
      </button>

}
export default Logout