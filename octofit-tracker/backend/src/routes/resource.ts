import { Router } from 'express';
import type { Model } from 'mongoose';

export function createResourceRouter(model: Model<any>) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      const resource = await model.create(request.body);
      response.status(201).json(resource);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (request, response, next) => {
    try {
      const resource = await model.findById(request.params.id).lean();
      if (!resource) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(resource);
    } catch (error) {
      next(error);
    }
  });

  router.patch('/:id', async (request, response, next) => {
    try {
      const resource = await model
        .findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
        .lean();
      if (!resource) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(resource);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (request, response, next) => {
    try {
      const result = await model.findByIdAndDelete(request.params.id);
      if (!result) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  return router;
}