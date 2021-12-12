import React from 'react';
import classes from './CustomCheckBox.module.scss';

const CustomCheckBox = ({children,...props}) => {
    return (
        <div className={classes.container_style}>
            <input
                id={props.id}
                className={classes.checkbox_style}
                defaultChecked={props.checked}
                type="checkbox"
            />
            <label htmlFor={props.id}>{children}</label>
        </div>
    );
};

export default CustomCheckBox;