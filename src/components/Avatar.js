import React from 'react';
import { useSelector } from 'react-redux';

const Avatar = ({ src, size }) => {
    const { theme } = useSelector(state => state)
    return (
        <div>
            <img src={src} alt="small-avatar" className={`${size}`} style={{ filter: `${theme ? "invert(1)" : "invert(0)"} ` }} />

        </div>
    );
};

export default Avatar;