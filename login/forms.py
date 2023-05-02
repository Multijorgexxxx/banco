from tkinter import Widget
from django.contrib.auth.models import User
from django import forms
from .models import cuenta


class CrearUsuarioForm(forms.ModelForm):

    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", "email", "password")
        widgets = {
            'first_name': forms.TextInput(attrs={'class': 'form-control', 'required': '', 'autocomplete': 'off'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control', 'required': '', 'autocomplete': 'off'}),
            'email': forms.TextInput(attrs={'class': 'form-control', 'required': '', 'autocomplete': 'off', 'type': "email", 'aria-describedby': 'basic-addon2', 'aria-label': "Recipient's username"}),
            'username': forms.TextInput(attrs={'class': 'form-control', 'required': '', 'autocomplete': 'off'}),
            'password': forms.TextInput(attrs={'class': 'form-control', 'required': '', 'autocomplete': 'off', 'type': 'password'}),
        }
        labels = {
            'first_name': 'Nombre :',
            'last_name': 'Apellido :',
            'email': 'Correo Electronico :',
            'username': 'Usuario :',
            'password': 'Contraseña :',
        }


class LogUsuarioForm(forms.ModelForm):

    class Meta:
        model = User
        fields = ("username", "password")
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control', 'required': '', 'autocomplete': 'off'}),
            'password': forms.TextInput(attrs={'class': 'form-control', 'required': '', 'autocomplete': 'off', 'type': 'password'}),
        }
        labels = {
            'username': 'Usuario :',
            'password': 'Contraseña :',
        }

class TransaccionForm(forms.ModelForm):

    class Meta:
        model = cuenta
        fields = ("NUMERO_CUENTA", "VALOR_CUENTA")
        Widget = {
            'NUMERO_CUENTA': forms.TextInput(attrs={'class': 'form-control', 'required': '', 'autocomplete': 'off'}),
            'VALOR_CUENTA': forms.TextInput(attrs={'class': 'form-control', 'required': '', 'autocomplete': 'off', 'type':'number'}),
        }
        labels = {
            'NUMERO_CUENTA': 'Numero Cuenta :',
            'VALOR_CUENTA': 'Valor Transaccion :'
        }