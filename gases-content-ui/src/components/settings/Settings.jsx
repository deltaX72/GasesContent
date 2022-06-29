import React, {useState} from 'react';
import classes from './Settings.module.scss';
import ButtonClose from "../UIelements/buttons/buttonClose/ButtonClose";
import SimpleParagraph from "../UIelements/text/SimpleParagraph";
import ButtonLeft from "../UIelements/buttons/buttonLeft/ButtonLeft";
import ButtonRight from "../UIelements/buttons/buttonRight/ButtonRight";
import {useTranslation} from "react-i18next";
import HeaderText from "../UIelements/header/HeaderText";
import axios from "axios";

let mapData;

const Settings = ({active, setActive, ...props}) => {
    let darkClass;
    props.darkmode ?  darkClass = classes.dark : darkClass = '';

    const [minLat, setMinLat] = useState();
    const [maxLat, setMaxLat] = useState();
    const [minLong, setMinLong] = useState();
    const [maxLong, setMaxLong] = useState();

    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const [gosat, setGosat] = useState(true);
    const [gosat2, setGosat2] = useState(false);
    const [oco2, setOco2] = useState(false);
    const [oco3, setOco3] = useState(false);

    const [co2, setCo2] = useState(true);
    const [ch4, setCh4] = useState(!co2);

    const [realData, setRealData] = useState(false);
    const [middle, setMiddle] = useState(true);
    const [high, setHigh] = useState(false);

    const { t } = useTranslation();

    let settingsData = {
        minLat,
        maxLat,
        minLong,
        maxLong,
        dateFrom,
        dateTo,
        sat: {
            gosat,
            gosat2,
            oco2,
            oco3
        },
        gases: {
            co2,
            ch4
        },
        quality: {
            high,
            middle,
            realData
        }
    }
    console.log(data)
    const changeGas = () => {
        setCo2(!co2);
        setCh4(!ch4);
    }

    async function sendData() {
        await axios.post("http://192.168.0.2:8000/api/", settingsData)
            .then(res => mapData = res.data)
    }
    return (
        <div className={active ? `${classes.settings_common} ${classes.active} ${darkClass}` : `${classes.settings_common} ${darkClass}`} >
            <ButtonClose side='right' onClick={() => setActive(false)} darkmode={props.darkmode} />
            <div className={`${classes.flex_elem} ${darkClass}`} >
                <HeaderText children={t("settings")} />
            </div>
            <div className={`${classes.flex_elem} ${darkClass}`}>
                <SimpleParagraph children={t("latitude")} size='half' darkmode={props.darkmode} />
                <SimpleParagraph children={t("longitude")} size='half' darkmode={props.darkmode} />
                <input
                    value={minLat}
                    onChange={event => setMinLat(event.target.value)}
                    placeholder={t("min")}
                    type={props.type}
                    className={`${classes.common_styles} ${classes.half}`}
                />
                -
                <input
                    value={maxLat}
                    onChange={event => setMaxLat(event.target.value)}
                    placeholder={t("max")}
                    type={props.type}
                    className={`${classes.common_styles} ${classes.half}`}
                />
                <input
                    value={minLong}
                    onChange={event => setMinLong(event.target.value)}
                    placeholder={t("min")}
                    type={props.type}
                    className={`${classes.common_styles} ${classes.half}`}
                />
                -
                <input
                    value={maxLong}
                    onChange={event => setMaxLong(event.target.value)}
                    placeholder={t("max")}
                    type={props.type}
                    className={`${classes.common_styles} ${classes.half}`}
                />
            </div>
            <div className={`${classes.flex_elem} ${darkClass}`}>
                <SimpleParagraph children={t("date")} darkmode={props.darkmode} />
                <input
                    type="date"
                    value={dateFrom}
                    onChange={event => setDateFrom(event.target.value)}
                    className={classes.common_styles}
                />
                -
                <input
                    type="date"
                    value={dateTo}
                    onChange={event => setDateTo(event.target.value)}
                    className={classes.common_styles}
                />
            </div>

            <button onClick={sendData} className={`${classes.button_submit} ${darkClass}`}>{t("submit")}</button>
            <div className={`${classes.flex_elem} ${darkClass}`}>
                <ButtonLeft darkmode={props.darkmode} />
                <SimpleParagraph children={t("month")} size='half' darkmode={props.darkmode} />
                <ButtonRight darkmode={props.darkmode} />
            </div>
            <div className={`${classes.flex_elem} ${darkClass}`}>
                <SimpleParagraph children={t("selectOfSatellites")} />
                <div className={`${classes.container_style} ${darkClass}`}>
                    <input
                        id={"gosat"}
                        className={`${classes.checkbox_style}`}
                        checked={gosat}
                        onClick={() => setGosat(!gosat)}
                        type="checkbox"
                    />
                    <label htmlFor={"gosat"}>GOSAT</label>
                </div>
                <div className={`${classes.container_style} ${darkClass}`}>
                    <input
                        id={"gosat_2"}
                        className={`${classes.checkbox_style}`}
                        checked={gosat2}
                        onClick={() => setGosat2(!gosat2)}
                        type="checkbox"
                    />
                    <label htmlFor={"gosat_2"}>GOSAT-2</label>
                </div>
                <div className={`${classes.container_style} ${darkClass}`}>
                    <input
                        id={"oco_2"}
                        className={`${classes.checkbox_style}`}
                        checked={oco2}
                        onClick={() => setOco2(!oco2)}
                        type="checkbox"
                    />
                    <label htmlFor={"oco_2"}>OCO-2</label>
                </div>
                <div className={`${classes.container_style} ${darkClass}`}>
                    <input
                        id={"oco_3"}
                        className={`${classes.checkbox_style}`}
                        checked={oco3}
                        onClick={() => setOco3(!oco3)}
                        type="checkbox"
                    />
                    <label htmlFor={"oco_3"}>OCO-3</label>
                </div>
            </div>
            <div className={`${classes.flex_elem} ${darkClass}`}>
                <SimpleParagraph children={t("selectGases")} darkmode={props.darkmode} />
                <div className={`${classes.container_style} ${darkClass}`}>
                    <input
                        id={"co_2"}
                        name={"gas"}
                        className={classes.radio_style}
                        checked={co2}
                        onClick={changeGas}
                        type="radio"
                    />
                    <label htmlFor={"co_2"}>CO-2</label>
                </div>
                <div className={`${classes.container_style} ${darkClass}`}>
                    <input
                        id={"ch_4"}
                        name={"gas"}
                        className={classes.radio_style}
                        checked={ch4}
                        onClick={changeGas}
                        type="radio"
                    />
                    <label htmlFor={"ch_4"}>CH-4</label>
                </div>
            </div>
            <div className={`${classes.flex_elem} ${darkClass}`} >
                <SimpleParagraph children={t("displayQuality")} darkmode={props.darkmode} />

                <div className={`${classes.container_style} ${darkClass} ${classes.full}`}>
                    <input
                        id={"high"}
                        name={"qual"}
                        className={classes.radio_style}
                        checked={high}
                        onClick={() => {
                            setHigh(true);
                            setMiddle(false);
                            setRealData(false);
                        }}
                        type="radio"
                    />
                    <label htmlFor={"high"}>{t("high")}</label>
                </div>

                <div className={`${classes.container_style} ${darkClass} ${classes.full}`}>
                    <input
                        id={"middle"}
                        name={"qual"}
                        className={classes.radio_style}
                        checked={middle}
                        onClick={() => {
                            setHigh(false);
                            setMiddle(true);
                            setRealData(false);
                        }}
                        type="radio"
                    />
                    <label htmlFor={"middle"}>{t("middle")}</label>
                </div>

                <div className={`${classes.container_style} ${darkClass} ${classes.full}`}>
                    <input
                        id={"realData"}
                        name={"qual"}
                        className={classes.radio_style}
                        checked={realData}
                        onClick={() => {
                            setHigh(false);
                            setMiddle(false);
                            setRealData(true);
                        }}
                        type="radio"
                    />
                    <label htmlFor={"realData"}>{t("realData")}</label>
                </div>
            </div>
        </div>

    );
};

export default Settings;