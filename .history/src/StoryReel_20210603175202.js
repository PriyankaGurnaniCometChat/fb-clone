import React, { useEffect, useState } from 'react';
import Story from "./Story"
import "./StoryReel.css";
import db from "./firebase"

function StoryReel({ image, profileSrc, title }) {
    const [storyReel, setStoryReel] = useState([]);
    useEffect(() => {
        db.collection('storyreel').orderBy("timestamp", "desc").onSnapshot(snapshot => (
            setStoryReel(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
            )))
    })
    return (
        <div className="storyReel">
            {storyReel.map(storyreel => (
                <Story
                    key={storyreel.id}
                    image={storyreel.image}
                    profileSrc={storyreel.profileSrc}
                    title={storyreel.title} />
            ))}


        </div>
    );
};

export default StoryReel;