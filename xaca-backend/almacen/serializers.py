from rest_framework import serializers
from .models import Categoria, Subcategoria, Tipo, Proveedor, Prenda

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'descripcion']

class SubcategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategoria
        fields = ['id', 'nombre', 'descripcion', 'categoria']

class TipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo
        fields = ['id', 'nombre', 'descripcion', 'subcategoria']

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = ['id', 'nombre', 'email', 'telefono', 'activo']

class PrendaSerializer(serializers.ModelSerializer):
    tipo_nombre = serializers.CharField(source='tipo.nombre', read_only=True)
    subcategoria_nombre = serializers.CharField(source='tipo.subcategoria.nombre', read_only=True)
    categoria_nombre = serializers.CharField(source='tipo.subcategoria.categoria.nombre', read_only=True)

    class Meta:
        model = Prenda
        fields = [
            'id',
            'codigo', 
            'medidas', 
            'color', 
            'prestado', 
            'fecha_prestamo', 
            'tipo', 
            'tipo_nombre',
            'subcategoria_nombre', 
            'categoria_nombre', 
            'proveedores'
            ]