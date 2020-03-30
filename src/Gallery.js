import React, { useState, useEffect } from 'react';
import PICTURES from './data/pictures';

const Gallery = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex(storedIndex => {
                return (storedIndex + 1) % PICTURES.length;
            });
        }, 3000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="Gallery">
            <img src={PICTURES[index].image} alt="gallery"/>
        </div>
    )
}

export default Gallery;