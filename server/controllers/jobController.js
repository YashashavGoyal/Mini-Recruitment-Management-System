import Job from '../models/Job.js';
import asyncHandler from 'express-async-handler';

const createJob = asyncHandler(async (req, res) => {
    const {
        jobTitle,
        department,
        location,
        employmentType,
        salaryRange,
        jobDescription,
        status
    } = req.body;

    const job = await Job.create({
        jobTitle,
        department,
        location,
        employmentType,
        salaryRange,
        jobDescription,
        status
    });

    if (job) {
        res.status(201).json(job);
    } else {
        res.status(400);
        throw new Error('Invalid job data');
    }
});

const getJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find({});
    res.json(jobs);
});

const getJobById = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (job) {
        res.json(job);
    } else {
        res.status(404);
        throw new Error('Job not found');
    }
});

export {
    createJob,
    getJobs,
    getJobById
};
