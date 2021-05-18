import React, { useEffect, useState } from 'react';
import MessageSender from './MessageSender';
import StoryReel from "./StoryReel";
import Post from "./Post";
import db from "./firebase"


function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => (
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
            )))
    })

    return (
        <div className="feed">
            <StoryReel />
            <MessageSender />

            {posts.map(post => (
                <Post
                    key={post.id}
                    profilePic={post.profilePic}
                    message={post.message}
                    timestamp={post.timestamp}
                    username={post.username}
                    image={post.image}
                />
            ))}

        </div>
    );
};

export default Feed;