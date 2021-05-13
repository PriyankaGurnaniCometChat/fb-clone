import React from 'react';
import StoryReel from "./StoryReel";

function Feed() {
    return (
        <div className="feed">
            <p>this is the feed</p>
            <StoryReel />
            <p>hello from storyreel inside feed</p>

        </div>
    );
};

export default Feed;