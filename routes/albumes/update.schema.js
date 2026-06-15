import { z } from 'zod';

export const updateSchema = z.object({
  titulo:      z.string().min(1, 'El título es obligatorio'),
  artista:     z.string().min(1, 'El artista es obligatorio'),
  genero:      z.string().min(1, 'El género es obligatorio'),
  anio:        z.number().int().min(1900, 'El año debe ser 1900 o posterior'),
  sello:       z.string().min(1, 'El sello discográfico es obligatorio'),
  pistas:      z.number().int().min(1, 'El número de pistas debe ser al menos 1'),
  imagen:      z.string().min(1, 'El nombre de imagen es obligatorio'),
  resumen:     z.string().min(1, 'El resumen es obligatorio'),
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
});
