import os
import pickle
import tarfile
from io import StringIO, BytesIO
from typing import IO

import requests
from urllib.parse import urlparse

from requests.auth import HTTPBasicAuth

from gasescontent import settings

dirs = {
    'gosat': {
        'archives': settings.MEDIA_ROOT + '\\gosat\\archives\\',
        'h5': settings.MEDIA_ROOT + '\\gosat\\h5\\'
    },
    'oco-2': {
        'nc4': settings.MEDIA_ROOT + '\\oco-2\\nc4\\'
    }
}


def save_file(directory: str, filename: str, content):
    file_path = f'{directory}{filename}'
    with open(file_path, 'wb') as file:
        file.write(content)


def format_year_and_month(year: int, month: int):
    if month > 12:
        year += 1
        month = 1

    return str(year), format_month(month)


def format_month(month: int):
    month_mask = ""
    if 0 < month < 10:
        month_mask = "0"
    month_mask += str(month)
    return month_mask


def format_day(day: int):
    day_mask = ""
    if 0 < day < 10:
        day_mask = "0"
    day_mask += str(day)
    return day_mask


# def download_file(url: str, directory: str, user: str, password: str):
#     filename = os.path.basename(urlparse(url).path)
#     result = requests.get(url, auth=(user, password))
#
#     if result.status_code == 200:
#         save_file(directory, filename, result.content)
#     else:
#         print(f'Can\'t find file (url: {url})')


def get_response(url: str, user: str = None, password: str = None, allow_redirects=False):
    if user is None or password is None:
        return requests.get(url, allow_redirects=allow_redirects)
    return requests.get(url, auth=(user, password), allow_redirects=allow_redirects)


def post_response(url: str, user: str = None, password: str = None, allow_redirects=False):
    if user is None or password is None:
        return requests.post(url, allow_redirects=allow_redirects)
    return requests.post(url, auth=(user, password), allow_redirects=allow_redirects)


# def read_archive(directory: str, filename: str):
#     tar = tarfile.open(directory + filename)
#     return [tar.extractfile(i) for i in tar.getmembers()]

def read_archive(archive: IO):
    tar = tarfile.open(fileobj=archive)
    return [tar.extractfile(i) for i in tar.getmembers()][1:]


def save_cookies(cookiejar, filename):
    with open(filename, 'wb') as f:
        pickle.dump(cookiejar, f)


def load_cookies(filename):
    with open(filename, 'rb') as f:
        return pickle.load(f)
