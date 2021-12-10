import React from 'react';
import classes from './ButtonClose.module.scss';

const ButtonClose = ({...props}) => {
    return (
        <button
            {...props}
            className={props.side ==='left' ? `${classes.close_block} ${classes.left}` : `${classes.close_block} ${classes.right}`}>
            +
        </button>
    );
};

export default ButtonClose;