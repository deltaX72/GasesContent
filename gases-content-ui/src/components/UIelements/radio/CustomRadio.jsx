import React from 'react';
import classes from './CustomRadio.module.scss';

const CustomRadio = ({children, ...props}) => {
    let darkClass;
    props.darkmode ?  darkClass = classes.dark : darkClass = '';
    return (
        <div className={props.size === 'full' ? `${classes.container_style} ${classes.full} ${darkClass}` : `${classes.container_style} ${darkClass}`}>
            <input
                id={props.id}
                name={props.name}
                className={classes.radio_style}
                defaultChecked={props.checked}
                type="radio"
            />
            <label htmlFor={props.id}>{children}</label>
        </div>
    );
};

export default CustomRadio;