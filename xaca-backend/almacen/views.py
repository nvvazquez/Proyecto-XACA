from django.utils import timezone
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.views import APIView
from .models import Categoria, Subcategoria, Tipo, Proveedor, Prenda
from .serializers import CategoriaSerializer, SubcategoriaSerializer, TipoSerializer, ProveedorSerializer, PrendaSerializer
from rest_framework.response import Response

# Create your views here.

# - Categorias ----------------------
class CategoriaListView(APIView):
    """GET /api/categorias/"""
    def get(self, request):
        categorias = Categoria.objects.all()
        serializer = CategoriaSerializer(categorias, many=True)
        return Response(serializer.data)
    
class CategoriaDetailView(APIView):
    """GET /api/categorias/{id}/"""
    def get(self, request, pk):
        categoria = get_object_or_404(Categoria, pk=pk)
        serializer = CategoriaSerializer(categoria)
        return Response(serializer.data)
    
class CategoriaSubcategoriasView(APIView):
    """GET /api/categorias/{id}/subcategorias/"""
    def get(self, request, pk):
        categoria = get_object_or_404(Categoria, pk=pk)
        subcategorias = categoria.subcategorias.all()
        serializer = SubcategoriaSerializer(subcategorias, many=True)
        return Response(serializer.data)


# - Subcategorias ----------------------
class SubcategoriaTiposView(APIView):
    """GET /api/subcategorias/{id}/tipos/"""
    def get(self, request, pk):
        subcategoria = get_object_or_404(Subcategoria, pk=pk)
        tipos = subcategoria.tipos.all()
        serializer = TipoSerializer(tipos, many=True)
        return Response(serializer.data)


# - Tipos ----------------------
class TipoDetailView(APIView):
    """GET /api/tipos/{id}"""
    def get(self, request, pk):
        tipo = get_object_or_404(Tipo, pk=pk)
        serializer = TipoSerializer(tipo)
        return Response(serializer.data)

class TipoPrendasView(APIView):
    """
        GET /api/tipos/{id}/prendas/
        POST /api/tipos/{id}/prendas/
    """
    def get(self, request, pk):
        tipo = get_object_or_404(Tipo, pk=pk)
        prendas = tipo.prendas.all()
        serializer = PrendaSerializer(prendas, many=True)
        return Response(serializer.data)
    
    def post(self, request, pk):
        tipo = get_object_or_404(Tipo, pk=pk)
        data = request.data.copy()
        data['tipo'] = tipo.id
        serializer = PrendaSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# - Prendas ----------------------
class PrendaListView(APIView):
    """ 
        GET /api/prendas/?prestado=true
        GET /api/prendas/?prestado=true&id_categoria=1
    """
    def get(self, request):
        prestado = request.query_params.get('prestado')

        if prestado is None:
            return Response(
                {'error': 'Este endpoint requiere el parámetro prestado'},
                status=status.HTTP_400_BAD_REQUEST
            )
    
        prendas = Prenda.objects.filter(prestado=prestado.lower() == 'true')

        id_categoria = request.query_params.get('id_categoria')
        if id_categoria:
            prendas = prendas.filter(tipo__subcategoria__categoria_id=id_categoria)

        prendas = prendas.order_by('fecha_prestamo')

        serializer = PrendaSerializer(prendas, many=True)
        return Response(serializer.data)

class PrendaDetailView(APIView):
    """
        PUT /api/prendas/{id}/
        DELETE /api/prendas/{id}/ 
    """

    def put(self, request, pk):
        prenda = get_object_or_404(Prenda, pk=pk)
        serializer = PrendaSerializer(prenda, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        prenda = get_object_or_404(Prenda, pk=pk)
        prenda.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class PrendaEstadoView(APIView):
    """
        PATCH /api/prendas/{id}/estado/
    """
    def patch(self, request, pk):
        prenda = get_object_or_404(Prenda, pk=pk)
        prestado = request.data.get('prestado')

        if prestado is None:
            return Response(
                {'error': 'El campo prestado es requerido'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if prestado and prenda.prestado:
            return Response(
                {'error': 'La prenda ya está prestada'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not prestado and not prenda.prestado:
            return Response(
                {'error': 'La prenda ya está disponible'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        prenda.prestado = prestado
        if prestado:
            prenda.fecha_prestamo = timezone.now().date()
        else:
            prenda.fecha_prestamo = None
        prenda.save()

        serializer = PrendaSerializer(prenda)
        return Response(serializer.data)
    
class PrendaProveedoresView(APIView):
    """
        GET /api/prendas/{id}/proveedores/
    """
    def get(self, request, pk):
        prenda = get_object_or_404(Prenda, pk=pk)
        proveedores = prenda.proveedores.all()
        serializer = ProveedorSerializer(proveedores, many=True)
        return Response(serializer.data)


# - Proveedores ----------------------
class ProveedorListView(APIView):
    """
        GET /api/proveedores/
        POST /api/proveedores/
    """
    def get(self, request):
        proveedores = Proveedor.objects.all()
        serializer = ProveedorSerializer(proveedores, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ProveedorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProveedorDetailView(APIView):
    """
        PUT /api/proveedores/{id}/
        DELETE /api/proveedores/{id}/ 
    """
    def put(self, request, pk):
        proveedor = get_object_or_404(Proveedor, pk=pk)
        serializer = ProveedorSerializer(proveedor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        proveedor = get_object_or_404(Proveedor, pk=pk)
        proveedor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)