from rest_framework import routers
from .views import UserOutputDataViewSet, UserInputDataViewSet

router = routers.SimpleRouter()
router.register('output_data', UserOutputDataViewSet, basename='output_data')
router.register('input_data', UserInputDataViewSet, basename='input_data')


urlpatterns = []
urlpatterns += router.urls
