from rest_framework import serializers
from .models import Klient, Prona, Rezervim, Pagesa, Mirembajtje

class KlientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Klient
        fields = '__all__'

class PronaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prona
        fields = '__all__'

class RezervimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rezervim
        fields = '__all__'

class PagesaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagesa
        fields = '__all__'

class MirembajtjeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mirembajtje
        fields = '__all__'