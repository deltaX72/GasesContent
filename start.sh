#!/bin/bash

python3.9 manage.py makemigrations
python3.9 manage.py migrate
python3.9 manage.py runserver 0.0.0.0:80