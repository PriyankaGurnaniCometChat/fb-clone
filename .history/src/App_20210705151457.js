import './styles/App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import Login from './screens/Login'
import User from './screens/User'
// import Home from './screens/Home'
import { CometChatUI } from "./CometChatWorkspace/src";

import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { auth } from './firebase'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const addStructure = (Component, props) => {
    return (
      <>
        <Header />
        <main className="app__body">
          <CometChatUI />
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
          <GuardedRoute path="/users/:id" auth={isLoggedIn} component={User} />

          <Route path="/login">
            <Login />
          </Route>

          <GuardedRoute path="/" auth={isLoggedIn} component={Feed} />
          {/* <GuardedRoute path="/" auth={isLoggedIn} component={Sidebar} />
          <GuardedRoute path="/" auth={isLoggedIn} component={SidebarRow} /> */}



        </Switch>
      </Router>
      <div className="cometchatui" style={{ width: '800px', height: '800px' }} >
        <CometChatUI />
      </div>
    </div>
  )
}

export default App