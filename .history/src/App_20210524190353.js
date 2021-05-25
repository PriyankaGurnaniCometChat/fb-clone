import './App.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import SidebarRow from './SidebarRow';
import Feed from "./Feed";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Message from './Message';
import { ProtectedRoute } from './ProtectedRoute'
import { AuthProvider } from './authcontext';
import { CometChatUI } from "./CometChatWorkspace/src";
import { CometChat } from "@cometchat-pro/chat";
import Constants, { APP_ID, REGION } from "./Constants"
import LoginPage from "./LoginPage";
import InboxPage from "./InboxPage";

function App() {

  const appID = "33563bcde5404f5"
  const region = "US"
  const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
  CometChat.init(appID, appSetting).then(
    () => {
      console.log("Initialization completed successfully");
      <LoginPage />
    },
    error => {
      console.log("Initialization failed with error:", error);
      // Check the reason for error and take appropriate action.
    }
  );


  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <BrowserRouter>

            <Header />
            <div style={{ width: '800px', height: '800px' }}>
              <CometChatUI />
              <PrivateRoute path="/inbox">
                <InboxPage />
              </PrivateRoute>
            </BrowserRouter>
          </div>

          <div className="app__body">
            <Sidebar />
            <Feed />

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