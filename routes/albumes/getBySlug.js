import { getBySlug } from '../../data/albumes.js';

export function getBySlugHandler(req, res) {
  const { slug } = req.params;
  const album = getBySlug(slug);
  if (!album) {
    return res.status(404).json({ error: `No se encontró el álbum con slug "${slug}"` });
  }
  res.json(album);
}
