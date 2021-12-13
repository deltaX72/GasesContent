import React from 'react';
import classes from './ButtonRight.module.scss';

const ButtonRight = ({...props}) => {
    let darkClass;
    props.darkmode ?  darkClass = classes.dark : darkClass = '';
    return (
        <button className={`${classes.button} ${darkClass}`} />
    );
};

export default ButtonRight;