import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Login from "./components/Login";
// import { useStateValue } from './adapters/StateProvider';
// import { provider } from "./adapters/firebase"
import { APP_ID, REGION, AUTH_KEY } from "./adapters/Constants";
import { CometChatUI } from "./CometChatWorkspace/src";
import { CometChat } from "@cometchat-pro/chat";
// import { Logout } from "./components/Logout";
import authcontext, { login } from "./adapters/authcontext.js"
import { auth, provider } from "./adapters/firebase"
import { actionTypes } from "./reducer/reducer";
import User from './components/User'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)


  return (
    <>
      <Login />
      <Header />
      <Feed />
      <main className="app__body">
        <Sidebar />
        <Component {...props} />
      </main>
    </>
  )
}


export default App