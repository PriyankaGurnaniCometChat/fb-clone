import React, { useState } from 'react';
import './styles/App.css';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Login from "./components/Login";
import { useStateValue } from './adapters/StateProvider';
// import { provider } from "./adapters/firebase"
import { APP_ID, REGION, AUTH_KEY } from "./adapters/Constants";
import { CometChatUI } from "./CometChatWorkspace/src";
import { CometChat } from "@cometchat-pro/chat";
// import { Logout } from "./components/Logout";
import authcontext, { login } from "./adapters/authcontext.js"
import { auth, provider } from "./adapters/firebase"
import { actionTypes } from "./reducer/reducer";
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
      <>
        <Header />
        <main className="app__body">
          <Sidebar />
          <Component {...props} />
        </main>
      </>
    )
  }

  const GuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          addStructure(Component, props)
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )

  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) {
      setIsLoggedIn(true)
    } else {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsLoggedIn(true)
        }
      })
    }
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return null

  return (
    <div className="app">
      <Router>
        <Switch>
          <GuardedRoute
            path="/channels/:id"
            auth={isLoggedIn}
            component={Channel}
          />

          <GuardedRoute path="/users/:id" auth={isLoggedIn} component={User} />

          <GuardedRoute path="/add/channel" auth={isLoggedIn} component={Add} />

          <Route path="/login">
            <Login />
          </Route>

          <GuardedRoute path="/" auth={isLoggedIn} component={Home} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;