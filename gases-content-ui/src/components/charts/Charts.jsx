import React, {useState} from 'react';
import classes from './Charts.module.scss';
import ButtonClose from "../UIelements/buttons/buttonClose/ButtonClose";
import Chart from "./chart/Chart";
import ButtonChangeSize from "./buttons/ButtonChangeSize";
import HeaderText from "../UIelements/header/HeaderText";
import {useTranslation} from "react-i18next";
import SimpleParagraph from "../UIelements/text/SimpleParagraph";
import axios from "axios";

export const options1 = {
    scales: {
        x: {
            type: 'linear',
            // grid: {
            //     color: '#979A9A', // x-line
            //     borderColor: '#979A9A', // x-border
            // },
        },
        y: {
            min: 402,
            max: 417,
            type: 'linear',
            // grid: {
            //     color: '#979A9A', // y-line
            //     borderColor: '#979A9A', // y-border
            // }
        },
    },
    // color: 'white', // title

}

export const datasets1 = {
    id: 2,
    label: 'CO2',
    // data: [ // pekin 2020 402-417
    //     414.17469889322916,
    //     414.30020532852564,
    //     416.46160653921277,
    //     415.0793094275133,
    //     413.3887939453125,
    //     408.3286214265841,
    //     403.85264078776044,
    //     407.2506103515625,
    //     410.40578704184674,
    //     415.22037579936364,
    //     415.29021917604933,
    //     415.45782252720426,
    // ],
    data: [ // new york 2020 409-417
        410.6723327636719,
        413.5066223144531,
        415.77698771158856,
        416.6320495605469,
        414.69002532958984,
        415.49522569444446,
        409.2893778483073,
        410.3887023925781,
        411.48193359375,
        414.0181884765625,
        413.8602556501116,
        415.73643796397,
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
    const [lat, setLat] = useState();
    const [long, setLong] = useState();

    const { t } = useTranslation();

    const change = () => {
      direction === 'left'
          ? setDirection('right')
          : setDirection('left');
    }
    direction === 'right' ?  classBig = classes.big : classBig = '';
    const sendData = () => {
        axios.get("http://192.168.0.2:8000/users/")
            .then(res => console.log(res.data))
    }
    return (
        <div className={active
            ? `${classes.charts_common} ${classBig} ${classes.active} ${darkClass}`
            : `${classes.charts_common} ${classBig} ${darkClass}`}
        >
            <ButtonClose darkmode={props.darkmode} side='left' onClick={() => setActive(false)} />
            <div className={`${classes.flex_elem} ${classes.sticky} ${darkClass}`}>
                <ButtonChangeSize action={change} direction={direction} darkmode={props.darkmode}/>
                <HeaderText double={true} children={t("charts")} />
            </div>
            <div className={`${classes.flex_elem} ${darkClass}`}>
                <SimpleParagraph children={t("latitude")} size='half' darkmode={props.darkmode} />
                <SimpleParagraph children={t("longitude")} size='half' darkmode={props.darkmode} />

                <input
                    value={lat}
                    onChange={event => setLat(event.target.value)}
                    placeholder={t("latitude")}
                    type={props.type}
                    className={`${classes.common_styles}`}
                />
                <input
                    value={long}
                    onChange={event => setLong(event.target.value)}
                    placeholder={t("longitude")}
                    type={props.type}
                    className={`${classes.common_styles}`}
                />
                <SimpleParagraph children={t("date")} darkmode={props.darkmode} />
                <select className={`${classes.common_styles} ${classes.select_center}`} name="year" id="year">
                    <option value="year2009">2009</option>
                    <option value="year2010">2010</option>
                    <option value="year2011">2011</option>
                    <option value="year2012">2012</option>
                    <option value="year2013">2013</option>
                    <option value="year2014">2014</option>
                    <option value="year2015">2015</option>
                    <option value="year2016">2016</option>
                    <option value="year2017">2017</option>
                    <option value="year2018">2018</option>
                    <option value="year2019">2019</option>
                    <option value="year2020">2020</option>
                    <option value="year2021">2021</option>
                </select>
                <button onClick={sendData} className={`${classes.button_submit} ${darkClass}`}>{t("submit")}</button>
            </div>
            <div className={`${classes.flex_elem} ${darkClass}`}>
                <Chart options={options1} datasets={[datasets1]} />
            </div>

        </div>
    );
};

export default Charts;