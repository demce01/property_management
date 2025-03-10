from rest_framework import viewsets
from django.shortcuts import render
from .models import Klient, Prona, Rezervim, Pagesa, Mirembajtje
from .serializers import (
    KlientSerializer, 
    PronaSerializer, 
    RezervimSerializer, 
    PagesaSerializer, 
    MirembajtjeSerializer
)

# API Views (REST Framework)
class KlientViewSet(viewsets.ModelViewSet):
    queryset = Klient.objects.all()
    serializer_class = KlientSerializer

class PronaViewSet(viewsets.ModelViewSet):
    queryset = Prona.objects.all()
    serializer_class = PronaSerializer

class RezervimViewSet(viewsets.ModelViewSet):
    queryset = Rezervim.objects.all()
    serializer_class = RezervimSerializer

class PagesaViewSet(viewsets.ModelViewSet):
    queryset = Pagesa.objects.all()
    serializer_class = PagesaSerializer

class MirembajtjeViewSet(viewsets.ModelViewSet):
    queryset = Mirembajtje.objects.all()
    serializer_class = MirembajtjeSerializer

# Frontend Views (Django Templates)
def home_view(request):
    return render(request, 'home.html')
def klientet_view(request):
    return render(request, 'klientet.html')

def pronat_view(request):
    return render(request, 'pronat.html')

def rezervimet_view(request):
    return render(request, 'rezervimet.html')

def pagesat_view(request):
    return render(request, 'pagesat.html')

def mirembajtjet_view(request):
    return render(request, 'mirembajtjet.html')

def home_view(request):
    return render(request, 'home.html')  # Krijo një home.html nëse dëshiron