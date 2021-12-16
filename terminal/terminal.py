import re
import tarfile
from io import BytesIO

import h5py
import requests
import pandas as pd

from terminal.file_reader import read_co2_from_h5_file, read_co2_from_nc_file
from terminal.utils import format_year_and_month, read_archive, check_if_not_200


class GOSAT:
    url = 'https://data2.gosat.nies.go.jp/wgetdata/GU/SWIRL2CO2/'

    def create_url(self, year: str, month: str, version: str):
        return f'{self.url}{year}/{self.get_filename_mask(year, month, version)}.tar'

    @staticmethod
    def get_filename_mask(year: str, month: str, version: str):
        return f'SWIRL2CO2_{year}{month}_{version}'

    def download_archive(self, session, year: int, month: int, version: str):
        y, m = format_year_and_month(year, month)
        url = self.create_url(y, m, version)

        response = session.get(url=url, stream=True)
        print(url)

        if check_if_not_200(response.status_code, url):
            return None, None

        return response.content, url


class OCO2:
    url = 'https://oco2.gesdisc.eosdis.nasa.gov/data/OCO2_DATA/OCO2_L2_Lite_FP.9r/'
    oco2_gas_pattern = 'oco2_LtCO2_'

    def get_urls_list(self, year: int):
        response = requests.get(f'{self.url}{year}')

        if response.status_code != 200:
            return []

        urls = re.findall(self.oco2_gas_pattern + r'.{1,30}.nc4', response.text)
        urls = list(set(urls))
        urls.sort()

        return urls

    def get_url_date(self, url: str):
        length = len(f'{self.oco2_gas_pattern}')

        date = url[length:length + 6]
        return int('20' + date[:2]), int(date[2:4]), int(date[4:])

    def download_file(self, session, url: str, year: int):
        file_url = f'{self.url}{year}/{url}'

        response = session.get(url=file_url, stream=True)

        if check_if_not_200(response.status_code, url):
            return None, None

        file = BytesIO()
        for chunk in response.iter_content(chunk_size=128*1024):
            if chunk:
                file.write(chunk)

        return file, url


def gosat_run(year_from: int, year_to: int, month_from: int, month_to: int, version: str):
    gosat = GOSAT()
    session = requests.session()

    for year in range(year_from, year_to + 1):
        for month in range(month_from, month_to + 1):
            archive, file_name = gosat.download_archive(session, year, month, version)
            print(file_name)

            if archive is not None:
                files = read_archive(archive)
                for i in files:
                    read_co2_from_h5_file(h5py.File(i, 'r'), version)
            else:
                print('Unknown file!')


def oco2_run(year_from: int, year_to: int, month_from: int, month_to: int, day_from: int, day_to: int):
    oco2 = OCO2()
    session = requests.session()

    for year in range(year_from, year_to + 1):
        urls = oco2.get_urls_list(year)

        for url in urls:
            y, m, d = oco2.get_url_date(url)
            print(url)

            if year_from <= y <= year_to and month_from <= m <= month_to and day_from <= d <= day_to:
                file, file_name = oco2.download_file(session, url, y)
                print(file_name)

                if file is not None:
                    nc4_file = h5py.File(file, 'r')
                    read_co2_from_nc_file(nc4_file)
                    nc4_file.close()
                else:
                    print(f'Can\'t find file (url: {url})')

                file.close()
