import './App.css';
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

function App() {

  const appID = { APP_ID }
  const region = "US";
  const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
  CometChat.init(appID, appSetting).then(
    () => {
      console.log("Initialization completed successfully");
      // You can now call login function.
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
          <Header />
          <div className="app__body">




            <Sidebar />
            <Feed />
            <div style={{ width: '800px', height: '800px' }}>
              <CometChatUI />
            </div>
          </div>
        </>



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
