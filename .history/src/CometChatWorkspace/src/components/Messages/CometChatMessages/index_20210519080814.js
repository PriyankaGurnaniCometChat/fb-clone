import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import {
  CometChatMessageHeader, CometChatMessageList, CometChatMessageComposer, CometChatLiveReactions, CometChatMessageThread, CometChatImageViewer
} from "../";

import {
  CometChatIncomingCall, CometChatOutgoingCall, CometChatOutgoingDirectCall, CometChatIncomingDirectCall
} from "../../Calls";

import { CometChatUserDetails } from "../../Users";
import { CometChatGroupDetails } from "../../Groups";

import { CometChatContextProvider, CometChatContext } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";
import { checkMessageForExtensionsData, validateWidgetSettings } from "../../../util/common";
import { SoundManager } from "../../../util/SoundManager";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

import {
  chatWrapperStyle,
  chatSecondaryStyle,
  reactionsWrapperStyle,
  messagePaneTopStyle,
  messagePaneBannerStyle,
  messagePaneUnreadBannerStyle,
  messagePaneUnreadBannerMessageStyle,
  iconArrowDownStyle,
  chatContainerStyle
} from "./style";

class CometChatMessages extends React.PureComponent {

  static contextType = CometChatContext;

  constructor(props) {

    super(props);

    this.state = {
      messageList: [],
      scrollToBottom: true,
      messageToBeEdited: "",
      replyPreview: null,
      liveReaction: false,
      messageToReact: null,
      lang: props.lang,
      unreadMessages: [],
      viewdetailscreen: false,
      threadmessageview: false,
      threadmessagetype: null,
      threadmessageitem: {},
      threadmessageparent: {},
      viewOriginalImage: false
    }

    CometChat.getLoggedinUser().then(user => this.loggedInUser = user).catch(error => {
      console.error(error);
    });

    this.contextProviderRef = React.createRef();
    this.composerRef = React.createRef();
    this.messageListRef = React.createRef();
    this.outgoingCallRef = React.createRef();
    this.outgoingDirectCallRef = React.createRef();

    this.reactionName = "heart";
  }

  componentDidMount() {

    this.type = this.getContext().type;
    this.item = this.getContext().item;
    //SoundManager.setWidgetSettings(this.props.widgetsettings);
  }

  componentDidUpdate(prevProps, prevState) {

    if (Object.keys(this.item).length) {

      const ifChatWindowChanged = () => {

        let output = false;

        if (this.getContext().type === CometChat.ACTION_TYPE.TYPE_USER && this.getContext().item.uid !== this.item.uid) {
          output = true;
        } else if (this.getContext().type === CometChat.ACTION_TYPE.TYPE_GROUP && this.getContext().item.guid !== this.item.guid) {
          output = true;
        } else if (this.type !== this.getContext().type) {
          output = true;
        }

        return output;
      }

      if (ifChatWindowChanged() === true) {
        this.setState({ messageList: [], scrollToBottom: true, messageToBeEdited: "", threadmessageview: false, viewdetailscreen: false });
      }

    }

    this.type = this.getContext().type;
    this.item = (this.getContext().type === CometChat.ACTION_TYPE.TYPE_USER || CometChat.ACTION_TYPE.TYPE_GROUP) ? this.getContext().item : {};

    if (prevProps.lang !== this.props.lang) {
      this.setState({ lang: this.props.lang });
    }

    /**
    * Custom message to be appended or updated for direct calling
    */
    if (Object.keys(this.props.widgetsettings).length) {

      if (Object.keys(this.getContext().directCallCustomMessage).length
        && this.getContext().directCallCustomMessageAction.trim().length
        && (this.getContext().directCallCustomMessage !== this.directCallCustomMessage || this.getContext().directCallCustomMessageAction !== this.directCallCustomMessageAction)) {

        const customMessage = this.getContext().directCallCustomMessage;
        const messageAction = this.getContext().directCallCustomMessageAction.trim();

        switch (messageAction) {
          case enums.ACTIONS["MESSAGE_COMPOSED"]:
            this.appendMessage(customMessage);
            break;
          case enums.ACTIONS["MESSAGE_SENT"]:
          case enums.ACTIONS["ERROR_IN_SENDING_MESSAGE"]: {

            this.messageSent(customMessage);
            setTimeout(() => {
              this.getContext().setDirectCallCustomMessage({}, "");
            }, 1000)

            break;
          }
          default:
            break;
        }
      }

      this.directCallCustomMessage = this.getContext().directCallCustomMessage;
      this.directCallCustomMessageAction = this.getContext().directCallCustomMessageAction.trim();
    }
  }

  getContext = () => {

    if (this.props._parent.length) {
      return this.context;
    } else {
      return this.contextProviderRef.state;
    }
  }

  actionHandler = (action, messages, key, group, options) => {

    switch (action) {
      case enums.ACTIONS["CUSTOM_MESSAGE_RECEIVED"]:
      case enums.ACTIONS["MESSAGE_RECEIVED"]: {

        const message = messages[0];
        if (message.parentMessageId) {

          this.updateReplyCount(messages);

        } else {
          this.smartReplyPreview(messages);
          this.appendMessage(messages);
        }

        SoundManager.play(enums.CONSTANTS.AUDIO["INCOMING_MESSAGE"], this.getContext());
      }
        break;
      case enums.ACTIONS["MESSAGE_READ"]: {

        if (this.props?.actionGenerated) {
          this.props?.actionGenerated(action, messages);
        }

        break;
      }
      case enums.ACTIONS["MESSAGE_COMPOSED"]: {

        this.appendMessage(messages);
        this.getContext().setLastMessage(messages[0]);
        break;
      }
      case enums.ACTIONS["MESSAGE_SENT"]:
      case enums.ACTIONS["ERROR_IN_SENDING_MESSAGE"]:
        this.messageSent(messages);
        break;
      case enums.ACTIONS["ON_MESSAGE_READ_DELIVERED"]:
        this.updateMessages(messages);
        break;
      case enums.ACTIONS["ON_MESSAGE_EDITED"]: {

        this.updateMessages(messages);
        //update the parent message of thread message
        this.updateParentThreadedMessage(key, "edit");
        break;
      }
      case enums.ACTIONS["ON_MESSAGE_DELETED"]: {

        this.removeMessages(messages);
        //remove the thread message
        this.updateParentThreadedMessage(messages[0], "delete");
        break;
      }
      case enums.ACTIONS["MESSAGES_FETCHED"]:
        this.prependMessages(messages);
        break;
      case enums.ACTIONS["REFRESHING_MESSAGES"]:
        this.refreshingMessages();
        break;
      case enums.ACTIONS["MESSAGES_REFRESHED"]:
        this.messageRefreshed(messages);
        break;
      case enums.ACTIONS["NEW_MESSAGES"]:
        this.newMessagesArrived(messages);
        break;
      case enums.ACTIONS["CLEAR_UNREAD_MESSAGES"]:
        this.jumpToMessages(true);
        break;
      case enums.ACTIONS["DELETE_MESSAGE"]:
        this.deleteMessage(messages);
        break;
      case enums.ACTIONS["EDIT_MESSAGE"]:
        this.editMessage(messages);
        break;
      case enums.ACTIONS["MESSAGE_EDITED"]:
        this.messageEdited(messages);
        break;
      case enums.ACTIONS["CLEAR_EDIT_PREVIEW"]:
        this.clearEditPreview();
        break;
      case enums.GROUP_MEMBER_SCOPE_CHANGED:
      case enums.GROUP_MEMBER_KICKED:
      case enums.GROUP_MEMBER_BANNED:
      case enums.GROUP_MEMBER_UNBANNED:
      case enums.GROUP_MEMBER_ADDED:
      case enums.GROUP_MEMBER_LEFT:
      case enums.GROUP_MEMBER_JOINED:
        this.groupUpdated(action, messages, group, options);
        break;
      case enums.INCOMING_CALL_RECEIVED:
      case enums.INCOMING_CALL_CANCELLED:
      case enums.OUTGOING_CALL_ACCEPTED:
      case enums.OUTGOING_CALL_REJECTED:
        this.appendCallMessage(messages);
        break;
      case enums.ACTIONS["VIEW_ORIGINAL_IMAGE"]:
        this.toggleOriginalImageView(messages);
        break;
      case enums.ACTIONS["INITIATE_AUDIO_CALL"]:
        this.audioCall();
        break;
      case enums.ACTIONS["INITIATE_VIDEO_CALL"]:
        this.videoCall();
        break;
      case enums.ACTIONS["VIEW_DETAIL"]:
      case enums.ACTIONS["CLOSE_GROUP_DETAIL"]:
      case enums.ACTIONS["CLOSE_USER_DETAIL"]:
        this.toggleDetailView();
        break;
      case enums.ACTIONS["TOGGLE_SIDEBAR"]:
        this.toggleDetailView();
        this.props.actionGenerated(action);
        break;
      case enums.ACTIONS["SEND_LIVE_REACTION"]:
        this.toggleReaction(true);
        break;
      case enums.ACTIONS["SHOW_LIVE_REACTION"]:
        this.showReaction(messages);
        break;
      case enums.ACTIONS["STOP_LIVE_REACTION"]:
        this.toggleReaction(false);
        break;
      case enums.ACTIONS["REACT_TO_MESSAGE"]:
        this.reactToMessage(messages);
        break;
      case enums.ACTIONS["OUTGOING_CALL_ACCEPTED"]:
      case enums.ACTIONS["USER_JOINED_CALL"]:
      case enums.ACTIONS["USER_LEFT_CALL"]:
      case enums.ACTIONS["OUTGOING_CALL_ENDED"]:
      case enums.ACTIONS["OUTGOING_CALL_REJECTED"]:
      case enums.ACTIONS["OUTGOING_CALL_CANCELLED"]:
      case enums.ACTIONS["INCOMING_CALL_ACCEPTED"]:
      case enums.ACTIONS["INCOMING_CALL_ENDED"]:
      case enums.ACTIONS["INCOMING_CALL_REJECTED"]:
      case enums.ACTIONS["DIRECT_CALL_ENDED"]:
      case enums.ACTIONS["DIRECT_CALL_ERROR"]:
        break;
      case enums.ACTIONS["JOIN_DIRECT_CALL"]: {

        //if used in a chat widget, trigger the event to the app component as directcall component is included outside of iframe
        if (Object.keys(this.props.widgetsettings).length) {
          this.props.actionGenerated(action, messages);
        } else {
          const sessionID = (this.getContext().type === CometChat.ACTION_TYPE.TYPE_GROUP) ? this.getContext().item.guid : null;
          this.outgoingDirectCallRef.joinCall(sessionID);
        }

        break;
      }
      case enums.ACTIONS["VIEW_THREADED_MESSAGE"]:
        this.viewThreadedMessage(messages);
        break;
      case enums.ACTIONS["THREAD_MESSAGE_COMPOSED"]:
        this.threadMessageComposed(messages);
        break;
      case enums.ACTIONS["CLOSE_THREADED_MESSAGE"]:
        this.closeThreadedMessage();
        break;
      case enums.ACTIONS["ADD_GROUP_MEMBER_SUCCESS"]:
        this.appendMemberAddedMessage(messages);
        break;
      case enums.ACTIONS["UNBAN_GROUP_MEMBER_SUCCESS"]:
        this.appendMemberUnbannedMessage(messages);
        break;
      case enums.ACTIONS["SCOPECHANGE_GROUPMEMBER_SUCCESS"]:
        this.appendMemberScopeChangedMessage(messages);
        break;
      default:
        break;
    }
  }

  appendMemberAddedMessage = (messages) => {

    if (validateWidgetSettings(this.props.widgetsettings, "hide_join_leave_notifications") === true) {
      return false;
    }

    const messageList = [];
    messages.forEach(eachMember => {

      const sentAt = new Date() / 1000 | 0;
      const messageObj = {
        "receiver": { ...this.context.item },
        "receiverId": this.context.item.guid,
        "receiverType": CometChat.RECEIVER_TYPE.GROUP,
        "sender": { ...this.loggedInUser },
        "category": CometChat.CATEGORY_ACTION,
        "type": CometChat.ACTION_TYPE.TYPE_GROUP_MEMBER,
        "sentAt": sentAt,
        "action": CometChat.ACTION_TYPE.MEMBER_ADDED,
        "actionBy": { ...this.loggedInUser },
        "actionOn": { ...eachMember },
        "actionFor": { ...this.context.item }
      };

      messageList.push(messageObj);
    });

    this.appendMessage(messageList);
  }

  appendMemberUnbannedMessage = (messages) => {

    if (validateWidgetSettings(this.props.widgetsettings, "hide_join_leave_notifications") === true) {
      return false;
    }

    const messageList = [];
    messages.forEach(eachMember => {

      const sentAt = new Date() / 1000 | 0;
      const messageObj = {
        "receiver": { ...this.context.item },
        "receiverId": this.context.item.guid,
        "receiverType": CometChat.RECEIVER_TYPE.GROUP,
        "sender": { ...this.loggedInUser },
        "category": CometChat.CATEGORY_ACTION,
        "type": CometChat.ACTION_TYPE.TYPE_GROUP_MEMBER,
        "sentAt": sentAt,
        "action": CometChat.ACTION_TYPE.MEMBER_UNBANNED,
        "actionBy": { ...this.loggedInUser },
        "actionOn": { ...eachMember }
      };

      messageList.push(messageObj);
    });

    this.appendMessage(messageList);
  }

  appendMemberScopeChangedMessage = (messages) => {

    if (validateWidgetSettings(this.props.widgetsettings, "hide_join_leave_notifications") === true) {
      return false;
    }

    const messageList = [];

    messages.forEach(eachMember => {

      const newScope = Translator.translate(eachMember.scope, this.state.lang);

      const sentAt = new Date() / 1000 | 0;
      const messageObj = {
        "receiver": { ...this.context.item },
        "receiverId": this.context.item.guid,
        "receiverType": CometChat.RECEIVER_TYPE.GROUP,
        "sender": { ...this.loggedInUser },
        "category": CometChat.CATEGORY_ACTION,
        "type": CometChat.ACTION_TYPE.TYPE_GROUP_MEMBER,
        "sentAt": sentAt,
        "action": CometChat.ACTION_TYPE.MEMBER_SCOPE_CHANGED,
        "actionBy": { ...this.loggedInUser },
        "actionOn": { ...eachMember },
        "newScope": newScope
      };
      messageList.push(messageObj);
    });

    this.appendMessage(messageList);
  }

  toggleOriginalImageView = (message) => {
    this.setState({ viewOriginalImage: message });
  }

  toggleDetailView = () => {

    let viewdetail = !this.state.viewdetailscreen;
    this.setState({ viewdetailscreen: viewdetail, threadmessageview: false });
  }

  viewThreadedMessage = (parentMessage) => {

    const message = { ...parentMessage };
    const threaditem = { ...this.getContext().item };
    this.setState({
      threadmessageview: true,
      threadmessageparent: message,
      threadmessageitem: threaditem,
      threadmessagetype: this.getContext().type,
      viewdetailscreen: false
    });

  }

  threadMessageComposed = (messages) => {

    if (this.getContext().type !== this.state.threadmessagetype) {
      return false;
    }

    if (
      (this.state.threadmessagetype === CometChat.ACTION_TYPE.TYPE_GROUP && this.getContext().item.guid !== this.state.threadmessageitem.guid)
      || (this.state.threadmessagetype === CometChat.ACTION_TYPE.TYPE_USER && this.getContext().item.uid !== this.state.threadmessageitem.uid)) {
      return false;
    }

    this.updateReplyCount(messages);
    this.getContext().setLastMessage(messages[0]);
  }

  closeThreadedMessage = () => {
    this.setState({ threadmessageview: false, viewdetailscreen: false });
  }

  /*
  Updating parent message of threaded conversation, when the message is edited or deleted
  */
  updateParentThreadedMessage = (message, action) => {

    if (this.state.threadmessageview === false || message.id !== this.state.threadmessageparent.id) {
      return false;
    }

    if (action === "delete") {
      this.setState({ threadmessageparent: { ...message }, threadmessageview: false });
    } else {
      this.setState({ threadmessageparent: { ...message } });
    }

  }

  getReceiverDetails = () => {

    let receiverId;
    let receiverType;

    if (this.getContext().type === CometChat.ACTION_TYPE.TYPE_USER) {

      receiverId = this.getContext().item.uid;
      receiverType = CometChat.RECEIVER_TYPE.USER;

    } else if (this.getContext().type === CometChat.ACTION_TYPE.TYPE_GROUP) {

      receiverId = this.getContext().item.guid;
      receiverType = CometChat.RECEIVER_TYPE.GROUP;
    }

    return { "receiverId": receiverId, "receiverType": receiverType };
  }

  audioCall = () => {

    const { receiverId, receiverType } = this.getReceiverDetails();
    const call = new CometChat.Call(receiverId, CometChat.CALL_TYPE.AUDIO, receiverType);
    CometChat.initiateCall(call).then(outgoingCall => {

      //when this component is part of chat widget trigger an event.. (outgoingcall component is used separately in chat widget)
      if (Object.keys(this.props.widgetsettings).length) {

        this.props.actionGenerated(enums.ACTIONS["START_AUDIO_CALL"], outgoingCall);

      } else {

        this.outgoingCallRef.startCall(outgoingCall);
        this.appendCallMessage(outgoingCall);
      }

    }).catch(error => {
      const errorCode = (error && error.hasOwnProperty("code")) ? error.code : "ERROR";
      this.getContext().setToastMessage("error", errorCode);
    });
  }

  videoCall = () => {

    /*
    Direct calling for groups
    */
    if (this.getContext().type === CometChat.RECEIVER_TYPE.GROUP) {

      if (Object.keys(this.props.widgetsettings).length) {
        this.props.actionGenerated(enums.ACTIONS["START_DIRECT_CALL"]);
      } else {
        const sessionID = (this.getContext().type === CometChat.ACTION_TYPE.TYPE_GROUP) ? this.getContext().item.guid : null;
        this.outgoingDirectCallRef.startCall(sessionID);
      }
      return;
    }

    /*
    Default calling for one-on-one
    */
    const { receiverId, receiverType } = this.getReceiverDetails();
    const call = new CometChat.Call(receiverId, CometChat.CALL_TYPE.VIDEO, receiverType);
    CometChat.initiateCall(call).then(outgoingCall => {

      //when this component is part of chat widget trigger an event.. (outgoingcall component is used separately in chat widget)
      if (Object.keys(this.props.widgetsettings).length) {

        this.props.actionGenerated(enums.ACTIONS["START_VIDEO_CALL"], outgoingCall);

      } else {

        this.outgoingCallRef.startCall(outgoingCall);
      }

    }).catch(error => {
      const errorCode = (error && error.hasOwnProperty("code")) ? error.code : "ERROR";
      this.getContext().setToastMessage("error", errorCode);
    });
  }

  toggleReaction = (flag) => {
    this.setState({ liveReaction: flag });
  }

  showReaction = (reaction) => {

    if (reaction.metadata.type === enums.CONSTANTS["METADATA_TYPE_LIVEREACTION"]) {

      this.reactionName = reaction.metadata.reaction;
      this.setState({ liveReaction: true });
    }
  }

  deleteMessage = (message) => {

    const messageId = message.id;
    CometChat.deleteMessage(messageId).then(deletedMessage => {

      //remove edit preview when message is deleted
      if (deletedMessage.id === this.state.messageToBeEdited.id) {
        this.setState({ messageToBeEdited: "" });
      }

      this.removeMessages([deletedMessage]);

      const messageList = [...this.state.messageList];
      let messageKey = messageList.findIndex(m => m.id === message.id);

      this.updateParentThreadedMessage(deletedMessage, "delete");

      if (messageList.length - messageKey === 1 && !message.replyCount) {
        this.getContext().setLastMessage(deletedMessage);
      }

    }).catch(error => {
      const errorCode = (error && error.hasOwnProperty("code")) ? error.code : "ERROR";
      this.getContext().setToastMessage("error", errorCode);
    });
  }

  editMessage = (message) => {
    this.setState({ messageToBeEdited: message, replyPreview: null });
  }

  messageEdited = (message) => {

    const messageList = [...this.state.messageList];
    let messageKey = messageList.findIndex(m => m.id === message.id);
    if (messageKey > -1) {

      const messageObj = messageList[messageKey];

      const newMessageObj = Object.assign({}, messageObj, message);

      messageList.splice(messageKey, 1, newMessageObj);
      this.updateMessages(messageList);

      this.updateParentThreadedMessage(newMessageObj, "edit");

      if (messageList.length - messageKey === 1 && !message.replyCount) {
        this.getContext().setLastMessage(newMessageObj);
      }

    }
  }

  messageSent = (message) => {

    const messageList = [...this.state.messageList];

    let messageKey = messageList.findIndex(m => m._id === message._id);
    if (messageKey > -1) {

      const newMessageObj = { ...message };

      messageList.splice(messageKey, 1, newMessageObj);
      messageList.sort((a, b) => a.id - b.id);
      this.setState({ messageList: messageList, scrollToBottom: true });
    }
  }

  refreshingMessages = () => {

    this.setState({ messageList: [], messageToBeEdited: "", replyPreview: null, liveReaction: false, messageToReact: null });
    this.getContext().clearUnreadMessages();
  }

  messageRefreshed = (messages) => {

    const messageList = [...messages];
    this.setState({ messageList: messageList, scrollToBottom: true });
  }

  newMessagesArrived = (newMessage) => {

    this.getContext().setUnreadMessages(newMessage);
  }

  markMessagesAsRead = (scrollToBottom) => {

    if (this.getContext().unreadMessages.length === 0) {
      return false;
    }

    let unreadMessages = [...this.getContext().unreadMessages];
    let messageList = [...this.state.messageList];

    unreadMessages.forEach(unreadMessage => {

      if (unreadMessage.getReceiverType() === CometChat.RECEIVER_TYPE.USER) {

        if (this.messageListRef) {

          messageList.push(unreadMessage);
          this.messageListRef.markMessageAsRead(unreadMessage, CometChat.ACTION_TYPE.TYPE_USER);
        }

      } else if (unreadMessage.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP) {

        if (this.messageListRef) {

          messageList.push(unreadMessage);
          this.messageListRef.markMessageAsRead(unreadMessage, CometChat.ACTION_TYPE.TYPE_GROUP);
        }
      }
    });

    this.getContext().clearUnreadMessages();
    //this.props.actionGenerated("unreadMessages", []);

    this.setState({ messageList: messageList, scrollToBottom: scrollToBottom });
  }

  jumpToMessages = () => {

    if (this.getContext().unreadMessages.length === 0) {
      return false;
    }

    let unreadMessages = [...this.getContext().unreadMessages]
    let messageList = [...this.state.messageList];
    messageList = messageList.concat(unreadMessages);

    this.getContext().clearUnreadMessages();
    this.getContext().setClearedUnreadMessages(true);

    if (messageList.length > enums.CONSTANTS["MAX_MESSAGE_COUNT"]) {

      if (this.messageListRef) {
        this.messageListRef.reInitializeMessageBuilder();
      }

    } else {
      this.markMessagesAsRead(true);
    }
  }

  //messages are deleted
  removeMessages = (messages) => {

    const deletedMessage = messages[0];
    const messagelist = [...this.state.messageList];

    let messageKey = messagelist.findIndex(message => message.id === deletedMessage.id);
    if (messageKey > -1) {

      let messageObj = { ...messagelist[messageKey] };
      let newMessageObj = Object.assign({}, messageObj, deletedMessage);

      messagelist.splice(messageKey, 1, newMessageObj);
      this.setState({ messageList: messagelist, scrollToBottom: false });
    }
  }

  //messages are fetched from backend
  prependMessages = (messages) => {

    const messageList = [...messages, ...this.state.messageList];
    this.setState({ messageList: messageList, scrollToBottom: false });
  }

  //message is received or composed & sent
  appendMessage = (message) => {

    let messages = [...this.state.messageList, ...message];
    this.setState({ messageList: messages, scrollToBottom: true });
  }

  //message status is updated
  updateMessages = (messages) => {
    this.setState({ messageList: messages, scrollToBottom: false });
  }

  groupUpdated = (action, message, group, options) => {

    if (validateWidgetSettings(this.props.widgetsettings, "hide_join_leave_notifications") !== true) {
      this.appendMessage([message]);
    }

    this.props.actionGenerated(action, message, group, options);
  }

  appendCallMessage = (message) => {

    //if call actions messages are disabled in chat widget
    if (validateWidgetSettings(this.props.widgetsettings, "show_call_notifications") === false) {
      return false;
    }

    this.appendMessage([message]);
  }

  updateReplyCount = (messages) => {

    const receivedMessage = messages[0];

    let messageList = [...this.state.messageList];
    let messageKey = messageList.findIndex(m => m.id === receivedMessage.parentMessageId);
    if (messageKey > -1) {

      const messageObj = messageList[messageKey];
      let replyCount = (messageObj.hasOwnProperty("replyCount")) ? messageObj.replyCount : 0;
      replyCount = replyCount + 1;
      const newMessageObj = Object.assign({}, messageObj, { "replyCount": replyCount });

      messageList.splice(messageKey, 1, newMessageObj);
      this.setState({ messageList: messageList, scrollToBottom: false });
    }
  }

  smartReplyPreview = (messages) => {

    const message = messages[0];
    if (message.sender.uid === this.loggedInUser.uid || message.category === CometChat.CATEGORY_CUSTOM) {
      return false;
    }

    const smartReplyData = checkMessageForExtensionsData(message, "smart-reply");
    if (smartReplyData && smartReplyData.hasOwnProperty("error") === false) {
      this.setState({ replyPreview: message });
    } else {
      this.setState({ replyPreview: null });
    }
  }

  clearEditPreview = () => {
    this.setState({ messageToBeEdited: "" });
  }

  reactToMessage = (message) => {

    this.setState({ "messageToReact": message });

    if (this.composerRef) {
      this.composerRef.toggleEmojiPicker();
    }
  }

  render() {

    /**
     * If used as standalone component
     */
    if (this.props._parent.trim().length === 0 && this.props.chatWithUser.trim().length === 0 && this.props.chatWithGroup.trim().length === 0) {
      return (
        <CometChatContextProvider
          ref={el => this.contextProviderRef = el}
          _component={enums.CONSTANTS["MESSAGES_COMPONENT"]}
          user={this.props.chatWithUser}
          group={this.props.chatWithGroup}>
          <div></div>
        </CometChatContextProvider>
      );
    } else if (this.props._parent.trim().length && Object.keys(this.getContext().item).length === 0) {
      return null;
    }

    let messageComposer = (
      <CometChatMessageComposer
        ref={el => { this.composerRef = el; }}
        theme={this.props.theme}
        lang={this.state.lang}
        widgetsettings={this.props.widgetsettings}
        messageToBeEdited={this.state.messageToBeEdited}
        replyPreview={this.state.replyPreview}
        reaction={this.reactionName}
        messageToReact={this.state.messageToReact}
        actionGenerated={this.actionHandler} />
    );

    let newMessageIndicator = null;
    if (this.getContext()?.unreadMessages.length) {

      const unreadMessageCount = this.getContext().unreadMessages.length;
      const messageText = (unreadMessageCount > 1) ? `${unreadMessageCount} ${Translator.translate("NEW_MESSAGES", this.state.lang)}` : `${unreadMessageCount} ${Translator.translate("NEW_MESSAGE", this.state.lang)}`;
      newMessageIndicator = (
        <div css={messagePaneTopStyle()} className="message_pane__top">
          <div css={messagePaneBannerStyle(this.props)} className="message_pane__banner">
            <div css={messagePaneUnreadBannerStyle()} className="message_pane__unread_banner__banner" title={Translator.translate("JUMP", this.state.lang)}>
              <button type="button" css={messagePaneUnreadBannerMessageStyle(this.props)} className="message_pane__unread_banner__msg" onClick={this.jumpToMessages}>
                <span css={iconArrowDownStyle()} className="icon--arrow-down">&#x2193; </span>{messageText}
              </button>
            </div>
          </div>
        </div>
      );
    }

    //if sending messages are disabled for chat wigdet in dashboard
    if (validateWidgetSettings(this.props.widgetsettings, "enable_sending_messages") === false) {
      messageComposer = null;
    }

    let liveReactionView = null;
    if (this.state.liveReaction) {
      liveReactionView = (
        <div css={reactionsWrapperStyle()}>
          <CometChatLiveReactions reaction={this.reactionName} theme={this.props.theme} lang={this.state.lang} />
        </div>
      );
    }

    /*
    If used as a standalone component
    */
    let incomingCallView = null;
    let incomingDirectCallView = null;
    if (this.props._parent.trim().length === 0) {
      incomingCallView = (
        <CometChatIncomingCall
          theme={this.props.theme}
          lang={this.state.lang}
          actionGenerated={this.actionHandler} />
      );

      incomingDirectCallView = (
        <CometChatIncomingDirectCall
          theme={this.props.theme}
          lang={this.state.lang}
          actionGenerated={this.actionHandler} />
      );
    }

    //don't include it when opened in chat widget
    let outgoingDirectCallView = null; let outgoingCallView = null;
    if (Object.keys(this.props.widgetsettings).length === 0) {

      outgoingCallView = (
        <CometChatOutgoingCall
          ref={el => this.outgoingCallRef = el}
          theme={this.props.theme}
          lang={this.state.lang}
          actionGenerated={this.actionHandler} />
      );

      outgoingDirectCallView = (
        <CometChatOutgoingDirectCall
          ref={el => this.outgoingDirectCallRef = el}
          theme={this.props.theme}
          lang={this.state.lang}
          actionGenerated={this.actionHandler} />
      );
    }

    let detailScreen = null;
    if (this.state.viewdetailscreen) {

      if (this.getContext().type === CometChat.ACTION_TYPE.TYPE_USER) {

        detailScreen = (
          <div css={chatSecondaryStyle(this.props)} className="chat__secondary-view">
            <CometChatUserDetails
              theme={this.props.theme}
              lang={this.state.lang}
              actionGenerated={this.actionHandler} />
          </div>
        );

      } else if (this.getContext().type === CometChat.ACTION_TYPE.TYPE_GROUP) {

        detailScreen = (
          <div css={chatSecondaryStyle(this.props)} className="chat__secondary-view">
            <CometChatGroupDetails
              theme={this.props.theme}
              lang={this.state.lang}
              actionGenerated={this.actionHandler} />
          </div>
        );
      }
    }

    let threadMessageView = null;
    if (this.state.threadmessageview) {
      threadMessageView = (
        <div css={chatSecondaryStyle(this.props)} className="chat__secondary-view">
          <CometChatMessageThread
            theme={this.props.theme}
            activeTab={this.state.activeTab}
            threadItem={this.state.threadmessageitem}
            threadType={this.state.threadmessagetype}
            parentMessage={this.state.threadmessageparent}
            loggedInUser={this.loggedInUser}
            lang={this.state.lang}
            widgetsettings={this.props.widgetsettings}
            actionGenerated={this.actionHandler} />
        </div>
      );
    }

    let originalImageView = null;
    if (this.state.viewOriginalImage) {
      originalImageView = (
        <CometChatImageViewer
          close={() => this.toggleOriginalImageView(false)}
          message={this.state.viewOriginalImage}
          lang={this.state.lang} />
      );
    }

    let messageComponent = (
      <React.Fragment>
        <div css={chatWrapperStyle(this.props, this.state)} className="main__chat" dir={Translator.getDirection(this.state.lang)}>
          <CometChatMessageHeader
            sidebar={this.props.sidebar}
            theme={this.props.theme}
            lang={this.state.lang}
            viewdetail={this.props.viewdetail === false ? false : true}
            audiocall={this.props.audiocall === false ? false : true}
            videocall={this.props.videocall === false ? false : true}
            widgetsettings={this.props.widgetsettings}
            actionGenerated={this.actionHandler} />
          <CometChatMessageList
            ref={(el) => { this.messageListRef = el; }}
            theme={this.props.theme}
            messages={this.state.messageList}
            lang={this.state.lang}
            scrollToBottom={this.state.scrollToBottom}
            messageconfig={this.props.messageconfig}
            widgetsettings={this.props.widgetsettings}
            widgetconfig={this.props.widgetconfig}
            actionGenerated={this.actionHandler} />
          {liveReactionView}
          {messageComposer}
          {newMessageIndicator}
        </div>
        {originalImageView}
        {detailScreen}
        {threadMessageView}
        {incomingCallView}
        {outgoingCallView}
        {incomingDirectCallView}
        {outgoingDirectCallView}
      </React.Fragment>
    );

    let messageWrapper = messageComponent;
    /*
    If used as a standalone component
    **/
    if (this.props._parent.trim().length === 0) {

      messageWrapper = (
        <CometChatContextProvider ref={el => this.contextProviderRef = el} user={this.props.chatWithUser} group={this.props.chatWithGroup}>
          <div css={chatContainerStyle()}>
            {messageComponent}
          </div>
        </CometChatContextProvider>
      );

    }

    return (messageWrapper);
  }
}

// Specifies the default values for props:
CometChatMessages.defaultProps = {
  lang: Translator.getDefaultLanguage(),
  theme: theme,
  _parent: "",
  widgetsettings: {},
  chatWithUser: "",
  chatWithGroup: "",
};

CometChatMessages.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.object,
  _parent: PropTypes.string,
  widgetsettings: PropTypes.object,
  chatWithUser: PropTypes.string,
  chatWithGroup: PropTypes.string
}

export default CometChatMessages;
