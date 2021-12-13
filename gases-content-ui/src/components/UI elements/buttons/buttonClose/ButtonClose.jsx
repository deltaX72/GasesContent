import React from 'react';
import classes from './ButtonClose.module.scss';

const ButtonClose = ({...props}) => {
    let darkClass;
    props.darkmode === true ?  darkClass = classes.dark : darkClass = '';
    return (
        <button {...props} className={props.side ==='left' ? `${classes.close_block} ${classes.left} ${classes.button} ${darkClass}` : `${classes.close_block} ${classes.right} ${classes.button} ${darkClass}`} />
    );
};

export default ButtonClose;