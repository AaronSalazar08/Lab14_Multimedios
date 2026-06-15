import { getByGenero } from '../../data/albumes.js';

export function getByGeneroHandler(req, res) {
  const { genero } = req.params;
  const slugs = getByGenero(genero);
  res.json(slugs);
}
