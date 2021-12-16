import React from 'react';
import classes from './ButtonBurger.module.scss';

const ButtonBurger = ({...props}) => {
    let darkClass;
    props.darkmode === true ?  darkClass = classes.dark : darkClass = '';
    return (
        <button {...props} className={`${classes.burger_styles} ${classes.button} ${darkClass}`}/>
    );
};

export default ButtonBurger;