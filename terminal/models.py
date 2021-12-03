import datetime
import os
from urllib.parse import urlparse

import requests
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage
from django.db import models
from django.db.models import FileField

from gasescontent import settings

fs = FileSystemStorage()

GOSAT_USER = 'lit.ilya29@gmail.com'
GOSAT_PASSWORD = 'L57!EWCeSxh19cg_'


class GOSATData(models.Model):
    archives = FileField(upload_to='gosat/archives', storage=fs)
    encoded = FileField(upload_to='gosat/encoded', storage=fs)
    decoded = FileField(upload_to='gosat/decoded', storage=fs)

    url = 'https://data2.gosat.nies.go.jp/wgetdata/GU/SWIRL2CO2/'

    ###################################################################

    def save_archive(self, filename: str, content):
        self.archives.save(filename, ContentFile(content))

    def save_encoded(self, filename: str, content):
        self.archives.save(filename, ContentFile(content))

    def save_decoded(self, filename: str, content):
        self.archives.save(filename, ContentFile(content))

    def download_file(self, url: str, user: str, password: str):
        filename = os.path.basename(urlparse(url).path)
        result = requests.get(url, auth=(user, password))

        print(result.status_code)
        if result.status_code == 200:
            self.save_archive(filename, result.content)
        else:
            print(f'Can\'t find file (url: {url})')

    def create_url(self, year: str, month: str, version: str):
        return f'{self.url}{year}/{self.get_filename_mask(year, month, version)}.tar'

    ###################################################################

    @staticmethod
    def get_filename_mask(year: str, month: str, version: str):
        return f'SWIRL2CO2_{year}{month}_{version}'

    @staticmethod
    def format_year_and_month(year: int, month: int):
        if month > 12:
            year += 1
            month = 1

        month_mask = ""
        if 0 < month < 10:
            month_mask = "0"
        month_mask += str(month)
        return str(year), month_mask

    ###################################################################

    def download(self, year_from: int, year_to: int, month_from: int, month_to: int, version: str):
        year = year_from
        month = month_from

        while True:
            y, m = self.format_year_and_month(year, month)
            url = self.create_url(y, m, version)
            # self.download_file(url, GOSAT_USER, GOSAT_PASSWORD)

            path_to_archive = settings.MEDIA_ROOT + self.archives.path
            print(path_to_archive)

            if int(y) == year_to and int(m) == month_to:
                break

            month += 1


class OCO2Data(models.Model):
    encoded = FileField(upload_to='oco2/encoded', storage=fs)
    decoded = FileField(upload_to='oco2/decoded', storage=fs)

    def save_encoded(self, filename: str, content):
        file = ContentFile(content)
        self.encoded.save(filename, file)

    def save_decoded(self, filename: str, content):
        file = ContentFile(content)
        self.decoded.save(filename, file)
