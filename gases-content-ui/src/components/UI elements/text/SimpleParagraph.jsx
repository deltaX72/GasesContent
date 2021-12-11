import React from 'react';
import classes from './SimpleParagraph.module.scss';

const SimpleParagraph = ({children, ...props}) => {
    return (
        <div className={props.size === 'half' ? `${classes.simple_paragraph} ${classes.half}` : classes.simple_paragraph}>
            {children}
        </div>
    );
};

export default SimpleParagraph;