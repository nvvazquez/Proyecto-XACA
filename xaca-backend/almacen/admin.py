from django.contrib import admin
from .models import Categoria, Subcategoria, Tipo, Proveedor, Prenda

# Register your models here.
admin.site.register(Categoria)

admin.site.register(Subcategoria)
class SubcategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria')
    list_filter = ('categoria')

admin.site.register(Tipo)
class TipoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'subcategoria')
    list_filter = ('subcategoria__categoria')

admin.site.register(Proveedor)

admin.site.register(Prenda)
class PrendaAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'tipo', 'medidas', 'color', 'prestado')
    list_filter = ('tipo__subcategoria__categoria', 'prestado')
    search_fields = ('codigo', 'color')
