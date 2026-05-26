from django.db import models

# Create your models here.
class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)

    def __str__(self):
        return self.nombre
    
class Subcategoria(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT, related_name='subcategorias')

    def __str__(self):
        return f'{self.categoria} , {self.nombre}'

class Tipo(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    subcategoria = models.ForeignKey(Subcategoria, on_delete=models.PROTECT, related_name='tipos')

    def __str__(self):
        return f'{self.subcategoria} , {self.nombre}'
    
class Proveedor(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    telefono = models.CharField(max_length=20, blank=True)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
    
class Prenda(models.Model):
    codigo = models.CharField(max_length=50, unique=True)
    medidas = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    prestado = models.BooleanField(default=False)
    fecha_prestamo = models.DateField(blank=True, null=True)
    tipo = models.ForeignKey(Tipo, on_delete=models.PROTECT, related_name='prendas')
    proveedores = models.ManyToManyField(Proveedor, blank=True, related_name='prendas')

    def __str__(self):
        return f'{self.tipo} - {self.codigo} ({self.medidas} - {self.color})'