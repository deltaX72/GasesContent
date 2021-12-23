import React from 'react';
import classes from './HeaderText.module.scss';

const HeaderText = ({children, double}) => {
    let doubleClass;
    double === true ?  doubleClass = classes.double : doubleClass = '';
    return (
        <div className={`${classes.header_styles} ${doubleClass}`}>
            {children}
        </div>
    );
};

export default HeaderText;