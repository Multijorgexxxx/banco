from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from login import views

#api versions
routers = routers.DefaultRouter()
routers.register(r'user',views.UserApiView, 'User')
routers.register(r'cuenta',views.CuentaApiView, 'cuenta')

urlpatterns=[
    path("api/v1/", include(routers.urls)),
    path("docs/", include_docs_urls(title="LOGIN API"))
]