# Proyecto-XACA

## Descripicón del proyecto
Aplicación web para la gestión del almacén interno de ropa de una asociación cultural de baile y música tradicional gallega.

Permite controlar el inventario de prendas por tipo, categoría y subcategoría, registrar préstamos y devoluciones, y gestionar los proveedores y su relación con las prendas del almacén.

## Índice

1. [Tecnologías](#tecnologías)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Instalación y puesta en marcha](#instalación-y-puesta-en-marcha)
   - [Backend](#backend)
   - [Frontend](#frontend)
4. [API — Endpoints](#api--endpoints)
   - [Categorías](#categorías)
   - [Subcategorías](#subcategorías)
   - [Tipos](#tipos)
   - [Prendas](#prendas)
   - [Proveedores](#proveedores)
5. [Funcionalidades principales](#funcionalidades-principales)
6. [Autores](#autores)
7. [Licencia](#licencia)

---

## Tecnologías

### Backend
| Tecnología | Versión |
|---|---|
| Python | 3.11 o superior |
| Django | 4.2 LTS |
| Django REST Framework | 3.14 o superior |
| django-cors-headers | 4.x |
| SQLite | Incluida en Python |

### Frontend
| Tecnología | Versión |
|---|---|
| Node.js | 18 LTS o superior |
| npm | incluido con Node.js |
| Vite | 5.x |
| React | 18.x |
| react-router-dom | 6.x |
| axios | 1.x |

---

## Estructura del proyecto

```
Proyecto-XACA/
├── xaca-backend/
│   ├── manage.py
│   ├── db.sqlite3
│   ├── requirements.txt
│   ├── config/
│   └── almacen/
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       ├── urls.py
│       └── ...
└── xaca-frontend/
    ├── node-modules/
    ├── public/
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        └── hooks/
```

---

## Instalación y puesta en marcha

### Requisitos previos
- Python 3.11 o superior
- Node.js 18 o superior
- pip

---

### Backend

**1. Clonar el repositorio**
```bash
git clone https://github.com/nvvazquez/Proyecto-XACA.git
cd Proyecto-XACA/xaca-backend
```

**2. Crear y activar el entorno virtual**
```bash
python -m venv venv

# Linux / macOS
source venv/bin/activate

# Windows
venv\Scripts\activate
```

**3. Instalar dependencias**
```bash
pip install -r requirements.txt
```

**4. Aplicar migraciones y arrancar**
```bash
python manage.py migrate
python manage.py runserver
```

El backend quedará disponible en `http://localhost:8000`.

---

### Frontend

```bash
cd ../frontend
npm install
npm run dev
```

El frontend quedará disponible en `http://localhost:5173`.

---

## API — Endpoints

### Categorías
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/categorias/` | Devuelve el listado de todas las categorías |
| GET | `/api/categorias/{id}/` | Devuelve el detalle de una categoría |
| GET | `/api/categorias/{id}/subcategorias/` | Devuelve las subcategorías de una categoría |

### Subcategorías
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/subcategorias/{id}/tipos/` | Devuelve los tipos de una subcategoría |

### Tipos
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/tipos/{id}/` | Devuelve el detalle de un tipo |
| GET | `/api/tipos/{id}/prendas/` | Devuelve las prendas de un tipo |
| POST | `/api/tipos/{id}/prendas/` | Crea una prenda dentro de un tipo |

### Prendas
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/prendas/?prestado=true\|false` | Devuelve las prendas filtradas por estado de préstamo |
| GET | `/api/prendas/?prestado=true&id_categoria={id}` | Devuelve las prendas prestadas filtradas por categoría |
| GET | `/api/prendas/?search={codigo}` | Busca prendas por código |
| PUT | `/api/prendas/{id}/` | Actualiza los datos de una prenda |
| DELETE | `/api/prendas/{id}/` | Elimina una prenda |
| PATCH | `/api/prendas/{id}/estado/` | Cambia el estado de préstamo de una prenda |
| GET | `/api/prendas/{id}/proveedores/` | Devuelve los proveedores vinculados a una prenda |
| POST | `/api/prendas/{id}/proveedores/` | Vincula un proveedor a una prenda |
| DELETE | `/api/prendas/{id}/proveedores/{proveedor_id}/` | Desvincula un proveedor de una prenda |

### Proveedores
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/proveedores/` | Devuelve el listado de todos los proveedores |
| POST | `/api/proveedores/` | Crea un nuevo proveedor |
| PUT | `/api/proveedores/{id}/` | Actualiza los datos de un proveedor |
| DELETE | `/api/proveedores/{id}/` | Elimina un proveedor |
| GET | `/api/proveedores/{id}/prendas/` | Devuelve las prendas vinculadas a un proveedor |

---

## Funcionalidades principales

- Navegación por categorías, subcategorías y tipos de prenda
- Gestión completa de prendas: creación, edición, eliminación y cambio de estado
- Registro de préstamos y devoluciones con fecha y control de días
- Filtrado de prendas prestadas por categoría y búsqueda por código
- Gestión de proveedores con estado activo/inactivo
- Vinculación N:M entre prendas y proveedores

---

## Autores
| [<img src="https://github.com/nvvazquez.png" width=115><br><sub>Nicolás Vázquez Vázquez</sub>](https://github.com/nvvazquez)
| :---: |

---
## Licencia

Uso interno — Asociación Cultural Xacarandaina.
