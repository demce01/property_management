from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import home_view

router = DefaultRouter()
router.register(r'klientet', views.KlientViewSet)
router.register(r'pronat', views.PronaViewSet)
router.register(r'rezervimet', views.RezervimViewSet)
router.register(r'pagesat', views.PagesaViewSet)
router.register(r'mirembajtjet', views.MirembajtjeViewSet)

urlpatterns = [
    path('', home_view, name='home'),
    path('api/', include(router.urls)),
    path('klientet/', views.klientet_view, name='klientet'),
    path('pronat/', views.pronat_view, name='pronat'),
    path('rezervimet/', views.rezervimet_view, name='rezervimet'),
    path('pagesat/', views.pagesat_view, name='pagesat'),
    path('mirembajtjet/', views.mirembajtjet_view, name='mirembajtjet'),
    path('', views.home_view, name='home'),  # Optional
]