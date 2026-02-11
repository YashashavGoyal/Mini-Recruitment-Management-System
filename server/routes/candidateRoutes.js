import express from 'express';
import {
    createCandidate,
    getCandidates,
    getCandidateById
} from '../controllers/candidateController.js';

const router = express.Router();

router.route('/')
    .post(createCandidate)
    .get(getCandidates);

router.route('/:id')
    .get(getCandidateById);

export default router;
