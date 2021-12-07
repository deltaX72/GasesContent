from django.db import models

from gasescontent.settings import MAX_GAS_NAME_LENGTH, MAX_SATELLITE_NAME_LENGTH, MAX_GOSAT_DATA_VERSION_FIELD_LENGTH


class UserInputData(models.Model):
    minimal_latitude = models.FloatField()
    maximal_latitude = models.FloatField()
    minimal_longitude = models.FloatField()
    maximal_longitude = models.FloatField()
    date_from = models.DateField()
    date_to = models.DateField()


class BaseSatelliteData(models.Model):
    year = models.IntegerField()
    month = models.IntegerField()
    day = models.IntegerField()
    time = models.TimeField()
    gas_name = models.CharField(max_length=MAX_GAS_NAME_LENGTH)
    latitude = models.FloatField()
    longitude = models.FloatField()
    content = models.FloatField()
    temperature = models.FloatField()

    class Meta:
        unique_together = (('year', 'month', 'day', 'time'),)
        db_table = 'base_satellite_data'
        abstract = True


class GOSATData(BaseSatelliteData):
    data_version = models.CharField(max_length=MAX_GOSAT_DATA_VERSION_FIELD_LENGTH)

    class Meta:
        db_table = 'gosat_data'


class OCO2Data(BaseSatelliteData):
    class Meta:
        db_table = 'oco2_data'
