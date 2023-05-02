from rest_framework import serializers
from .models import cuenta
from django.contrib.auth.models import User



class CuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = cuenta
        fields = '__all__'



class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'