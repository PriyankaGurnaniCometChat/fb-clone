import './App.css';
import React, { useEffect } from 'react';
import firebase from 'firebase';
import Header from "./Header";
import Sidebar from "./Sidebar";
import SidebarRow from './SidebarRow';
import Feed from "./Feed";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'; import Message from './Message';
import { ProtectedRoute } from './ProtectedRoute'
import { AuthProvider } from './authcontext';
import { CometChat } from "@cometchat-pro/chat";
import Constants, { APP_ID, REGION } from "./Constants"
import { CometChatUI } from "./CometChatWorkspace/src";
import Inbox from "./inbox"
import Logout from "./Logout"
import Register from "./Register"



function App() {

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // store the user on local storage
        localStorage.setItem('userUID', user.uid);
      } else {
        // removes the user from local storage on logOut
        localStorage.removeItem('userUID');
      }
    });
  }, []);

  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div>
          <>
            <Header />
            <div className="app__body">




              <Sidebar />
              <Feed />
              <div style={{ width: '800px', height: '800px' }}>
                <CometChatUI />
              </div>
            </div>
          </>

          <BrowserRouter>
            <Switch>
              <PrivateRoute path="/inbox">
                <Inbox />
              </PrivateRoute>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
            </Switch>
          </BrowserRouter>
          <div />
        </div>


      )
      }
    </div >

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

export default App;
