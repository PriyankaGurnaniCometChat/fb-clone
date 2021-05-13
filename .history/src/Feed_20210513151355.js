import React from 'react';
import MessageSender from './MessageSender';
import StoryReel from "./StoryReel";


function Feed() {
    return (
        <div className="feed">
            <StoryReel />
            <MessageSender />
            <Post />
            <Post />
            <Post />

        </div>
    );
};

export default Feed;