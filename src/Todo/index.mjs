import express from 'express';
import * as todoController from './controller.mjs';

const router = express.Router();

router
    .route('/')
    .get(todoController.getAll)
    .delete(todoController.deleteData)
    .patch(todoController.update);
router.route('/:id').delete(todoController.deleted);
router.route('/store').post(todoController.create);

export { router };
