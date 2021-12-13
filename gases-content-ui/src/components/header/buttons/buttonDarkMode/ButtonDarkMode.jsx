import React from 'react';
import classes from './ButtonDarkMode.module.scss';

const ButtonDarkMode = ({...props}) => {
    let darkClass;
    props.darkmode ?  darkClass = classes.dark : darkClass = '';
    return (
        <button {...props} className={`${classes.dark_mode_styles} ${classes.button} ${darkClass}`}/>
    );
};

export default ButtonDarkMode;