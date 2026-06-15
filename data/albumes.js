import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/albumes.db');

export function getAll() {
  return db
    .prepare('SELECT slug FROM albumes ORDER BY anio DESC')
    .all()
    .map((r) => r.slug);
}

export function getAllFull() {
  return db.prepare('SELECT * FROM albumes ORDER BY anio DESC').all();
}

export function getBySlug(slug) {
  return db.prepare('SELECT * FROM albumes WHERE slug = ?').get(slug);
}

export function getByGenero(genero) {
  return db
    .prepare('SELECT slug FROM albumes WHERE genero = ? ORDER BY anio DESC')
    .all(genero)
    .map((r) => r.slug);
}

export function search(text) {
  const like = `%${text}%`;
  return db
    .prepare(
      `SELECT * FROM albumes
       WHERE titulo      LIKE ?
          OR artista     LIKE ?
          OR genero      LIKE ?
          OR sello       LIKE ?
          OR resumen     LIKE ?
          OR descripcion LIKE ?
       ORDER BY anio DESC`
    )
    .all(like, like, like, like, like, like);
}

export function slugExists(slug) {
  return !!db.prepare('SELECT 1 FROM albumes WHERE slug = ?').get(slug);
}

export function create(album) {
  const stmt = db.prepare(`
    INSERT INTO albumes (titulo, artista, genero, anio, sello, pistas, imagen, slug, resumen, descripcion)
    VALUES (:titulo, :artista, :genero, :anio, :sello, :pistas, :imagen, :slug, :resumen, :descripcion)
  `);
  const result = stmt.run(album);
  return db.prepare('SELECT * FROM albumes WHERE id = ?').get(result.lastInsertRowid);
}

export function update(slug, album) {
  db.prepare(`
    UPDATE albumes
    SET titulo = :titulo, artista = :artista, genero = :genero, anio = :anio,
        sello = :sello, pistas = :pistas, imagen = :imagen,
        resumen = :resumen, descripcion = :descripcion
    WHERE slug = :slug
  `).run({ ...album, slug });
  return db.prepare('SELECT * FROM albumes WHERE slug = ?').get(slug);
}

export function remove(slug) {
  db.prepare('DELETE FROM albumes WHERE slug = ?').run(slug);
}
