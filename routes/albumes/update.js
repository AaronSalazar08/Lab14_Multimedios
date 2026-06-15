import { getBySlug, update } from '../../data/albumes.js';
import { updateSchema } from './update.schema.js';

export function updateHandler(req, res) {
  const { slug } = req.params;

  if (!getBySlug(slug)) {
    return res.status(404).json({ error: `No se encontró el álbum con slug "${slug}"` });
  }

  const result = updateSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message });
  }

  const updated = update(slug, result.data);
  res.json(updated);
}
