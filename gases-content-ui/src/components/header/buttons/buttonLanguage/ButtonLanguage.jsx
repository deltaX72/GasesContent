import React from 'react';
import classes from './ButtonLanguage.module.scss';

const ButtonLanguage = ({...props}) => {
    let darkClass;
    props.darkmode ? darkClass = classes.dark : darkClass = '';
    return (
        <button {...props} className={`${classes.language_styles} ${classes.button} ${darkClass}`}/>
    );
};

export default ButtonLanguage;