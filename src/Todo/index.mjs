import express from 'express';
import * as todoController from './controller.mjs';

const router = express.Router();

router.get('/', todoController.getAll);
router.post('/store', todoController.create);
router.delete('/', todoController.deleteData);
router.delete('/:id', todoController.deleted);
router.patch('/', todoController.update);

export { router };
