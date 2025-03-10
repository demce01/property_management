from django.db import models

class Klient(models.Model):
    emri = models.CharField(max_length=100, verbose_name="Emri")
    email = models.EmailField(unique=True, verbose_name="Email")
    telefoni = models.CharField(max_length=15, verbose_name="Telefoni")
    adresa = models.TextField(verbose_name="Adresa")

    def __str__(self):
        return self.emri

    class Meta:
        verbose_name_plural = "Klientët"


class Prona(models.Model):
    STATUS_CHOICES = [
        ('disponueshme', 'Disponueshme'),
        ('e rezervuar', 'E Rezervuar'),
    ]

    emri = models.CharField(max_length=100, verbose_name="Emri")
    lokacioni = models.CharField(max_length=200, verbose_name="Lokacioni")
    cmimi = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        verbose_name="Çmimi"
    )
    statusi = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='disponueshme',
        verbose_name="Statusi"
    )

    def __str__(self):
        return f"{self.emri} - {self.lokacioni}"

    class Meta:
        verbose_name_plural = "Pronat"


class Rezervim(models.Model):
    klient = models.ForeignKey(
        Klient,
        on_delete=models.CASCADE,
        related_name='rezervimet',
        verbose_name="Klienti"
    )
    prona = models.ForeignKey(
        Prona,
        on_delete=models.CASCADE,
        related_name='rezervimet',
        verbose_name="Prona"
    )
    data_fillimi = models.DateField(verbose_name="Data Fillimit")
    data_mbarimi = models.DateField(verbose_name="Data Mbarimit")

    def __str__(self):
        return f"Rezervim #{self.id} - {self.klient.emri}"

    class Meta:
        verbose_name_plural = "Rezervimet"


class Pagesa(models.Model):
    rezervim = models.ForeignKey(
        Rezervim,
        on_delete=models.CASCADE,
        related_name='pagesat',
        verbose_name="Rezervimi"
    )
    shuma = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Shuma"
    )
    data_pageses = models.DateField(
        auto_now_add=True,
        verbose_name="Data e Pagesës"
    )

    def __str__(self):
        return f"Pagesa #{self.id} - {self.shuma}€"

    class Meta:
        verbose_name_plural = "Pagesat"


class Mirembajtje(models.Model):
    STATUS_CHOICES = [
        ('ne pritje', 'Në Pritje'),
        ('ne progres', 'Në Progres'),
        ('perfunduar', 'Përfunduar'),
    ]

    prona = models.ForeignKey(
        Prona,
        on_delete=models.CASCADE,
        related_name='mirembajtjet',
        verbose_name="Prona"
    )
    pershkrimi = models.TextField(verbose_name="Përshkrimi")
    data_kerkeses = models.DateField(
        auto_now_add=True,
        verbose_name="Data e Kërkesës"
    )
    statusi = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='ne pritje',
        verbose_name="Statusi"
    )

    def __str__(self):
        return f"Mirembajtje #{self.id} - {self.prona.emri}"

    class Meta:
        verbose_name_plural = "Mirëmbajtjet"