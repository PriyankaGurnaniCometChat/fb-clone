import React from 'react';
import "./MessageSender.css";
import { Avatar } from "@material-ui/core"

const MessageSender = () => {
    return (
        <div className="messageSender">
            <div className="messageSender__top">
                <Avatar />
                <form>
                    <input type="text"
                        placeholder={"What's on your mind"} />
                    <input placeholder="image URl (Optional)" />
                </form>

            </div>
            <div className="messageSender__bottom">


            </div>


        </div>
    );
};

export default MessageSender;