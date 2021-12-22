from rest_framework import viewsets
from .serializers import UserInputDataSerializer, UserOutputDataSerializer
from ..models import UserInputData, UserOutputData


class UserOutputDataViewSet(viewsets.ModelViewSet):
    queryset = UserOutputData.objects.all()
    serializer_class = UserOutputDataSerializer


class UserInputDataViewSet(viewsets.ModelViewSet):
    queryset = UserInputData.objects.all()
    serializer_class = UserInputDataSerializer
