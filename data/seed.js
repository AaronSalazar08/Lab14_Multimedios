import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';

const db = new DatabaseSync('data/albumes.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS albumes (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo      TEXT    NOT NULL,
    artista     TEXT    NOT NULL,
    genero      TEXT    NOT NULL,
    anio        INTEGER NOT NULL,
    sello       TEXT    NOT NULL,
    pistas      INTEGER NOT NULL,
    imagen      TEXT    NOT NULL,
    slug        TEXT    NOT NULL UNIQUE,
    resumen     TEXT    NOT NULL,
    descripcion TEXT    NOT NULL
  )
`);

const albumes = JSON.parse(readFileSync('data/albumes.json', 'utf-8'));

const insert = db.prepare(`
  INSERT OR REPLACE INTO albumes
    (titulo, artista, genero, anio, sello, pistas, imagen, slug, resumen, descripcion)
  VALUES
    (:titulo, :artista, :genero, :anio, :sello, :pistas, :imagen, :slug, :resumen, :descripcion)
`);

for (const album of albumes) {
  insert.run(album);
}

console.log(`Seed completado: ${albumes.length} álbumes insertados en data/albumes.db`);
db.close();
