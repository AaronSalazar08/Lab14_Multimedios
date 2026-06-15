import { getBySlug, remove } from '../../data/albumes.js';

export function deleteHandler(req, res) {
  const { slug } = req.params;

  if (!getBySlug(slug)) {
    return res.status(404).json({ error: `No se encontró el álbum con slug "${slug}"` });
  }

  remove(slug);
  res.status(204).send();
}
