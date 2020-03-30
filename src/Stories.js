import React, { useState, useEffect } from 'react';
import LocalCache from './LocalCache';

const Story = story => {
    return (
        <p key={story.id}><a href={story.url}>{story.title}</a></p>
    );
};

const getStories = stories => {
    return stories.map(Story);
};

function Stories() {
    const [stories, setStories] = useState(LocalCache.get('stories', []));

    useEffect(() => {
        fetch('https://news-proxy-server.appspot.com/topstories')
        .then(response => response.json())
        .then(json => {
            LocalCache.set('stories', json);
            setStories(json);
        })
    }, []); // update only once

    return (
        <div>
            <h3>Stories</h3>
            {getStories(stories)}
        </div>
    );
}

export default Stories;
