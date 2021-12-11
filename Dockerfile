# pull official base image
FROM python:3.9

# set work directory
WORKDIR /usr/src/GasesContent

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/GasesContent
#RUN apt-get update && apt-get install -y python3-pymysql python3-mysqldb
RUN pip install -r /usr/src/GasesContent/requirements.txt

#RUN pip install mysqlclient cryptography
RUN pip install psycopg2

# copy project
COPY . /usr/src/GasesContent

EXPOSE 8000

CMD ["python3.9", "manage.py", "makemigrations"]
CMD ["python3.9", "manage.py", "migrate"]
CMD ["python3.9", "manage.py", "runserver", "0.0.0.0:8000"]