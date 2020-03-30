import React from 'react';
import { useFetch } from './hooks';

function Joke() {
    const URL = 'https://official-joke-api.appspot.com/jokes/random';
    const { setup, punchline } = useFetch(URL, 'joke', {});

    return (
        <div>
            <h3>Joke</h3>
            <p>{setup}</p>
            <p><em>{punchline}</em></p>
        </div>
    );
}

export default Joke;