# Mini Recruitment Management System (MRMS)

A full-stack application for managing job openings and candidate applications.

## 🚀 Features

- **Job Management**: Create, view, and manage job postings.
- **Candidate Management**: Add and view candidate profiles.
- **Application Tracking**: Apply candidates to jobs and track their status through stages (Applied -> Screening -> Interview -> Hired/Rejected).
- **Responsive UI**: Built with React and Tailwind CSS.
- **RESTful API**: Node.js and Express backend with MongoDB.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router DOM
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local instance or Atlas URI)
- Git

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/YashashavGoyal/Mini-Recruitment-Management-System.git
cd Mini-Recruitment-Management-System
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mrms
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
# App runs on http://localhost:5173
```

## 🔌 API Endpoints

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create a new job
- `GET /api/jobs/:id` - Get job details
- `GET /api/jobs/:id/applications` - Get applications for a specific job

### Candidates
- `GET /api/candidates` - Get all candidates
- `POST /api/candidates` - Add a new candidate
- `GET /api/candidates/:id` - Get candidate details

### Applications
- `POST /api/applications` - Apply a candidate to a job

## 📝 Usage

1. **Dashboard**: View all active job postings.
2. **Create Job**: Click "Create Job" to post a new opening.
3. **Candidates**: Navigate to "Candidates" to view or add profiles.
4. **Apply**: Go to a Job's details page and click "Add Candidate" to link a candidate to the job.
5. **Track**: Update application status (Screening, Interview, etc.) directly from the Job Details page.