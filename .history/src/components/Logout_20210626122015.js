import React from 'react';
import "../styles/Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../adapters/firebase"
import { actionTypes } from "../reducer/reducer";
import { useStateValue } from "../adapters/StateProvider";

const logout = () => {
    CometChat.logout().then(() => {
        window.location.href = '/';
    });
}

export default Logout;