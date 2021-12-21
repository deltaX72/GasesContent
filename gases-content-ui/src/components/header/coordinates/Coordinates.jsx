import React, {useState} from 'react';
import classes from './Coordinates.module.scss';
import {useTranslation} from "react-i18next";

const Coordinates = ({coords}) => {
    const { t } = useTranslation()

    return (
        <div className={classes.coords_container}>
            <h3 className={classes.coords_item}>
                {t("coordinates") + ":"}
            </h3>
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