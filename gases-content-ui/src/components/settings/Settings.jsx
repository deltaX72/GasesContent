import React from 'react';
import classes from './Settings.module.scss';
import ButtonClose from "../UI elements/buttons/buttonClose/ButtonClose";
import CustomButton from "../UI elements/buttons/customButton/CustomButton";
import SimpleParagraph from "../UI elements/text/SimpleParagraph";
import CustomInput from "../UI elements/input/CustomInput";
import ButtonLeft from "../UI elements/buttons/buttonLeft/ButtonLeft";
import ButtonRight from "../UI elements/buttons/buttonRight/ButtonRight";

const Settings = ({active, setActive}) => {
    return (
        <div className={active ? `${classes.settings_common} ${classes.active}` : classes.settings_common} >
            <ButtonClose side='right' onClick={() => setActive(false)} />
            <div className={classes.flex_elem}>
                <SimpleParagraph children='Широта' size='half' />
                <SimpleParagraph children='Долгота' size='half' />

                <CustomInput type='text' placeholder='мин' size='half' />
                -
                <CustomInput type='text' placeholder='макс' size='half' />

                <CustomInput type='text' placeholder='мин' size='half' />
                -
                <CustomInput type='text' placeholder='макс' size='half' />
            </div>
            <div className={classes.flex_elem}>
                <SimpleParagraph children='Дата' />
                <CustomInput type='date' />
                -
                <CustomInput type='date' />
            </div>

            <CustomButton children='Применить' />
            <div className={classes.flex_elem}>
                <ButtonLeft />
                <SimpleParagraph children='Месяц' size='half' />
                <ButtonRight />
            </div>
        </div>
    );
};

export default Settings;