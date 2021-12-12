import React from 'react';
import classes from './CustomRadio.module.scss';

const CustomRadio = ({children, ...props}) => {
    return (
        <div className={props.size === 'full' ? `${classes.container_style} ${classes.full}` : classes.container_style}>
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