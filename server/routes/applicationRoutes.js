import express from 'express';
import { applyToJob } from '../controllers/applicationController.js';

const router = express.Router();

router.route('/')
    .post(applyToJob);

export default router;
