import React from 'react';
import i18next from "i18next";
import classes from "./ButtonLanguage.module.scss";

const ButtonLanguage = ({children, ...props}) => {
    let darkClass;
    props.darkmode === true ?  darkClass = classes.dark : darkClass = '';

    return (
        <div className={`${classes.container} ${classes.flex_elem} ${darkClass}`}>
            <img onClick={() => i18next.changeLanguage(props.lang)} src={props.img} alt='language' />
            <button className={darkClass} onClick={() => i18next.changeLanguage(props.lang)} >{children}</button>
        </div>
    );
};

export default ButtonLanguage;