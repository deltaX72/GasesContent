import React from 'react';
import classes from './ButtonBurger.module.scss';

const ButtonBurger = ({...props}) => {
    return (
        <button {...props} className={`${classes.burger_styles} ${classes.button}`}/>
    );
};

export default ButtonBurger;