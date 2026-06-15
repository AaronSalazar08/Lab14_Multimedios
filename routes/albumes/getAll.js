import { getAll, getAllFull } from '../../data/albumes.js';

export function getAllHandler(req, res) {
  if (req.query.include === 'full') {
    return res.json(getAllFull());
  }
  res.json(getAll());
}
