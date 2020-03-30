import React, { useState, useEffect } from 'react';
import LocalCache from './LocalCache';

function Joke() {
    const [joke, setJoke] = useState(LocalCache.get('joke', {}));
    const [count, setCount] = useState(0);
    const [minute, setMinute] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setMinute(minute + 1);
        }, 60000);
    }, [minute]);

    // fires after every render
    useEffect(() => {
        fetch('https://official-joke-api.appspot.com/jokes/random')
        .then(response => response.json())
        .then(json => {
            console.log('json:', json);
            // setJoke(json); // will cause re-render, which will call useEffect(), infinite loop
            LocalCache.set('joke', json);
            setJoke(json);
            setCount(count + 1);
        });
    }, [minute]); // [] means it only files after initial mount
    // What this really is is an array of values, if the values change, the effect will fire
    // Since the values in the array will always be the same, it will only fire once!  Let's play!

    const { setup, punchline } = joke;

    return (
        <div>
            <h3>Joke</h3>
            <p>{setup}</p>
            <p><em>{punchline}</em></p>
            <p>Effect was called {count} times</p>
        </div>
    );
}

export default Joke;