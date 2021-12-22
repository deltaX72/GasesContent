from rest_framework import serializers
from ..models import UserInputData, UserOutputData


class UserOutputDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserOutputData
        fields = '__all__'


class UserInputDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserInputData
        fields = '__all__'
