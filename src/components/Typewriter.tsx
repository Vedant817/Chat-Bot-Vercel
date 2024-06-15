"use client"
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

const Typewriter = ({ text, speed = 150, pauseDuration = 2000, className = '' }: {text: string, speed: number, pauseDuration: number, className: string}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        if (isTyping && index < text.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText(prev => prev + text.charAt(index));
                setIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeoutId);
        } else if (index === text.length) {
            setIsTyping(false);
            const timeoutId = setTimeout(() => {
                setDisplayedText('');
                setIndex(0);
                setIsTyping(true);
            }, pauseDuration);
            return () => clearTimeout(timeoutId);
        }
    }, [index, text, speed, isTyping, pauseDuration]);

    return (
        <div className={`text-2xl font-mono text-white ${className}`}>
            {displayedText}<span className="animate-pulse">|</span>
        </div>
    );
};

Typewriter.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number,
    pauseDuration: PropTypes.number,
    className: PropTypes.string,
};

export default Typewriter;
