import './styles/App.css';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Login from "./components/Login";
import { useStateValue } from './adapters/StateProvider';
// import { provider } from "./adapters/firebase"
import { APP_ID, REGION, AUTH_KEY } from "./adapters/Constants";
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { CometChatUI } from "./CometChatWorkspace/src";
import { CometChat } from "@cometchat-pro/chat";
// import { Logout } from "./components/Logout";


function App() {

  const appID = APP_ID
  const region = REGION
  const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
  CometChat.init(appID, appSetting).then(
    () => {
      console.log("Initialization completed successfully");
    },
    error => {
      console.log("Initialization failed with error:", error);
    }
  );


  const [{ user }] = useStateValue();

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
            {/* <div style={{ width: '800px', height: '800px' }}> */}
            <BrowserRouter>
              <h3>Inbox</h3>
              <CometChatUI />
              <PrivateRoute path="/inbox">
              </PrivateRoute>
            </BrowserRouter>
            {/* </div> */}

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