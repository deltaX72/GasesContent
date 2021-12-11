import React from 'react';
import classes from './ButtonClose.module.scss';

const ButtonClose = ({...props}) => {
    return (
        <button
            {...props}
            className={props.side ==='left' ? `${classes.close_block} ${classes.left} ${classes.button}` : `${classes.close_block} ${classes.right} ${classes.button}`}
        >
            +
        </button>
    );
};

export default ButtonClose;