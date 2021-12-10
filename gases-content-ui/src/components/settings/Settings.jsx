import React from 'react';
import classes from './Settings.module.scss';
import ButtonClose from "../UI elements/buttons/ButtonClose";
import CustomButton from "../UI elements/buttons/CustomButton";
import SimpleParagraph from "../UI elements/text/SimpleParagraph";

const Settings = ({active, setActive}) => {
    return (
        <div className={active ? `${classes.settings_common} ${classes.active}` : classes.settings_common} >
            <ButtonClose side='right' onClick={() => setActive(false)} />
            <div className={classes.empty_container} />
            <div className={classes.flex_elem}>
                {/*<SimpleParagraph children='Широта' size='half'/>*/}
            </div>
            <CustomButton children='Применить' />
            <div className={classes.flex_elem}></div>
        </div>
    );
};

export default Settings;