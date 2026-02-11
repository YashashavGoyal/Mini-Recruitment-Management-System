import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    employmentType: {
        type: String,
        required: true,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'],
        default: 'Full-time'
    },
    salaryRange: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Open', 'Closed'],
        default: 'Open'
    }
}, {
    timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
