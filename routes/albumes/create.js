import { slugExists, create } from '../../data/albumes.js';
import { createSchema } from './create.schema.js';

export function createHandler(req, res) {
  const result = createSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message });
  }

  const album = result.data;

  if (slugExists(album.slug)) {
    return res.status(409).json({ error: `Ya existe un álbum con el slug "${album.slug}"` });
  }

  const created = create(album);
  res.status(201).location(`/album/${created.slug}`).json(created);
}
