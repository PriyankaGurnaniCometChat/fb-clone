import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './adapters/StateProvider';
import reducer, { initialState } from "./reducer/reducer";
import { CometChat } from '@cometchat-pro/chat';
// import { APP_ID, REGION } from "./adapters/Constants";
import { cometChat } from './app.config'
import { CometChatUI } from "./CometChatWorkspace/src";

const appID = cometChat.APP_ID
const region = cometChat.APP_REGION
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build()

CometChat.init(appID, appSetting)
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
        <div style={{ width: '800px', height: '800px' }}></div>
        <CometChatUI />
      </React.StrictMode>,
      document.getElementById('root')
    )
    console.log('Initialization completed successfully')
  })
  .catch((error) => {
    console.log('Initialization failed with error:', error)
  })