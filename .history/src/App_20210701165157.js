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

  const addStructure = (Component, props) => {
    return (
      <div className="app">
        {!user ? (
          <Login />
        ) : (
          <>

            <Header />


            <div className="app__body">

              <Sidebar />
              <Feed />
              <div style={{ width: '800px', height: '800px' }}>
                <BrowserRouter>
                  <h3>Inbox</h3>
                  <CometChatUI />
                  <PrivateRoute path="/inbox">
                  </PrivateRoute>
                </BrowserRouter>
              </div>

            </div>

          </>
        )}
      </div>

    );
  }

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          localStorage.getItem('userUID') ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }
}
export default App;