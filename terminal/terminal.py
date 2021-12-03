import re
from io import BytesIO

import h5py
import requests

from terminal.file_reader import read_co2_from_h5_file
from terminal.utils import format_year_and_month
from terminal.utils import read_archive, get_response


class GOSAT:
    url = 'https://data2.gosat.nies.go.jp/wgetdata/GU/SWIRL2CO2/'

    GOSAT_USER = 'lit.ilya29@gmail.com'
    GOSAT_PASSWORD = 'L57!EWCeSxh19cg_'

    def create_url(self, year: str, month: str, version: str):
        return f'{self.url}{year}/{self.get_filename_mask(year, month, version)}.tar'

    @staticmethod
    def get_filename_mask(year: str, month: str, version: str):
        return f'SWIRL2CO2_{year}{month}_{version}'

    def download_archive(self, year: int, month: int, version: str):
        y, m = format_year_and_month(year, month)
        url = self.create_url(y, m, version)
        response = get_response(url=url, user=self.GOSAT_USER, password=self.GOSAT_PASSWORD)

        if response.status_code != 200:
            print(f'Can\'t find file (url: {url})')
            return None

        return response.content


class OCO2:
    url = 'https://oco2.gesdisc.eosdis.nasa.gov/data/OCO2_DATA/OCO2_L2_Lite_FP.9r/'
    oco2_gas_pattern = 'oco2_LtCO2_'

    OCO2_USER = 'deltaX72'
    OCO2_PASSWORD = 'kmAIK7M5apeLy02z'
    REDIRECT_URI = 'https://oco2.gesdisc.eosdis.nasa.gov/data-redirect'

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

    def download_file(self, url: str, year: int):
        pass


def gosat_run(year_from: int, year_to: int, month_from: int, month_to: int, version: str):
    gosat = GOSAT()
    data = []

    for year in range(year_from, year_to + 1):
        for month in range(month_from, month_to + 1):
            archive = gosat.download_archive(year, month, version)

            if archive is not None:
                files = read_archive(BytesIO(archive))
                for i in files:
                    h5_file = h5py.File(i, 'r')
                    data.append(read_co2_from_h5_file(h5_file))
            else:
                print('Unknown file!')

    return data
