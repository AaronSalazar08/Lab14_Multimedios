import express from 'express';
import { cwd } from 'node:process';

export const imagenesHandler = express.static(`${cwd()}/public/imagenes`);
