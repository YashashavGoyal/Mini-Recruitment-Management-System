
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Mail } from 'lucide-react';
import Button from '../components/ui/Button';
import useApi from '../hooks/useApi';

const CandidateList = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = useApi();

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await fetch(api.candidates.getAll);
                if (response.ok) {
                    const data = await response.json();
                    setCandidates(data);
                } else {
                    console.error('Failed to fetch candidates:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch candidates:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCandidates();
    }, [api.candidates.getAll]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
                    <p className="mt-1 text-sm text-gray-500">View and manage potential candidates.</p>
                </div>
                <Link to="/candidates/create">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Candidate
                    </Button>
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Search candidates..."
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    {/* Filter removed */}
                </div>
            </div>

            {/* Candidates Table */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">Loading candidates...</td>
                            </tr>
                        ) : candidates.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No candidates found.</td>
                            </tr>
                        ) : (
                            candidates.map((candidate) => (
                                <tr key={candidate._id || candidate.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                                {(candidate.fullName || candidate.name || '?').charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{candidate.fullName || candidate.name || 'Unknown Candidate'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                            {candidate.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{candidate.experience} Years</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {candidate.skills && candidate.skills.map ? candidate.skills.slice(0, 3).map((skill) => (
                                                <span key={skill} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                                                    {skill}
                                                </span>
                                            )) : (
                                                <span className="text-xs text-gray-500">No skills listed</span>
                                            )}
                                            {candidate.skills && candidate.skills.length > 3 && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                                                    +{candidate.skills.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link to={`/candidates/${candidate._id || candidate.id}`} className="text-blue-600 hover:text-blue-900">View Profile</Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CandidateList;

