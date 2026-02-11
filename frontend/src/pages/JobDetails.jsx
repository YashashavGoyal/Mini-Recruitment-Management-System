import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Calendar, UserPlus, Mail, Briefcase } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Select from '../components/ui/Select';
import useApi from '../hooks/useApi';

const getStatusVariant = (status) => {
    switch (status) {
        case 'Open': return 'green';
        case 'Closed': return 'gray';
        case 'Applied': return 'blue';
        case 'Screening': return 'yellow';
        case 'Interview': return 'indigo';
        case 'Hired': return 'green';
        case 'Rejected': return 'red';
        default: return 'gray';
    }
};

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const api = useApi();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [candidates, setCandidates] = useState([]); // For dropdown
    const [applications, setApplications] = useState([]); // Mocking applications list from job or separate endpoint
    // Assuming job object might contain applicants or we fetch separate
    // For now, let's assume job.applicants contains the data or we just show empty if not populated

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applicationData, setApplicationData] = useState({
        candidateId: '',
        status: 'Applied',
    });

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(api.jobs.getById(id));
                if (response.ok) {
                    const data = await response.json();
                    setJob(data);
                    // Also fetch candidates for the dropdown
                    const candResponse = await fetch(api.candidates.getAll);
                    if (candResponse.ok) {
                        const candData = await candResponse.json();
                        setCandidates(candData);
                    }

                    // Fetch applications for this job
                    const appResponse = await fetch(api.jobs.getApplications(id));
                    if (appResponse.ok) {
                        const appData = await appResponse.json();
                        setApplications(appData);
                    }
                } else {
                    console.error('Failed to fetch job details');
                }
            } catch (error) {
                console.error('Error fetching details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobDetails();
    }, [id, api.jobs, api.candidates]);

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                jobId: id,
                candidateId: applicationData.candidateId,
                status: applicationData.status
            };
            const response = await fetch(api.applications.create, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setIsModalOpen(false);
                setApplicationData({ candidateId: '', status: 'Applied' }); // Reset form

                // Refresh applications
                const appResponse = await fetch(api.jobs.getApplications(id));
                if (appResponse.ok) {
                    const appData = await appResponse.json();
                    setApplications(appData);
                }
            }
        } catch (error) {
            console.error('Failed to apply', error);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading details...</div>;
    if (!job) return <div className="p-8 text-center text-red-500">Job not found</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-500 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Jobs
            </button>

            {/* Job Header */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900">{job.jobTitle || job.title}</h1>
                            <Badge variant={getStatusVariant(job.status)}>{job.status}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-1.5" />
                                {job.department}
                            </div>
                            <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1.5" />
                                {job.location}
                            </div>
                            <div className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1.5" />
                                {job.salaryRange || job.salary}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1.5" />
                                Posted {new Date(job.createdAt || Date.now()).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <Button onClick={() => setIsModalOpen(true)}>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add Candidate
                        </Button>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Job Description</h2>
                    <div className="prose prose-blue text-gray-600 whitespace-pre-line">
                        {job.jobDescription || job.description}
                    </div>
                </div>
            </div>

            {/* Applications Section */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Applicants</h2>
                    <span className="text-sm text-gray-500">{applications.length} Candidates</span>
                </div>

                {applications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 text-sm">
                        No applications yet.
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {applications.map((app) => (
                                <tr key={app._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                {(app.candidateId?.fullName || '?').charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <Link to={`/candidates/${app.candidateId?._id}`} className="text-sm font-medium text-blue-600 hover:text-blue-900">
                                                    {app.candidateId?.fullName || 'Unknown Candidate'}
                                                </Link>
                                                <div className="text-xs text-gray-500">{app.candidateId?.currentCompany || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{app.candidateId?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {new Date(app.applicationDate || app.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge variant={getStatusVariant(app.status)}>{app.status}</Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Apply Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add Candidate to Job"
            >
                <form onSubmit={handleApply} className="space-y-4">
                    <Select
                        label="Select Candidate"
                        id="candidate"
                        options={[
                            { value: '', label: 'Select a candidate...' },
                            ...candidates.map(c => ({ value: c._id || c.id, label: c.fullName || c.name }))
                        ]}
                        value={applicationData.candidateId}
                        onChange={(e) => setApplicationData({ ...applicationData, candidateId: e.target.value })}
                        required
                    />

                    <Select
                        label="Initial Status"
                        id="status"
                        options={[
                            { value: 'Applied', label: 'Applied' },
                            { value: 'Screening', label: 'Screening' },
                            { value: 'Interview', label: 'Interview' },
                        ]}
                        value={applicationData.status}
                        onChange={(e) => setApplicationData({ ...applicationData, status: e.target.value })}
                    />

                    <div className="flex justify-end pt-2">
                        <Button type="button" variant="ghost" className="mr-2" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Add Candidate
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default JobDetails;
