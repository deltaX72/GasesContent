import React from 'react';
import classes from './CustomButton.module.scss';

const CustomButton = ({children, ...props}) => {
    let darkClass;
    props.darkmode ?  darkClass = classes.dark : darkClass = '';

    return (
        <button className={`${classes.button_submit} ${darkClass}`}>
            {children}
        </button>
    );
};

export default CustomButton;