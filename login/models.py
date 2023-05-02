from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class cuenta(models.Model):
    ID = models.AutoField(primary_key=True)
    NUMERO_CUENTA = models.CharField(max_length=100)
    VALOR_CUENTA = models.IntegerField()
    FECHA_CREACION = models.DateTimeField(auto_now_add=True)
    ESTADO = models.CharField(max_length=20, default=None)
    USUARIO = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.USUARIO.username
