import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index.js';
import { FIXTURES } from './setup.js';

const SEEDED = FIXTURES[0];

describe('GET /albumes', () => {
  it('lista slugs: 200 y un arreglo que contiene un slug sembrado', async () => {
    const res = await request(app).get('/albumes');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toContain(SEEDED.slug);
  });
});

describe('GET /album/:slug', () => {
  it('slug existente: 200 y el objeto del álbum', async () => {
    const res = await request(app).get(`/album/${SEEDED.slug}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(SEEDED);
  });

  it('slug inexistente: 404 en JSON', async () => {
    const res = await request(app).get('/album/no-existe');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('GET /search/:text', () => {
  it('texto con menos de 3 caracteres: 400 en JSON', async () => {
    const res = await request(app).get('/search/ab');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('POST /albumes', () => {
  const nuevoAlbum = {
    titulo: 'Test Album',
    artista: 'Test Artist',
    genero: 'Test',
    anio: 2020,
    sello: 'Test Records',
    pistas: 8,
    imagen: 'test-album.avif',
    slug: 'test-album',
    resumen: 'Resumen de prueba',
    descripcion: 'Descripción de prueba',
  };

  it('cuerpo válido: 201, cabecera Location y objeto creado', async () => {
    const res = await request(app).post('/albumes').send(nuevoAlbum);

    expect(res.status).toBe(201);
    expect(res.headers.location).toBe(`/album/${nuevoAlbum.slug}`);
    expect(res.body).toMatchObject(nuevoAlbum);
  });

  it('cuerpo inválido: 400 en JSON', async () => {
    const res = await request(app).post('/albumes').send({ titulo: 'Incompleto' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('slug duplicado: 409 en JSON', async () => {
    const res = await request(app)
      .post('/albumes')
      .send({ ...nuevoAlbum, slug: SEEDED.slug });

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty('error');
  });
});

describe('PUT /album/:slug', () => {
  const cambios = {
    titulo: 'Thriller (Edición especial)',
    artista: SEEDED.artista,
    genero: SEEDED.genero,
    anio: SEEDED.anio,
    sello: SEEDED.sello,
    pistas: SEEDED.pistas,
    imagen: SEEDED.imagen,
    resumen: 'Resumen actualizado',
    descripcion: 'Descripción actualizada',
  };

  it('existente y válido: 200 y objeto actualizado', async () => {
    const res = await request(app).put(`/album/${SEEDED.slug}`).send(cambios);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ slug: SEEDED.slug, ...cambios });
  });

  it('inexistente: 404 en JSON', async () => {
    const res = await request(app).put('/album/no-existe').send(cambios);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('DELETE /album/:slug', () => {
  it('existente: 204 sin cuerpo', async () => {
    const res = await request(app).delete(`/album/${SEEDED.slug}`);

    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
    expect(res.text).toBe('');
  });

  it('inexistente: 404 en JSON', async () => {
    const res = await request(app).delete('/album/no-existe');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});
