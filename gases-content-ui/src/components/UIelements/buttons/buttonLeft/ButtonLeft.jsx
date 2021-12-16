import React from 'react';
import classes from './ButtonLeft.module.scss';

const ButtonLeft = ({...props}) => {
    let darkClass;
    props.darkmode ?  darkClass = classes.dark : darkClass = '';
    return (
        <button className={`${classes.button} ${darkClass}`} />
    );
};

export default ButtonLeft;