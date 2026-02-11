import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },
    status: {
        type: String,
        enum: ['Applied', 'Screening', 'Interview', 'Rejected', 'Hired'],
        default: 'Applied'
    },
    applicationDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

applicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
