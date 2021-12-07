# pull official base image
FROM python:3.9

# set work directory
WORKDIR /usr/src/GasesContent

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/requirements.txt
RUN pip install -r /usr/src/requirements.txt

# copy project
COPY . /usr/src/GasesContent

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "127.0.0.1:8000"]