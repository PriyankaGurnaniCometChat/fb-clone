import React from 'react';
import Story from "./Story"
import "./StoryReel.css";

function StoryReel({ image, profileSrc, title }) {
    return (
        <div className="storyReel">
            {storyreel.map(storyreel => (
                <Story
                    key={storyreel.id}
                    image={storyreel.data.image}
                    profileSrc={storyreel.data.profileSrc}
                    title={storyreel.data.title} />
            ))}


        </div>
    );
};

export default StoryReel;