# DiscoStore API

API REST para administrar el catálogo de álbumes de una tienda de música.

## Requisitos

- Node.js 22.5 o superior
- pnpm 10.x

## Instalación

```bash
pnpm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=4321
HOST=localhost
```

## Poblar la base de datos

```bash
pnpm run seed
```

Este comando lee `data/albumes.json` y crea/recrea `data/albumes.db`.

## Ejecutar el servidor

```bash
pnpm run dev
```

El servidor queda disponible en `http://localhost:4321`.

## Rutas disponibles

| Método | Ruta              | Descripción                                      |
| ------ | ----------------- | ------------------------------------------------ |
| GET    | `/`               | Info general del API                             |
| GET    | `/albumes`        | Lista de slugs de todos los álbumes              |
| GET    | `/album/:slug`    | Detalle de un álbum                              |
| GET    | `/genero/:genero` | Slugs de álbumes de ese género                   |
| GET    | `/search/:text`   | Búsqueda por texto (mín. 3 caracteres)           |
| POST   | `/albumes`        | Crea un nuevo álbum                              |
| PUT    | `/album/:slug`    | Actualiza un álbum existente                     |
| DELETE | `/album/:slug`    | Elimina un álbum                                 |
| GET    | `/imagenes/*`     | Imágenes estáticas                               |
