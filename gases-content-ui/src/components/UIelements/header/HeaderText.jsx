import React from 'react';
import classes from './HeaderText.module.scss';

const HeaderText = ({children}) => {
    return (
        <div className={classes.header_styles}>
            {children}
        </div>
    );
};

export default HeaderText;