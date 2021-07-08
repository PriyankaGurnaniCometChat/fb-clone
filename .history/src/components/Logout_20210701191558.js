import React from 'react';
import { CometChat } from "@cometchat-pro/chat";
import "../styles/Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../adapters/firebase"
import { actionTypes } from "../reducer/reducer";
import { useStateValue } from "../adapters/StateProvider";
import { useHistory } from 'react-router-dom'

export const Logout = () => {


    const logout = () => {
        localStorage.removeItem("user")
    }
    <div>
        <button className="logout" onClick={logout}>
            Logout
      </button>
    </div>
}
export default Logout