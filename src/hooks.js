import { useState, useEffect } from 'react';
import LocalCache from './LocalCache';

export const useSavedState = (key, defaultValue) => {
    const s = localStorage.getItem(key);
    const initialValue = s !== null ? JSON.parse(s) : defaultValue;
    let [value, setter] = useState(initialValue);
    return [value, v => {
        if (typeof (v) === 'function') {
            // function takes most recent value and returns new value
            const newValue = v(value);
            LocalCache.set(key, newValue);
            return setter(newValue);
        } else {
            // value set directly
            LocalCache.set(key, v);
            return setter(v)
        }
    }];
}
export const useFetch = (url, initialValue) => {
    const [result, setResult] = useState(initialValue);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => setResult(json));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return result;
}

export const useSavedFetch = (url, initialValue, key) => {
    const [result, setResult] = useSavedState(key, initialValue);
    let setter = key ? value => LocalCache.set(key, value) : value => { };

    // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                setter(json);
                setResult(json);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return result;
}
