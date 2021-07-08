import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { StateProvider } from './adapters/StateProvider';
// import reducer, { initialState } from "./reducer/reducer";
import { CometChat } from '@cometchat-pro/chat';
import { APP_ID, REGION } from "./adapters/Constants";
// import { useStateValue } from './adapters/StateProvider';
// import { useState } from "react";


const appID = APP_ID
const region = REGION
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build()

CometChat.init(appID, appSetting)
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    )
    console.log('Initialization completed successfully')
  })
  .catch((error) => {
    console.log('Initialization failed with error:', error)
  })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();