import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import JobList from './pages/JobList';
import CreateJob from './pages/CreateJob';
import CandidateList from './pages/CandidateList';
import AddCandidate from './pages/AddCandidate';
import JobDetails from './pages/JobDetails';
import CandidateDetails from './pages/CandidateDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/jobs/create" element={<CreateJob />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/candidates" element={<CandidateList />} />
          <Route path="/candidates/create" element={<AddCandidate />} />
          <Route path="/candidates/:id" element={<CandidateDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
