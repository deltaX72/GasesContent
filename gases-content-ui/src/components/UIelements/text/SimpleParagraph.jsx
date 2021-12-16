import React from 'react';
import classes from './SimpleParagraph.module.scss';

const SimpleParagraph = ({children, ...props}) => {
    let darkClass;
    props.darkmode ?  darkClass = classes.dark : darkClass = '';
    return (
        <div className={props.size === 'half' ? `${classes.simple_paragraph} ${classes.half} ${darkClass}` : `${classes.simple_paragraph} ${darkClass}`} >
            {children}
        </div>
    );
};

export default SimpleParagraph;