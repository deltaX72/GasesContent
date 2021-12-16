import React from 'react';
import classes from "./Header.module.scss";
import icon from './icons/icon.png';

import ButtonDarkMode from "./buttons/buttonDarkMode/ButtonDarkMode";
import ButtonLanguage from "./buttons/buttonLanguage/ButtonLanguage";
import Coordinates from "./coordinates/Coordinates";

const Header = ({dark, setDark, active, setActive, coords, setCoords, ...props}) => {
    let darkClass;
    props.darkmode ?  darkClass = classes.dark : darkClass = '';

    return (
        <header className={`${classes.container_position} ${darkClass}`}>
            <div className={classes.header_item}>
                <img src={icon} />
                <h1>Gases Content</h1>
            </div>
            <div className={classes.header_item}>
                <Coordinates coords={coords} />
            </div>
            <div className={classes.header_item}>
                <ButtonLanguage darkmode={props.darkmode} onClick={() => setActive(!active)}/>
                <ButtonDarkMode darkmode={props.darkmode} onClick={() => setDark(!dark)} />
            </div>
        </header>
    );
};

export default Header;