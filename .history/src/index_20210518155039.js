import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";
import { CometChat } from '@cometchat-pro/chat';

var appID = "33563bcde5404f5"
var region = "us"
var appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();
CometChat.init(appID, appSetting).then(
  () => {
    console.log('Initialization completed successfully');
    error => {
      console.log("Initialization failed with error:", error);
    }


    ReactDOM.render(
      <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer}>
          <App />
        </StateProvider>
      </React.StrictMode>,
      document.getElementById('root')

    )
  })
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();