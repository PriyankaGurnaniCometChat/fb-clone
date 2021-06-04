import React, { useEffect } from 'react';
import Story from "./Story"
import "./StoryReel.css";
import db from "./firebase"

function StoryReel({ image, profileSrc, title }) {
    useEffect(() => {
        db.collection('storyreel').orderBy("timestamp", "desc").onSnapshot(snapshot => (
            setstoryreel(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
            )))
    })
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