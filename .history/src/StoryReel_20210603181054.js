import React from 'react';
import Story from "./Story"
import "./StoryReel.css";
import db from "./firebase";


function StoryReel({ image, profileSrc, title }) {
    return (
        <div className="storyReel">
            <Story image={image}
                profileSrc={profileSrc}
                title={title} />

            <Story image={image}
                profileSrc={profileSrc}
                title={title} />

            <Story image={image}
                profileSrc={profileSrc}
                title={title} />

            <Story image={image}
                profileSrc={profileSrc}
                title={title} />


            <Story image={image}
                profileSrc={profileSrc}
                title={title} />

            <Story image={image}
                profileSrc={profileSrc}
                title={title} />



        </div>
    );
};

export default StoryReel;