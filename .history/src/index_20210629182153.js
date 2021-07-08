import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './adapters/StateProvider';
import reducer, { initialState } from "./reducer/reducer";
import { CometChat } from '@cometchat-pro/chat';
import { APP_ID, REGION, AUTH_KEY } from "./adapters/Constants";
import { useStateValue } from './adapters/StateProvider';
import { useState } from "react";





const appId = APP_ID
const region = REGION
const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
CometChat.init(appId, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
    const authKey = AUTH_KEY
    const [user] = useState(null);

    CometChat.login(authKey).then(
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

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();