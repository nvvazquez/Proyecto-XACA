from django.urls import path
from . import views

urlpatterns = [
    # Categorias
    path('categorias/', views.CategoriaListView.as_view()),
    path('categorias/<int:pk>/', views.CategoriaDetailView.as_view()),
    path('categorias/<int:pk>/subcategorias/', views.CategoriaSubcategoriasView.as_view()),

    # Subcategorias
    path('subcategorias/<int:pk>/tipos/', views.SubcategoriaTiposView.as_view()),

    # Tipos
    path('tipos/<int:pk>/prendas/', views.TipoPrendasView.as_view()),

    # Prendas
    path('prendas/', views.PrendaListView.as_view()),
    path('prendas/<int:pk>/', views.PrendaDetailView.as_view()),
    path('prendas/<int:pk>/estado/', views.PrendaEstadoView.as_view()),
    path('prendas/<int:pk>/proveedores/', views.PrendaProveedoresView.as_view()),

    # Proveedores
    path('proveedores/', views.ProveedorListView.as_view()),
    path('proveedores/<int:pk>/', views.ProveedorDetailView.as_view()),
]