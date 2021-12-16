import React from 'react';
import classes from './ButtonChangeSize.module.scss';


const ButtonChangeSize = ({direction, action, ...props}) => {
    let bgClass;
    direction === 'left' ? bgClass = classes.bg_more : bgClass = classes.bg_less;

    let darkClass;
    props.darkmode === true ?  darkClass = classes.dark : darkClass = '';

    return (
        <button
            onClick={() => action()}
            className={`${classes.button} ${bgClass} ${darkClass} ${classes.common_settings}`}
        />
    );
};

export default ButtonChangeSize;