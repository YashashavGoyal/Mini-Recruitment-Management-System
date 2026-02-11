import Application from '../models/Application.js';
import Job from '../models/Job.js';
import Candidate from '../models/Candidate.js';
import asyncHandler from 'express-async-handler';


const applyToJob = asyncHandler(async (req, res) => {
    const { jobId, candidateId, status } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
        res.status(404);
        throw new Error('Job not found');
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const existingApplication = await Application.findOne({ jobId, candidateId });
    if (existingApplication) {
        res.status(400);
        throw new Error('Candidate has already applied to this job');
    }

    const application = await Application.create({
        jobId,
        candidateId,
        status: status || 'Applied'
    });

    res.status(201).json(application);
});

const getJobApplications = asyncHandler(async (req, res) => {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) {
        res.status(404);
        throw new Error('Job not found');
    }

    const applications = await Application.find({ jobId })
        .populate('candidateId', 'fullName email phone experience currentCompany skills resumeLink')
        .sort('-applicationDate');

    res.json(applications);
});

export {
    applyToJob,
    getJobApplications
};
