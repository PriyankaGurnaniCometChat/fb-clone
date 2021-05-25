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
            <BrowserRouter>
              <Switch>
                <Route exact path="/">
                  <IndexPage />
                </Route>
                <Route path="/category/:name">
                  <CategoryPage />
                </Route>
                <PrivateRoute path="/inbox">
                  <InboxPage />
                </PrivateRoute>
                <PrivateRoute path="/product/new">
                  <NewProductPage />
                </PrivateRoute>
                <Route path="/product/:id">
                  <ProductPage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <Route path="/logout">
                  <LogoutPage />
                </Route>
                <Route path="/register">
                  <RegisterPage />
                </Route>
                <Route path="*">
                  <IndexPage />
                </Route>
              </Switch>
            </BrowserRouter>
    </>
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

export default App;
