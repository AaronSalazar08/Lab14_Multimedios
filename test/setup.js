process.env.NODE_ENV = 'test';

const TEST_DB_PATH = 'data/albumes.test.db';
process.env.ALBUMES_DB_PATH = TEST_DB_PATH;

import { beforeEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { rmSync } from 'node:fs';

rmSync(TEST_DB_PATH, { force: true });

const db = new DatabaseSync(TEST_DB_PATH);

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

export const FIXTURES = [
  {
    titulo: 'Thriller',
    artista: 'Michael Jackson',
    genero: 'Pop',
    anio: 1982,
    sello: 'Epic',
    pistas: 9,
    imagen: 'thriller.avif',
    slug: 'thriller',
    resumen: 'El álbum más vendido de la historia.',
    descripcion: 'Sexto álbum de estudio de Michael Jackson, publicado en 1982.',
  },
  {
    titulo: 'Back in Black',
    artista: 'AC/DC',
    genero: 'Rock',
    anio: 1980,
    sello: 'Atlantic',
    pistas: 10,
    imagen: 'back-in-black.avif',
    slug: 'back-in-black',
    resumen: 'El regreso triunfal de AC/DC tras la muerte de Bon Scott.',
    descripcion: 'Séptimo álbum de AC/DC, lanzado en 1980.',
  },
];

const insertFixture = db.prepare(`
  INSERT INTO albumes (titulo, artista, genero, anio, sello, pistas, imagen, slug, resumen, descripcion)
  VALUES (:titulo, :artista, :genero, :anio, :sello, :pistas, :imagen, :slug, :resumen, :descripcion)
`);

function resetDb() {
  db.exec('DELETE FROM albumes');
  for (const album of FIXTURES) {
    insertFixture.run(album);
  }
}

beforeEach(resetDb);
