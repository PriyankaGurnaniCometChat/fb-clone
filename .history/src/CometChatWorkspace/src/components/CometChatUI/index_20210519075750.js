import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatNavBar } from "./CometChatNavBar";
import { CometChatMessages } from "../Messages";
import { CometChatIncomingCall, CometChatIncomingDirectCall } from "../Calls";

import { CometChatContextProvider } from "../../util/CometChatContext";
import * as enums from "../../util/enums.js";
import { theme } from "../../resources/theme";
import Translator from "../../resources/localization/translator";

import {
  unifiedStyle,
  unifiedSidebarStyle,
  unifiedMainStyle,
} from "./style";

class CometChatUI extends React.Component {

  loggedInUser = null;

  constructor(props) {

    super(props);

    this.tabs = {
      "CHATS": "chats",
      "USERS": "users",
      "CALLS": "calls",
      "GROUPS": "groups",
      "INFO": "info"
    }

    this.state = {
      activeTab: this.tabs["CHATS"],
      sidebarview: false,
      lang: props.lang,
      unreadMessages: [],
    }

    this.navBarRef = React.createRef();
    this.contextProviderRef = React.createRef();

    CometChat.getLoggedinUser().then(user => this.loggedInUser = user).catch(error => {
      console.error(error);
    });
  }

  componentDidMount() {

    if (this.props.chatWithUser.length === 0 && this.props.chatWithGroup.length === 0) {
      this.toggleSideBar();
    }
  }

  componentDidUpdate(prevProps) {

    if (prevProps.lang !== this.props.lang) {
      this.setState({ lang: this.props.lang });
    }
  }

  navBarAction = (action, type, item) => {

    switch (action) {
      case enums.ACTIONS["ITEM_CLICKED"]:
        this.itemClicked(item, type);
        break;
      case enums.ACTIONS["CHANGE_TAB"]:
        this.tabChanged(type);
        break;
      case enums.ACTIONS["TOGGLE_SIDEBAR"]:
        this.toggleSideBar();
        break;
      default:
        break;
    }
  }

  itemClicked = (item, type) => {

    this.contextProviderRef.setTypeAndItem(type, item);
    this.toggleSideBar()
  }

  tabChanged = tab => this.setState({ activeTab: tab });

  actionHandler = (action, item, count, ...otherProps) => {

    switch (action) {
      case enums.ACTIONS["TOGGLE_SIDEBAR"]:
        this.toggleSideBar();
        break;
      case enums.GROUP_MEMBER_SCOPE_CHANGED:
      case enums.GROUP_MEMBER_KICKED:
      case enums.GROUP_MEMBER_BANNED:
        this.groupUpdated(action, item, count, ...otherProps);
        break;
      default:
        break;
    }
  }

  toggleSideBar = () => {

    const sidebarview = this.state.sidebarview;
    this.setState({ sidebarview: !sidebarview });
  }

  /**
   If the logged in user is banned, kicked or scope changed, update the chat window accordingly
   */
  groupUpdated = (key, message, group, options) => {

    switch (key) {
      case enums.GROUP_MEMBER_BANNED:
      case enums.GROUP_MEMBER_KICKED: {

        if (this.contextProviderRef.state.type === CometChat.ACTION_TYPE.TYPE_GROUP
          && this.contextProviderRef.state.item.guid === group.guid
          && options.user.uid === this.loggedInUser.uid) {

          this.contextProviderRef.setItem({});
          this.contextProviderRef.setType("");
        }
        break;
      }
      case enums.GROUP_MEMBER_SCOPE_CHANGED: {

        if (this.contextProviderRef.state.type === CometChat.ACTION_TYPE.TYPE_GROUP
          && this.contextProviderRef.state.item.guid === group.guid
          && options.user.uid === this.loggedInUser.uid) {

          const newObject = Object.assign({}, this.contextProviderRef.state.item, { "scope": options["scope"] })
          this.contextProviderRef.setItem(newObject);
          this.contextProviderRef.setType(CometChat.ACTION_TYPE.TYPE_GROUP);
        }
        break;
      }
      default:
        break;
    }
  }

  render() {

    let messageScreen = (
      <CometChatMessages
        theme={this.props.theme}
        lang={this.state.lang}
        _parent="unified"
        actionGenerated={this.actionHandler} />
    );

    return (
      <CometChatContextProvider ref={el => this.contextProviderRef = el} user={this.props.chatWithUser} group={this.props.chatWithGroup}>
        <div css={unifiedStyle(this.props)} className="cometchat cometchat--unified" dir={Translator.getDirection(this.state.lang)}>
          <div css={unifiedSidebarStyle(this.state, this.props)} className="unified__sidebar">
            <CometChatNavBar
              ref={el => this.navBarRef = el}
              theme={this.props.theme}
              lang={this.state.lang}
              activeTab={this.state.activeTab}
              tabs={this.tabs}
              friendsOnly={this.props.friendsOnly}
              unreadMessages={this.state.unreadMessages}
              actionGenerated={this.navBarAction} />
          </div>
          <div css={unifiedMainStyle(this.state, this.props)} className="unified__main">
            {messageScreen}
          </div>
          <CometChatIncomingCall theme={this.props.theme} lang={this.state.lang} actionGenerated={this.actionHandler} />
          <CometChatIncomingDirectCall theme={this.props.theme} lang={this.state.lang} actionGenerated={this.actionHandler} />
        </div>
      </CometChatContextProvider>
    );
  }
}

// Specifies the default values for props:
CometChatUI.defaultProps = {
  lang: Translator.getDefaultLanguage(),
  theme: theme,
  friendsOnly: false,
  chatWithUser: "",
  chatWithGroup: "",
};

CometChatUI.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.object,
  friendsOnly: PropTypes.bool,
  chatWithUser: PropTypes.string,
  chatWithGroup: PropTypes.string,
}

export default CometChatUI;