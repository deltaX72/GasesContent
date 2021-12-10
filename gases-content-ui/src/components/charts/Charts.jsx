import React from 'react';
import classes from './Charts.module.scss';
import ButtonClose from "../UI elements/buttons/ButtonClose";

const Charts = ({active, setActive}) => {return (
        <div className={active ? `${classes.charts_common} ${classes.active}` : classes.charts_common} >
            <ButtonClose side='left' onClick={() => setActive(false)} />
        </div>
    );
};

export default Charts;