import React from 'react';
import classes from './Settings.module.scss';
import ButtonClose from "../UI elements/buttons/buttonClose/ButtonClose";
import CustomButton from "../UI elements/buttons/customButton/CustomButton";
import SimpleParagraph from "../UI elements/text/SimpleParagraph";
import CustomInput from "../UI elements/input/CustomInput";
import ButtonLeft from "../UI elements/buttons/buttonLeft/ButtonLeft";
import ButtonRight from "../UI elements/buttons/buttonRight/ButtonRight";
import CustomCheckBox from "../UI elements/checkbox/CustomCheckBox";
import CustomRadio from "../UI elements/radio/CustomRadio";

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
            <div className={classes.flex_elem}>
                <SimpleParagraph children='Выбор спутников' />
                <CustomCheckBox checked={true} id='gosat' children='GOSAT' />
                <CustomCheckBox id='gosat_2' children='GOSAT-2' />
                <CustomCheckBox id='oco_2' children='OCO-2' />
                <CustomCheckBox id='oco_3' children='OCO-3' />
            </div>
            <div className={classes.flex_elem}>
                <SimpleParagraph children='Выбор газа' />
                <CustomRadio checked={true} id='co_2' name='gas' children='CO-2' />
                <CustomRadio id='ch_4' name='gas' children='CH-4' />
            </div>
            <div className={classes.flex_elem} >
                <SimpleParagraph children='Качество отображения' />
                <CustomRadio checked={true} id='high' name='qual' children='Высокое' size='full' />
                <CustomRadio id='middle' name='qual' children='Невысокое' size='full' />
                <CustomRadio id='real' name='qual' children='Реальные данные' size='full' />
            </div>
        </div>
    );
};

export default Settings;