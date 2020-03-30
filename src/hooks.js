import { useState, useEffect } from 'react';
import LocalCache from './LocalCache';

export const useFetch = (url, initialValue, key, changes) => {
    const value = key ? LocalCache.get(key, initialValue) : initialValue;
    const [result, setResult] = useState(value);
    
    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(json => {
            if (key) {
                LocalCache.set(key, json);
            }
            setResult(json);
        });
    }, changes || []);

    return result;
};
