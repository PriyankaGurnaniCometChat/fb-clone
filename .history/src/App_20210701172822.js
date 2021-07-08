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
import { APP_ID, REGION } from "./adapters/Constants";


function App() {
  <Header />


}
export default App;