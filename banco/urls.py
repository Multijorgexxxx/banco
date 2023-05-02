"""banco URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from login import views
from login import urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    # LOGIN
    path('crear_cuenta/', views.signup, name='crear_cuenta'),
    path('login/', views.signin, name='login'),
    path('cerrar_sesion/', views.signout, name='signout'),
    path('consultar_saldo/', views.consultar_saldo, name='consultar_saldo'),
    path('consignar/', views.consignar, name='consignar'),
    path('retirar/', views.retirar, name='retirar'),
    #REST
    path('banco/', include('login.urls'))
]
