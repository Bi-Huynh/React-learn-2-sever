import express from 'express';
// import multer from 'multer';
import * as musicController from './controller.mjs';

const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

router.route('/:id').get(musicController.getId);
router.route('/store').post(musicController.create);
// router.route('/store').post(upload.single('img'), musicController.create);

export { router };
