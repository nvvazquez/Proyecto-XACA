from django.utils import timezone
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.views import APIView
from .models import Categoria, Subcategoria, Tipo, Proveedor, Prenda
from .serializers import CategoriaSerializer, SubcategoriaSerializer, TipoSerializer, ProveedorSerializer, PrendaSerializer
from rest_framework.response import Response
from django.db.models import Count

class CategoriaListView(APIView):

    def get(self, request):
        categorias = Categoria.objects.all()
        serializer = CategoriaSerializer(categorias, many=True)
        return Response(serializer.data)
    
class CategoriaDetailView(APIView):

    def get(self, request, pk):
        categoria = get_object_or_404(Categoria, pk=pk)
        serializer = CategoriaSerializer(categoria)
        return Response(serializer.data)
    
class CategoriaSubcategoriasView(APIView):

    def get(self, request, pk):
        categoria = get_object_or_404(Categoria, pk=pk)
        subcategorias = categoria.subcategorias.all()
        serializer = SubcategoriaSerializer(subcategorias, many=True)
        return Response(serializer.data)


class SubcategoriaTiposView(APIView):
    """GET /api/subcategorias/{id}/tipos/"""
    def get(self, request, pk):
        subcategoria = get_object_or_404(Subcategoria, pk=pk)
        tipos = subcategoria.tipos.all()
        serializer = TipoSerializer(tipos, many=True)
        return Response(serializer.data)


class TipoDetailView(APIView):

    def get(self, request, pk):
        tipo = get_object_or_404(Tipo, pk=pk)
        serializer = TipoSerializer(tipo)
        return Response(serializer.data)

class TipoPrendasView(APIView):

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

class PrendaListView(APIView):

    def get(self, request):
        prestado = request.query_params.get('prestado')
        search = request.query_params.get('search')

        if search:
            prendas = Prenda.objects.filter(codigo__icontains=search)
            serializer = PrendaSerializer(prendas, many=True)
            return Response(serializer.data)

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

    def get(self, request, pk):
        prenda = get_object_or_404(Prenda, pk=pk)
        proveedores = prenda.proveedores.all()
        serializer = ProveedorSerializer(proveedores, many=True)
        return Response(serializer.data)
    
    def post(self, request, pk):
        prenda = get_object_or_404(Prenda, pk=pk)
        proveedor_id = request.data.get('proveedor_id')
        if not proveedor_id:
            return Response({'error': 'proveedor_id requerido'}, status=status.HTTP_400_BAD_REQUEST)
        proveedor = get_object_or_404(Proveedor, pk=proveedor_id)
        if prenda.proveedores.filter(pk=proveedor_id).exists():
            return Response({'error': 'Este proveedor ya está vinculado'}, status=status.HTTP_400_BAD_REQUEST)
        prenda.proveedores.add(proveedor)
        return Response(status=status.HTTP_201_CREATED)

    def delete(self, request, pk, proveedor_id):
        prenda = get_object_or_404(Prenda, pk=pk)
        proveedor = get_object_or_404(Proveedor, pk=proveedor_id)
        if not prenda.proveedores.filter(pk=proveedor_id).exists():
            return Response({'error': 'Este proveedor no está vinculado'}, status=status.HTTP_400_BAD_REQUEST)
        prenda.proveedores.remove(proveedor)
        return Response(status=status.HTTP_204_NO_CONTENT)



class ProveedorListView(APIView):

    def get(self, request):
        proveedores = Proveedor.objects.annotate(num_prendas=Count('prendas'))
        serializer = ProveedorSerializer(proveedores, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ProveedorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProveedorDetailView(APIView):

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
    
class ProveedorPrendasView(APIView):
    
    def get(self, request, pk):
        proveedor = get_object_or_404(Proveedor, pk=pk)
        prendas = proveedor.prendas.all()
        serializer = PrendaSerializer(prendas, many=True)
        return Response(serializer.data)