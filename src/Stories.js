import React, { useState, useEffect } from 'react';
import { useFetch } from './hooks';

const Story = story => {
    const { id, by, time, title, url } = story;
    return (
        <div key={id}>
            <a href={url} title={title}>{title}</a>
            <div>{by} - {new Date(time * 1000).toLocaleString()}</div>
        </div>
    );
};

function Stories() {
    const URL = 'https://news-proxy-server.appspot.com/topstories';
    const stories = useFetch(URL, [], 'stories'); // url, initial value, local cache key

    return (
        <div>
            <h3>Stories</h3>
            {
                stories.map(Story)
            }
        </div>
    );
}

export default Stories;
