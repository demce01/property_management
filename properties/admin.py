from django.contrib import admin
from .models import Klient, Prona, Rezervim, Pagesa, Mirembajtje

# Regjistro çdo model që të shfaqet në admin panel
admin.site.register(Klient)
admin.site.register(Prona)
admin.site.register(Rezervim)
admin.site.register(Pagesa)
admin.site.register(Mirembajtje)