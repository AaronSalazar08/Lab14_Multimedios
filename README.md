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

## Pruebas

```bash
pnpm test
```

La suite usa **Vitest** como test runner y **Supertest** para hacer peticiones HTTP contra la app de Express sin levantar un servidor real.

### Aislamiento de la base de datos

Las pruebas nunca tocan `data/albumes.db` (la base de datos real). El archivo `test/setup.js` se registra como `setupFiles` en `vitest.config.js` y, antes de ejecutar los tests:

1. Define la variable de entorno `ALBUMES_DB_PATH=data/albumes.test.db`, que `data/albumes.js` lee para decidir qué archivo SQLite abrir (si no está definida, usa `data/albumes.db`).
2. Crea esa base de datos temporal con el esquema de la tabla `albumes`.
3. Antes de **cada** test (`beforeEach`), borra todas las filas y vuelve a insertar dos álbumes fijos (`thriller` y `back-in-black`), así cada prueba arranca desde el mismo estado conocido sin importar el orden en que corran ni lo que haya mutado la prueba anterior.

`index.js` exporta la app de Express (`export default app`) y solo llama a `app.listen` cuando `NODE_ENV !== 'test'`, para que Supertest pueda inyectar peticiones directamente sin abrir un puerto.

### Casos cubiertos (`test/albumes.test.js`)

| Operación              | Caso                       | Resultado esperado                          |
| ----------------------- | --------------------------- | --------------------------------------------- |
| `GET /albumes`          | Listar slugs                | 200 y un arreglo que contiene un slug sembrado |
| `GET /album/:slug`      | Slug existente               | 200 y el objeto del álbum                     |
| `GET /album/:slug`      | Slug inexistente             | 404 en JSON                                   |
| `GET /search/:text`     | Texto < 3 caracteres         | 400 en JSON                                   |
| `POST /albumes`         | Cuerpo válido                | 201, cabecera `Location` y objeto creado      |
| `POST /albumes`         | Cuerpo inválido              | 400 en JSON                                   |
| `POST /albumes`         | Slug duplicado               | 409 en JSON                                   |
| `PUT /album/:slug`      | Existente y válido           | 200 y objeto actualizado                      |
| `PUT /album/:slug`      | Inexistente                  | 404 en JSON                                   |
| `DELETE /album/:slug`   | Existente                    | 204 sin cuerpo                                |
| `DELETE /album/:slug`   | Inexistente                  | 404 en JSON                                   |
