import React from 'react';
import { useSavedFetch } from './hooks';

const DEFAULT_JOKE = {};

function Joke() {
    const URL = 'https://official-joke-api.appspot.com/jokes/random';
    const { setup, punchline } = useSavedFetch(URL, DEFAULT_JOKE, 'joke');

    return (
        <div>
            <h3>Joke</h3>
            <p>{setup}</p>
            <p><em>{punchline}</em></p>
        </div>
    );
}

export default Joke;