from django.forms import forms, ModelForm

from map.models import UserInputData


class UserInputForm(ModelForm):
    class Meta:
        model = UserInputData
