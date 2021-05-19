import './App.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import SidebarRow from './SidebarRow';
import Feed from "./Feed";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Message from './Message';
import { ProtectedRoute } from './ProtectedRoute'
import { AuthProvider } from './authcontext';
import { CometChatUI } from "./CometChatWorkspace/src";

function App() {


  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header >
            <div style={{ width: '800px', height: '800px' }}>
              <CometChatUI />
            </div>
          </Header>
          <div className="app__body">
            <Sidebar />
            <Feed />

          </div>
        </>
      )}
    </div>

  );
}

export default App;
