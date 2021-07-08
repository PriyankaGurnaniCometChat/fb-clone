import './styles/App.css';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Login from "./components/Login";
import { useStateValue } from './adapters/StateProvider';
import { provider } from "./adapters/firebase"
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { CometChatUI } from "./CometChatWorkspace/src";
import { CometChat } from "@cometchat-pro/chat";
import { APP_ID, REGION, AUTH_KEY } from "./adapters/Constants";
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

function App() {

  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState("");

  // logout
  const logout = () => { };

  // add friend
  const addFriend = (e) => {
    e.preventDefault();
  };



  const appID = APP_ID
  const region = REGION

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
              {/* logout button */}
              <button onClick={() => logout()}>Logout</button>
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

export default App;