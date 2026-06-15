import { search } from '../../data/albumes.js';
import { searchSchema } from './search.schema.js';

export function searchHandler(req, res) {
  const result = searchSchema.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message });
  }
  res.json(search(result.data.text));
}
