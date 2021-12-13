import React from 'react';
import classes from "./ButtonChart.module.scss";

const ButtonChart = ({...props}) => {
    let darkClass;
    props.darkmode === true ?  darkClass = classes.dark : darkClass = '';
    return (
        <div>
            <button {...props} className={`${classes.chart_styles} ${classes.button} ${darkClass}`}/>
        </div>
    );
};

export default ButtonChart;