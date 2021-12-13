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
import {useTranslation} from "react-i18next";

const Settings = ({active, setActive, ...props}) => {
    let darkClass;
    props.darkmode ?  darkClass = classes.dark : darkClass = '';

    const { t } = useTranslation();

    return (
        <div className={active ? `${classes.settings_common} ${classes.active} ${darkClass}` : `${classes.settings_common} ${darkClass}`} >
            <ButtonClose side='right' onClick={() => setActive(false)} darkmode={props.darkmode} />
            <div className={`${classes.flex_elem} ${darkClass}`}>
                <SimpleParagraph children={t("latitude")} size='half' darkmode={props.darkmode} />
                <SimpleParagraph children={t("longitude")} size='half' darkmode={props.darkmode} />

                <CustomInput type='text' placeholder={t("min")} size='half' />
                -
                <CustomInput type='text' placeholder={t("max")} size='half' />

                <CustomInput type='text' placeholder={t("min")} size='half' />
                -
                <CustomInput type='text' placeholder={t("max")} size='half' />
            </div>
            <div className={`${classes.flex_elem} ${darkClass}`}>
                <SimpleParagraph children={t("date")} darkmode={props.darkmode} />
                <CustomInput type='date' />
                -
                <CustomInput type='date' />
            </div>

            <CustomButton children={t("submit")} darkmode={props.darkmode} />
            <div className={`${classes.flex_elem} ${darkClass}`}>
                <ButtonLeft darkmode={props.darkmode} />
                <SimpleParagraph children={t("month")} size='half' darkmode={props.darkmode} />
                <ButtonRight darkmode={props.darkmode} />
            </div>
            <div className={`${classes.flex_elem} ${darkClass}`}>
                <SimpleParagraph children={t("selectOfSatellites")} />
                <CustomCheckBox darkmode={props.darkmode} checked={true} id='gosat' children='GOSAT' />
                <CustomCheckBox darkmode={props.darkmode} id='gosat_2' children='GOSAT-2' />
                <CustomCheckBox darkmode={props.darkmode} id='oco_2' children='OCO-2' />
                <CustomCheckBox darkmode={props.darkmode} id='oco_3' children='OCO-3' />
            </div>
            <div className={`${classes.flex_elem} ${darkClass}`}>
                <SimpleParagraph children={t("selectGases")} darkmode={props.darkmode} />
                <CustomRadio darkmode={props.darkmode} checked={true} id='co_2' name='gas' children='CO-2' />
                <CustomRadio darkmode={props.darkmode} id='ch_4' name='gas' children='CH-4' />
            </div>
            <div className={`${classes.flex_elem} ${darkClass}`} >
                <SimpleParagraph children={t("displayQuality")} darkmode={props.darkmode} />
                <CustomRadio darkmode={props.darkmode} checked={true} id='high' name='qual' children={t("high")} size='full' />
                <CustomRadio darkmode={props.darkmode} id='middle' name='qual' children={t("middle")} size='full' />
                <CustomRadio darkmode={props.darkmode} id='real' name='qual' children={t("realData")} size='full' />
            </div>
        </div>
    );
};

export default Settings;