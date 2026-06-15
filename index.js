import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = process.env.PORT ?? 4321;
const HOST = process.env.HOST ?? 'localhost';

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    nombre: 'DiscoStore API',
    descripcion: 'API REST para el catálogo de álbumes de una tienda de música',
    rutas: [
      { metodo: 'GET',    ruta: '/albumes',        descripcion: 'Lista de slugs de todos los álbumes' },
      { metodo: 'GET',    ruta: '/albumes?include=full', descripcion: 'Lista completa con todos los campos' },
      { metodo: 'GET',    ruta: '/album/:slug',     descripcion: 'Detalle de un álbum' },
      { metodo: 'GET',    ruta: '/genero/:genero',  descripcion: 'Slugs de álbumes de ese género' },
      { metodo: 'GET',    ruta: '/search/:text',    descripcion: 'Búsqueda por texto (mín. 3 caracteres)' },
      { metodo: 'POST',   ruta: '/albumes',         descripcion: 'Crea un nuevo álbum' },
      { metodo: 'PUT',    ruta: '/album/:slug',     descripcion: 'Actualiza un álbum existente' },
      { metodo: 'DELETE', ruta: '/album/:slug',     descripcion: 'Elimina un álbum' },
      { metodo: 'GET',    ruta: '/imagenes/*',      descripcion: 'Imágenes estáticas' },
    ],
  });
});

// 404 catch-all
app.use((req, res) => {
  res.status(404).json({ error: `Ruta "${req.path}" no encontrada` });
});

app.listen(PORT, HOST, () => {
  console.log(`DiscoStore API corriendo en http://${HOST}:${PORT}`);
});
