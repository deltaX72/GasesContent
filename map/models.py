from django.db import models

from gasescontent.constants import \
    MAX_GAS_NAME_LENGTH, \
    MAX_GOSAT_DATA_VERSION_FIELD_LENGTH, \
    MAX_SATELLITE_NAME_LENGTH


class UserInputData(models.Model):
    minimal_latitude = models.FloatField()
    maximal_latitude = models.FloatField()
    minimal_longitude = models.FloatField()
    maximal_longitude = models.FloatField()
    date_from = models.DateField()
    date_to = models.DateField()

    satellites = models.CharField(max_length=8, choices=[
        ('GOSAT', 'GOSAT'),
        ('OCO-2', 'OCO-2'),
        ('GOSAT-2', 'GOSAT-2'),
        ('OCO-3', 'OCO-3')
    ], default='GOSAT')

    quality = models.CharField(max_length=25, choices=[
        ('High', 8),
        ('Medium', 16),
        ('Real data', 4)
    ], default='High')


class UserOutputData(models.Model):
    data = models.ForeignKey('GridRowData', on_delete=models.CASCADE)


class GridRowData(models.Model):
    column = models.ForeignKey('GridColumnData', on_delete=models.CASCADE)


class GridColumnData(models.Model):
    pixel = models.ForeignKey('PixelData', on_delete=models.CASCADE)


class PixelData(models.Model):
    x = models.IntegerField()
    y = models.IntegerField()

    latitude = models.FloatField()
    longitude = models.FloatField()

    gas_content = models.FloatField()


class Satellite(models.Model):
    satellite_name = models.CharField(max_length=MAX_SATELLITE_NAME_LENGTH, verbose_name='satellite_name')
    gas_name = models.CharField(max_length=MAX_GAS_NAME_LENGTH, verbose_name='gas_name')

    @classmethod
    def create(cls, satellite_name: str, gas_name: str):
        return cls(satellite_name, gas_name)

    class Meta:
        managed = True
        db_table = 'satellite_data'


class Accuracy(models.Model):
    satellite_id = models.ForeignKey("Satellite", on_delete=models.CASCADE, verbose_name='ID')
    accuracy_value = models.CharField(max_length=32)
    pixel_size = models.IntegerField()

    @classmethod
    def create(cls, accuracy_value, pixel_size):
        return cls(accuracy_value, pixel_size)

    class Meta:
        managed = True
        db_table = 'accuracy_data'


class GOSATDataQuerySet(models.QuerySet):
    def get_unique_by_time(self, time):
        return self.filter(time=time)


class GOSATDataManager(models.Manager):
    def get_queryset(self):
        return GOSATDataQuerySet(self.model, using=self._db)

    def get_rows_by_time_unique(self, time):
        return self.get_queryset().get_unique_by_time(time)


class OCO2DataQuerySet(models.QuerySet):
    def get_unique_by_time(self, time):
        return self.filter(time=time)


class OCO2DataManager(models.Manager):
    def get_queryset(self):
        return OCO2DataQuerySet(self.model, using=self._db)

    def get_rows_by_time_unique(self, time):
        return self.get_queryset().get_unique_by_time(time)


class GOSATData(models.Model):
    year = models.IntegerField()
    month = models.IntegerField()
    day = models.IntegerField()
    hour = models.IntegerField()
    minute = models.IntegerField()
    second = models.IntegerField()
    time = models.IntegerField(primary_key=True, unique=True)
    gas_name = models.CharField(max_length=MAX_GAS_NAME_LENGTH)
    latitude = models.FloatField()
    longitude = models.FloatField()
    gas_content = models.FloatField()
    data_version = models.CharField(max_length=MAX_GOSAT_DATA_VERSION_FIELD_LENGTH)

    data = GOSATDataManager()

    @classmethod
    def create(cls, year, month, day, hour, minute, second, time, gas_name, latitude, longitude, gas_content, data_version):
        return cls(
            year, month, day, hour, minute, second, time, gas_name, latitude, longitude, gas_content, data_version
        )

    class Meta:
        managed = True
        db_table = 'gosat_data'


class OCO2Data(models.Model):
    year = models.IntegerField()
    month = models.IntegerField()
    day = models.IntegerField()
    hour = models.IntegerField()
    minute = models.IntegerField()
    second = models.IntegerField()
    time = models.IntegerField()
    gas_name = models.CharField(max_length=MAX_GAS_NAME_LENGTH)
    latitude = models.FloatField()
    longitude = models.FloatField()
    gas_content = models.FloatField()

    data = OCO2DataManager()

    @classmethod
    def create(cls, year, month, day, time, gas_name, latitude, longitude, gas_content):
        return cls(
            year, month, day, time, gas_name, latitude, longitude, gas_content
        )

    class Meta:
        managed = True
        db_table = 'oco2_data'
