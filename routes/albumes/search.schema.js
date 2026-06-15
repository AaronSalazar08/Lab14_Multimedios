import { z } from 'zod';

export const searchSchema = z.object({
  text: z.string().min(3, 'El texto de búsqueda debe tener al menos 3 caracteres'),
});
