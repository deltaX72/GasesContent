import h5py


def read_co2_from_h5_file(dataset: h5py.File):
    data = []

    length = len(dataset['scanAttribute']['time'])
    for i in range(length):
        date_and_time = dataset['scanAttribute']['time'][i].split()
        data.append({
            "date": str(date_and_time[0].decode()),
            "time": str(date_and_time[1].decode()),
            "latitude": str(dataset['Data']['geolocation']['latitude'][i]),
            "longitude": str(dataset['Data']['geolocation']['longitude'][i]),
            "con": str(dataset['Data']['mixingRatio']['XCO2'][i]),
            "temperature": str(dataset['scanAttribute']['referenceData']['temperatureProfile'][i][0])
        })

    return data
