import React from 'react';
import classes from './Coordinates.module.scss';

const Coordinates = ({coords}) => {
    return (
        <div className={classes.coords_container}>

            <h3 className={classes.coords_item}>
                {`${coords[0].toFixed(4)} °`}
            </h3>
            <h3 className={classes.coords_item}>
                {`${coords[1].toFixed(4)} °`}
            </h3>
        </div>
    );
};

export default Coordinates;