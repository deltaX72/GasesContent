import React from 'react';
import classes from './Charts.module.scss';
import ButtonClose from "../UI elements/buttons/buttonClose/ButtonClose";

const Charts = ({active, setActive, ...props}) => {
    let darkClass;
    props.darkmode === true ?  darkClass = classes.dark : darkClass = '';
    return (
        <div className={active ? `${classes.charts_common} ${classes.active} ${darkClass}` : `${classes.charts_common} ${darkClass}`} >
            <ButtonClose darkmode={props.darkmode} side='left' onClick={() => setActive(false)} />
        </div>
    );
};

export default Charts;