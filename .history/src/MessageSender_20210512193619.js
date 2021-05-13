import React from 'react';
import "./MessageSender.css";
import { Avatar } from "@material-ui/core"
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryEcon from "@material-ui/icons/PhotoLibrary";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

const MessageSender = () => {
    const handleSubmit = e => {
        e.preventDefault();
    }
    return (
        <div className="messageSender">
            <div className="messageSender__top">
                <Avatar />
                <form>
                    <input type="text"
                        placeholder={"What's on your mind"} />
                    <input placeholder="image URl (Optional)" />
                    <button onClick={handleSubmit} type="submit">
                        Hidden Submit
                    </button>
                </form>

            </div>
            <div className="messageSender__bottom">
                <div className="messageSender__option">
                    <VideocamIcon style={{ color: "red" }} />
                    <h3>Live Video</h3>
                </div>


            </div>


        </div>
    );
};

export default MessageSender;