import Candidate from '../models/Candidate.js';
import asyncHandler from 'express-async-handler';


const createCandidate = asyncHandler(async (req, res) => {
    const {
        fullName,
        email,
        phone,
        experience,
        currentCompany,
        skills,
        resumeLink
    } = req.body;

    let skillsArray = skills;
    if (typeof skills === 'string') {
        skillsArray = skills.split(',').map(skill => skill.trim());
    }

    const candidate = await Candidate.create({
        fullName,
        email,
        phone,
        experience,
        currentCompany,
        skills: skillsArray,
        resumeLink
    });

    if (candidate) {
        res.status(201).json(candidate);
    } else {
        res.status(400);
        throw new Error('Invalid candidate data');
    }
});

const getCandidates = asyncHandler(async (req, res) => {
    const candidates = await Candidate.find({});
    res.json(candidates);
});

const getCandidateById = asyncHandler(async (req, res) => {
    const candidate = await Candidate.findById(req.params.id);

    if (candidate) {
        res.json(candidate);
    } else {
        res.status(404);
        throw new Error('Candidate not found');
    }
});


export {
    createCandidate,
    getCandidates,
    getCandidateById
};
