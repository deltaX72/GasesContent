import datetime
import time as tm

import h5py

from gasescontent.constants import CO2_NAME
from map.models import *


def read_co2_from_h5_file(dataset: h5py.File, version: str):
    length = len(dataset['scanAttribute']['time'])

    data = []

    counter = 0

    for i in range(length):
        if counter == 1000:
            OCO2Data.data.bulk_create(data)
            data.clear()
            counter = 0
        date_and_time = dataset['scanAttribute']['time'][i].split()

        date = date_and_time[0].decode().split('-')
        year, month, day = int(date[0]), int(date[1]), int(date[2])

        time = date_and_time[1].decode().split(':')
        hour, minute, second = int(time[0]), int(time[1]), int(float(time[2]))

        dt = datetime.datetime(year, month, day, hour, minute, second)
        time = tm.mktime(dt.timetuple())

        instance = GOSATData(
            year=year,
            month=month,
            day=day,
            hour=hour,
            minute=minute,
            second=second,
            time=time,
            gas_name=CO2_NAME,
            latitude=dataset['Data']['geolocation']['latitude'][i],
            longitude=dataset['Data']['geolocation']['longitude'][i],
            gas_content=dataset['Data']['mixingRatio']['XCO2'][i],
            data_version=version
        )
        if GOSATData.data.filter(
                time=time,
                latitude=dataset['Data']['geolocation']['latitude'][i],
                longitude=dataset['Data']['geolocation']['longitude'][i]).count() == 0:
            data.append(instance)
            counter += 1


def read_co2_from_nc_file(dataset: h5py.File):
    length = len(dataset['latitude'])

    data = []

    counter = 0
    for i in range(length):
        if counter == 1000:
            OCO2Data.data.bulk_create(data)
            data.clear()
            counter = 0

        instance = OCO2Data(
            year=dataset["date"][i][0],
            month=dataset["date"][i][1],
            day=dataset["date"][i][2],
            hour=dataset["date"][i][3],
            minute=dataset["date"][i][4],
            second=dataset["date"][i][5],
            time=dataset["time"][i],
            gas_name=CO2_NAME,
            latitude=dataset["latitude"][i],
            longitude=dataset["longitude"][i],
            gas_content=dataset["xco2"][i]
        )

        # if OCO2Data.data.filter(time=dataset["time"][i], latitude=dataset["latitude"][i], longitude=dataset["longitude"][i], gas_content=dataset["xco2"][i]).count() == 0:
        data.append(instance)
        counter += 1

    if len(data) != 0:
        OCO2Data.data.bulk_create(data)
