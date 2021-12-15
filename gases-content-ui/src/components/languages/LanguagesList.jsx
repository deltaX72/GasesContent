import React from 'react';
import classes from "../../components/languages/LanguagesList.module.scss";
import ButtonClose from "../UI elements/buttons/buttonClose/ButtonClose";

import ru from "./buttons/images/icons/ru.png";
import en from "./buttons/images/icons/en.png";
import jp from "./buttons/images/icons/jp.png";
import am from "./buttons/images/icons/am.png";

import '../../i18next'
import ButtonLanguage from "./buttons/ButtonLanguage";

const LanguagesList = ({active, setActive, ...props}) => {
    let darkClass;
    props.darkmode ?  darkClass = classes.dark : darkClass = '';

    return (
        <div className={active ? `${classes.languages_common} ${classes.active} ${darkClass}` : `${classes.languages_common} ${darkClass}`} >
            <ButtonClose side='right' onClick={() => setActive(false)} darkmode={props.darkmode} />
            <ButtonLanguage img={ru} children='Русский' lang='ru' darkmode={props.darkmode} />
            <ButtonLanguage img={en} children='English' lang='en' darkmode={props.darkmode} />
            <ButtonLanguage img={jp} children='日本語' lang='jp' darkmode={props.darkmode} />
            <ButtonLanguage img={am} children='Հայերեն' lang='am' darkmode={props.darkmode} />
        </div>
    );
};

export default LanguagesList;