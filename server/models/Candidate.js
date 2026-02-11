import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    currentCompany: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    resumeLink: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Candidate = mongoose.model('Candidate', candidateSchema);

export default Candidate;
