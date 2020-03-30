import { useState, useEffect } from 'react';
import LocalCache from './LocalCache';

export const useFetch = (url, initialValue, key) => {
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
    }, [url, key]);

    return result;
}

// export const useSavedState = (key, defaultValue) => {
//     const initialValue = LocalCache.get(key, defaultValue);
//     let [value, setter] = useState(initialValue);
//     return [value, v => {
//         LocalCache.set(key, v);
//         setter(v);
//     }];
// }


export const useSavedState = (key, defaultValue) => {
    const initialValue = JSON.parse(localStorage.getItem(key)) || defaultValue;
    let [value, setter] = useState(initialValue);
    return [value, v => {
        localStorage.setItem(key, JSON.stringify(v));
        setter(v);
    }];
}
