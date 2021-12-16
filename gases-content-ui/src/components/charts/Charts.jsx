import React, {useState} from 'react';
import classes from './Charts.module.scss';
import ButtonClose from "../UIelements/buttons/buttonClose/ButtonClose";
import Chart from "./chart/Chart";
import ButtonChangeSize from "./buttons/ButtonChangeSize";
import HeaderText from "../UIelements/header/HeaderText";
import {useTranslation} from "react-i18next";

export const options1 = {
    scales: {
        x: {
            type: 'linear',
        },
        y: {
            type: 'linear'
        }
    }
}

export const datasets1 = {
    id: 1,
    label: 'con 1',
    data: [
        296.63145999593024,
        298.2869302216746,
        299.4010206353587,
        297.3748514861457,
        296.0396415571533,
        294.44753878294586,
        294.4589146588886,
        296.128136702767,
        297.6024562247509,
        296.2966263449363,
        295.4170424567078,
        295.1244367253933
    ],
    borderColor: 'red',
    backgroundColor: 'white',
    borderWidth: 3,
}

export const datasets2 = {
    id: 2,
    label: 'con 2',
    data: [
        291.63145999593024,
        295.2869302216746,
        292.4010206353587,
        293.3748514861457,
        295.0396415571533,
        298.44753878294586,
        292.4589146588886,
        298.128136702767,
        294.6024562247509,
        298.2966263449363,
        290.4170424567078,
        294.1244367253933
    ],
    borderColor: 'blue',
    backgroundColor: 'white',
    borderWidth: 3,
}


const Charts = ({active, setActive, ...props}) => {
    let classBig;
    let darkClass;
    props.darkmode === true ?  darkClass = classes.dark : darkClass = '';

    const [direction, setDirection] = useState('left');
    const { t } = useTranslation();

    const change = () => {
      direction === 'left'
          ? setDirection('right')
          : setDirection('left');
    }
    direction === 'right' ?  classBig = classes.big : classBig = '';

    return (
        <div className={active
            ? `${classes.charts_common} ${classBig} ${classes.active} ${darkClass}`
            : `${classes.charts_common} ${classBig} ${darkClass}`}
        >
            <div>
                <ButtonClose darkmode={props.darkmode} side='left' onClick={() => setActive(false)} />
                <ButtonChangeSize action={change} direction={direction} darkmode={props.darkmode}/>
            </div>
            <div className={`${classes.flex_elem} ${darkClass}`}>
                <HeaderText children={t("charts")} />
            </div>
            <div className={`${classes.flex_elem} ${darkClass}`}>
                <Chart options={options1} datasets={[datasets1]} />
                <Chart options={options1} datasets={[datasets2]} />
            </div>
            <div className={`${classes.flex_elem} ${darkClass}`}>
                <Chart options={options1} datasets={[datasets1, datasets2]} />
            </div>
        </div>
    );
};

export default Charts;