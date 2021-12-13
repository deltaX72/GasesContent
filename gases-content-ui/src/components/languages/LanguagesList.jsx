import React from 'react';
import classes from "../../components/languages/LanguagesList.module.scss";
import ButtonClose from "../UI elements/buttons/buttonClose/ButtonClose";
import CustomButton from "../UI elements/buttons/customButton/CustomButton";

import {useTranslation} from "react-i18next";
import i18next from "i18next";
import '../../i18next'

const LanguagesList = ({active, setActive, ...props}) => {
    let darkClass;
    props.darkmode ?  darkClass = classes.dark : darkClass = '';

    const { t } = useTranslation();
    return (
        <div className={active ? `${classes.languages_common} ${classes.active} ${darkClass}` : `${classes.languages_common} ${darkClass}`} >
            <ButtonClose side='right' onClick={() => setActive(false)} darkmode={props.darkmode} />
            <div onClick={() => i18next.changeLanguage('ru')}>Русский</div>
            <div onClick={() => i18next.changeLanguage('en')}>English</div>
        </div>
    );
};

export default LanguagesList;