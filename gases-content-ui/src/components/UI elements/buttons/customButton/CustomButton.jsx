import React from 'react';
import classes from './CustomButton.module.scss';

const CustomButton = ({children}) => {
    return (
        <button className={classes.button_submit}>
            {children}
        </button>
    );
};

export default CustomButton;