import express from 'express';
import {
    createJob,
    getJobs,
    getJobById
} from '../controllers/jobController.js';

const router = express.Router();

router.route('/')
    .post(createJob)
    .get(getJobs);

router.route('/:id')
    .get(getJobById);

export default router;
