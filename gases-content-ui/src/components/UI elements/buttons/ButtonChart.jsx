import React from 'react';
import classes from "./ButtonChart.module.scss";

const ButtonChart = ({...props}) => {
    return (
        <div>
            <button {...props} className={classes.chart_styles}/>
        </div>
    );
};

export default ButtonChart;