import React from 'react';
import { CometChat } from "@cometchat-pro/chat";
import "../styles/Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../adapters/firebase"
import { actionTypes } from "../reducer/reducer";
import { useStateValue } from "../adapters/StateProvider";

export const Logout = () => {
    CometChat.logout().then(() => {
        window.location.href = '/';
    });
}

