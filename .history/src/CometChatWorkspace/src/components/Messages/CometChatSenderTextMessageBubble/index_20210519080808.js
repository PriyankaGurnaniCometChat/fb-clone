import React from "react";
import twemoji from "twemoji";
import ReactHtmlParser from "react-html-parser";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import PropTypes from "prop-types";

import { CometChat } from "@cometchat-pro/chat";

import { CometChatMessageActions, CometChatThreadedMessageReplyCount, CometChatReadReceipt, CometChatLinkPreview } from "../";
import { CometChatMessageReactions } from "../Extensions";

import { CometChatContext } from "../../../util/CometChatContext";
import { linkify, checkMessageForExtensionsData, validateWidgetSettings } from "../../../util/common";
import * as enums from "../../../util/enums.js";

import Translator from "../../../resources/localization/translator";
import { theme } from "../../../resources/theme";

import {
  messageContainerStyle,
  messageWrapperStyle,
  messageTxtWrapperStyle,
  messageTxtStyle,
  messageInfoWrapperStyle,
  messageReactionsWrapperStyle,
} from "./style";

class CometChatSenderTextMessageBubble extends React.Component {

  static contextType = CometChatContext;
  messageFrom = "sender";

  constructor(props) {

    super(props);

    this.messageTextRef = React.createRef();

    const message = Object.assign({}, props.message, { messageFrom: this.messageFrom });

    this.state = {
      message: message,
      translatedMessage: "",
      isHovering: false
    }
  }

  componentDidUpdate(prevProps) {

    if (prevProps.message !== this.props.message) {
      const message = Object.assign({}, this.props.message, { messageFrom: this.messageFrom });
      this.setState({ message: message, translatedMessage: "" })
    }
  }

  getMessageText = () => {

    let messageText = this.state.message.text;

    //xss extensions data
    const xssData = checkMessageForExtensionsData(this.state.message, "xss-filter");
    if (xssData
      && xssData.hasOwnProperty("sanitized_text")
      && xssData.hasOwnProperty("hasXSS")
      && xssData.hasXSS === "yes") {
      messageText = xssData.sanitized_text;
    }

    //datamasking extensions data
    const maskedData = checkMessageForExtensionsData(this.state.message, "data-masking");
    if (maskedData
      && maskedData.hasOwnProperty("data")
      && maskedData.data.hasOwnProperty("sensitive_data")
      && maskedData.data.hasOwnProperty("message_masked")
      && maskedData.data.sensitive_data === "yes") {
      messageText = maskedData.data.message_masked;
    }

    //profanity extensions data
    const profaneData = checkMessageForExtensionsData(this.state.message, "profanity-filter");
    if (profaneData
      && profaneData.hasOwnProperty("profanity")
      && profaneData.hasOwnProperty("message_clean")
      && profaneData.profanity === "yes") {
      messageText = profaneData.message_clean;
    }

    const formattedText = linkify(messageText);

    const emojiParsedMessage = twemoji.parse(formattedText, {
      folder: "svg", ext: ".svg", callback: (icon, options) => {

        //console.log(icon, options);
        //const imgUrl = options.base + '/' + options.folder + '/' + icon + options.ext; console.log(imgUrl);
        //return "<img class='emoji' draggable='false' src='" + imgUrl +"' alt='"+imgUrl+"' />";



        return ''.concat(
          options.base, // by default Twitter Inc. CDN
          options.size, // by default "36x36" string
          '/',
          icon,         // the found emoji as code point
          options.ext   // by default ".png"
        );

      }
    });



    const parsedMessage = ReactHtmlParser(emojiParsedMessage, { decodeEntities: false });

    const emojiMessage = parsedMessage.filter(message => (message instanceof Object && message.type === "img"));

    let showVariation = true;
    //if larger size emojis are disabled in chat widget
    if (validateWidgetSettings(this.props.widgetsettings, "show_emojis_in_larger_size") === false) {
      showVariation = false;
    }

    messageText = (
      <div css={messageTxtWrapperStyle(this.props)} className="message__txt__wrapper">
        <p css={messageTxtStyle(this.props, parsedMessage, emojiMessage, showVariation)} className="message__txt">{parsedMessage}{this.state.translatedMessage}</p>
      </div>
    );

    return messageText;
  }

  translateMessage = (message) => {

    const messageId = message.id;
    const messageText = message.text;
    const translateToLanguage = Translator.getBrowserLanguage();

    let translatedMessage = "";

    CometChat.callExtension('message-translation', 'POST', 'v2/translate', {
      "msgId": messageId,
      "text": messageText,
      "languages": [translateToLanguage]
    }).then(result => {

      if (result.hasOwnProperty("language_original") && result["language_original"] !== translateToLanguage) {

        if (result.hasOwnProperty("translations") && result.translations.length) {

          const messageTranslation = result.translations[0];
          if (messageTranslation.hasOwnProperty("message_translated")) {

            translatedMessage = `\n(${messageTranslation["message_translated"]})`;
          }
        } else {
          this.context.setToastMessage("error", "MESSAGE_TRANSLATE_FAIL");
        }
      } else {
        this.context.setToastMessage("info", "MESSAGE_TRANSLATE_SAME_LANGUAGE");
      }

      this.setState({ translatedMessage: translatedMessage })

    }).catch(error => {
      let errorCode = "ERROR";
      if (error.hasOwnProperty("code")) {

        errorCode = error.code;
        if (error.code === enums.CONSTANTS.ERROR_CODES["ERR_CHAT_API_FAILURE"]
          && error.hasOwnProperty("details")
          && error.details.hasOwnProperty("code")) {
          errorCode = error.details.code;
        }
      }
      this.context.setToastMessage("error", errorCode);
    });
  }

  handleMouseHover = () => {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState = (state) => {

    return {
      isHovering: !state.isHovering,
    };
  }

  render() {

    let messageText = this.getMessageText();

    //linkpreview extensions data
    const linkPreviewData = checkMessageForExtensionsData(this.state.message, "link-preview");
    if (linkPreviewData && linkPreviewData.hasOwnProperty("links") && linkPreviewData["links"].length) {

      messageText = (
        <CometChatLinkPreview {...this.props} message={this.state.message} messageText={messageText} />
      );
    }

    //messagereactions extensions data
    let messageReactions = null;
    const reactionsData = checkMessageForExtensionsData(this.state.message, "reactions");
    if (reactionsData) {

      if (Object.keys(reactionsData).length) {
        messageReactions = (
          <div css={messageReactionsWrapperStyle()} className="message__reaction__wrapper">
            <CometChatMessageReactions  {...this.props} message={this.state.message} reaction={reactionsData} />
          </div>
        );
      }
    }

    let toolTipView = null;
    if (this.state.isHovering) {
      toolTipView = (<CometChatMessageActions {...this.props} message={this.state.message} translateMessage={this.translateMessage} />);
    }

    return (
      <div
        css={messageContainerStyle()}
        className="sender__message__container message__text"
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}>

        {toolTipView}
        <div css={messageWrapperStyle()} className="message__wrapper" ref={this.messageTextRef}>{messageText}</div>

        {messageReactions}

        <div css={messageInfoWrapperStyle()} className="message__info__wrapper">
          <CometChatThreadedMessageReplyCount {...this.props} message={{ ...this.state.message }} />
          <CometChatReadReceipt {...this.props} message={this.state.message} />
        </div>
      </div>
    );
  }
}

// Specifies the default values for props:
CometChatSenderTextMessageBubble.defaultProps = {
  theme: theme
};

CometChatSenderTextMessageBubble.propTypes = {
  theme: PropTypes.object
}

export default CometChatSenderTextMessageBubble;
