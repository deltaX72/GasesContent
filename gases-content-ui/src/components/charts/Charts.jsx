import React, {useState} from 'react';
import classes from './Charts.module.scss';
import ButtonClose from "../UIelements/buttons/buttonClose/ButtonClose";
import Chart from "./chart/Chart";
import ButtonChangeSize from "./buttons/ButtonChangeSize";


const Charts = ({active, setActive, ...props}) => {
    let classBig;
    let darkClass;
    props.darkmode === true ?  darkClass = classes.dark : darkClass = '';

    const [direction, setDirection] = useState('left');

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
            <ButtonClose darkmode={props.darkmode} side='left' onClick={() => setActive(false)} />
            <ButtonChangeSize action={change} direction={direction} darkmode={props.darkmode}/>
            <div className={`${classes.flex_elem} ${darkClass}`}>
                <Chart />
            </div>
        </div>
    );
};

export default Charts;