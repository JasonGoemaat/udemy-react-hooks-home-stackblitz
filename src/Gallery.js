import React, { useState, useEffect } from 'react';
import PICTURES from './data/pictures';

const SECONDS = 1000;
const MIN_DELAY = 1 * SECONDS;

const Gallery = () => {
    const [index, setIndex] = useState(0);
    const [delay, setDelay] = useState(3 * SECONDS);

    useEffect(() => {
        console.log('delay', delay);

        const id = setInterval(() => {
            setIndex(storedIndex => {
                return (storedIndex + 1) % PICTURES.length;
            });
        }, delay);
        return () => clearInterval(id);
    }, [delay]);

    const updateDelay = event => {
        setDelay(Math.max(Number(event.target.value) * SECONDS, MIN_DELAY));
    }

    return (
        <div className="Gallery">
            <img src={PICTURES[index].image} alt="gallery"/>
            <div className="multiform">
                <div>
                    Gallery transition delay (seconds):
                    <input type="number" onChange={updateDelay} />
                </div>
            </div>
        </div>
    )
}

export default Gallery;