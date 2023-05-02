import datetime

import django_filters.rest_framework
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, redirect, render
from rest_framework import generics, viewsets

from .forms import CrearUsuarioForm
from .models import cuenta
from .serializer import CuentaSerializer, userSerializer


# Create your views here.


def index(request):
    return render(request, 'index.html', {'usuario': None, 'cuenta': None})


def signup(request):

    if request.method == 'GET':
        return render(request, './signup.html', {'form': CrearUsuarioForm})
    else:
        if request.POST['password1'] == request.POST['password2']:
            try:
                user = User.objects.create_user(
                    username=request.POST['username'], password=request.POST['password2'], first_name=request.POST['first_name'],
                    last_name=request.POST['last_name'], email=request.POST['email']
                )
                user.save()
                hora_actual = datetime.datetime.now()
                cta = str(hora_actual).replace("-", "")
                cta = cta.replace(" ", "")
                cta = cta.replace(":", "")
                cta = cta.replace(".", "")
                print(hora_actual)
                c = cuenta.objects.create(
                    NUMERO_CUENTA=cta, VALOR_CUENTA=request.POST['valor'], FECHA_CREACION=str(hora_actual), ESTADO='ACTIVO',
                    USUARIO=user)
                c.save()
                valor_total = "{:,}".format(c.VALOR_CUENTA)
                login(request, user)
                return render(request, 'index', {'usuario': user, 'cuenta': c, 'valor': valor_total})
            except Exception as e:
                print(e)
                return render(request, 'signup.html', {'form': CrearUsuarioForm, 'error': 'Error del Procesado'})
        else:
            return render(request, 'signup.html', {'form': CrearUsuarioForm, 'error': 'Contraseñas no coinciden'})


@login_required
def signout(request):
    logout(request)
    return redirect('login')


def signin(request):
    if request.method == 'GET':
        form = AuthenticationForm
        return render(request, 'signin.html', {'form': form})
    else:
        user = authenticate(
            request, username=request.POST['username'], password=request.POST['password'])
        if user is None:
            form = AuthenticationForm
            return render(request, 'signin.html', {'form': form, 'error': 'Usario o Clave Incorrecta!'})
        else:
            login(request, user)
            c = cuenta.objects.get(USUARIO=user)
            us = User.objects.get(username=user)
            valor_total = "{:,}".format(c.VALOR_CUENTA)

            return render(request, 'index.html', {'usuario': us, 'cuenta': c, 'valor': valor_total})


def consultar_saldo(request):
    if request.method == 'GET':
        return render(request, 'consultar_saldo.html')
    else:
        numero_cuenta = request.POST['numero_cuenta']
        c = cuenta.objects.get(NUMERO_CUENTA=numero_cuenta)
        if c is None:
            return render(request, 'consultar_saldo.html', {'error': 'Validar el numero de cuenta ya que no existe.'})
        else:
            us = User.objects.get(username=c.USUARIO)
            valor_total = "{:,}".format(c.VALOR_CUENTA)
            return render(request, 'consultado.html', {'usuario': us, 'cuenta': c, 'valor': valor_total})


def consignar(request):
    if request.method == 'GET':
        return render(request, 'consignar.html')
    else:
        numero_cuenta = request.POST['numero_cuenta']
        c = cuenta.objects.get(NUMERO_CUENTA=numero_cuenta)
        if c is None:
            return render(request, 'consignar.html', {'error': 'Validar el numero de cuenta ya que no existe.'})
        else:
            us = User.objects.get(username=c.USUARIO)
            valor_consignado = int(request.POST['valor'])
            valor_inicial = c.VALOR_CUENTA

            c.VALOR_CUENTA = valor_inicial + valor_consignado

            c.save()
            valor = "{:,}".format(valor_consignado)
            return render(request, 'consignar.html', {'ok': 'Se realizo la consignacion a la cuenta ' + c.NUMERO_CUENTA + ' por el valor $' + valor + ' correctamente.'})


def retirar(request):
    if request.method == 'GET':
        return render(request, 'retirar.html')
    else:
        numero_cuenta = request.POST['numero_cuenta']
        c = cuenta.objects.get(NUMERO_CUENTA=numero_cuenta)
        if c is None:
            return render(request, 'retirar.html', {'error': 'Validar el numero de cuenta ya que no existe.'})
        else:
            us = User.objects.get(username=c.USUARIO)

            valor_retirado = int(request.POST['valor'])
            valor_inicial = c.VALOR_CUENTA

            c.VALOR_CUENTA = valor_inicial - valor_retirado
            c.save()

            valor_total = "{:,}".format(c.VALOR_CUENTA)

            return render(request, 'consultado.html', {'usuario': us, 'cuenta': c, 'valor': valor_total, 'ok': 'Se realizo el retiro de la cuenta ' + numero_cuenta + ' por un valor de $' + str(valor_retirado)})


# API REST
class UserApiView(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = userSerializer

    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['username','id']
    


class CuentaApiView(viewsets.ModelViewSet):
    
    queryset = cuenta.objects.all()
    serializer_class = CuentaSerializer

    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['NUMERO_CUENTA', 'USUARIO']
    