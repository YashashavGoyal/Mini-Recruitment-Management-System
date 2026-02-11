import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please add a full name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    experience: {
        type: Number,
        required: [true, 'Please add years of experience']
    },
    currentCompany: {
        type: String,
        required: [true, 'Please add current company']
    },
    skills: {
        type: [String], // Array of strings
        required: [true, 'Please add at least one skill']
    },
    resumeLink: {
        type: String,
        required: [true, 'Please add a resume link']
    }
}, {
    timestamps: true
});

const Candidate = mongoose.model('Candidate', candidateSchema);

export default Candidate;
