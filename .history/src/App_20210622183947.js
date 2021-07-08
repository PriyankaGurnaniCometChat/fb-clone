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

function App() {

  const [{ user }] = useStateValue();


  const appID = "b0b4c73e2a76fabf93e2b95b13d8c6fabe21e87b"
  const region = REGION
  const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
  CometChat.init({ appID }, appSetting).then(
    () => {
      console.log("Initialization completed successfully");
      const authKey = AUTH_KEY;
      const uid = "UID";

      CometChat.login(uid, authKey).then(
        user => {
          console.log("Login Successful:", { user });
        },
        error => {
          console.log("Login failed with exception:", { error });
        }
      );
    },
    error => {
      console.log("Initialization failed with error:", error);
      // Check the reason for error and take appropriate action.
    }
  );



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

export default App;