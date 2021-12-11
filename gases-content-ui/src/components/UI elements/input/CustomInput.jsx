import React from 'react';
import classes from './CustomInput.module.scss';

const CustomInput = ({...props}) => {
    return (
        <input placeholder={props.placeholder} type={props.type} className={props.size === 'half' ? `${classes.common_styles} ${classes.half}` : classes.common_styles} />
    );
};

export default CustomInput;