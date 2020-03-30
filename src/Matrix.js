import React, { useState, useEffect } from 'react';
import MATRIX from './data/matrix';

const DELAY = 50;
console.log('MATRIX.length:', MATRIX.length);

const Matrix = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex(value => {
                return (value + 1) % MATRIX.length;
            });
        }, DELAY);

        return () => clearInterval(id);
    }, []);

    return (
        <div>
            <img src={MATRIX[index]} />
        </div>
    )
}

export default Matrix;