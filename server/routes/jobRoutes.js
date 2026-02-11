import express from 'express';
import {
    createJob,
    getJobs,
    getJobById
} from '../controllers/jobController.js';
import { getJobApplications } from '../controllers/applicationController.js';

const router = express.Router();

router.route('/')
    .post(createJob)
    .get(getJobs);

router.route('/:id')
    .get(getJobById);

router.route('/:id/applications')
    .get(getJobApplications);

export default router;
