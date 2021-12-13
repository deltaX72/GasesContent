import React from 'react';
import classes from "./Header.module.scss";
import ButtonDarkMode from "./buttons/buttonDarkMode/ButtonDarkMode";
import ButtonLanguage from "./buttons/buttonLanguage/ButtonLanguage";

const Header = ({dark, setDark, active, setActive, ...props}) => {
    let darkClass;
    props.darkmode ?  darkClass = classes.dark : darkClass = '';
    return (
        <header className={`${classes.container_position} ${darkClass}`}>
            <div></div>
            <div></div>
            <div>
                <ButtonLanguage darkmode={props.darkmode} onClick={() => setActive(!active)}/>
                <ButtonDarkMode darkmode={props.darkmode} onClick={() => setDark(!dark)} />
            </div>
        </header>
    );
};

export default Header;