import React from 'react';
import classes from './SimpleParagraph.module.scss';

const SimpleParagraph = ({children}) => {
    return (
        <div className={classes.simple_paragraph}>
            {children}
        </div>
    );
};

export default SimpleParagraph;