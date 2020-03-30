import React, { useState, useEffect } from 'react';

function Joke() {
    const [joke, setJoke] = useState({});

    // fires after every render
    useEffect(() => {
        fetch('https://official-joke-api.appspot.com/jokes/random')
        .then(response => response.json())
        .then(json => {
            console.log('json:', json);
            // setJoke(json); // will cause re-render, which will call useEffect(), infinite loop
            setJoke(json);
        });
    }, []); // [] means it only files after initial mount

    const { setup, punchline } = joke;

    return (
        <div>
            <h3>Joke</h3>
            <p>{setup}</p>
            <p><em>{punchline}</em></p>
        </div>
    );
}

export default Joke;