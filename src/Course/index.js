import express from 'express';
import * as courseController from './controller.js';

const router = express.Router();

router.route('/').get(courseController.getAll);
router
    .route('/:slug')
    .get(courseController.getCourseBySlug)
    .patch(courseController.update)
    .delete(courseController.deleted);
router.route('/store').post(courseController.create);

export { router };
