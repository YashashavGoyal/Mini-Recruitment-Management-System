import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Briefcase, FileText, MapPin, Calendar, User } from 'lucide-react';
import Button from '../components/ui/Button';
import useApi from '../hooks/useApi';

const CandidateDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const api = useApi();
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCandidateDetails = async () => {
            try {
                const response = await fetch(api.candidates.getById(id));
                if (response.ok) {
                    const data = await response.json();
                    setCandidate(data);
                } else {
                    console.error('Failed to fetch candidate details');
                }
            } catch (error) {
                console.error('Error fetching details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCandidateDetails();
    }, [id, api.candidates]);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
    if (!candidate) return <div className="p-8 text-center text-red-500">Candidate not found</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-500 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Candidates
            </button>

            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar / Initials */}
                    <div className="flex-shrink-0">
                        <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl font-bold">
                            {(candidate.fullName || candidate.name || '?').charAt(0).toUpperCase()}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex-grow space-y-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{candidate.fullName || candidate.name}</h1>
                            <p className="text-gray-500">{candidate.currentCompany ? `Currently at ${candidate.currentCompany}` : 'Open to opportunities'}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                {candidate.email}
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                {candidate.phone || 'N/A'}
                            </div>
                            <div className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                                {candidate.experience} Years Experience
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                Added {new Date(candidate.createdAt || Date.now()).toLocaleDateString()}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {candidate.skills && candidate.skills.map((skill, index) => (
                                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {candidate.resumeLink && (
                            <div className="pt-4">
                                <a href={candidate.resumeLink} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline">
                                        <FileText className="h-4 w-4 mr-2" />
                                        View Resume
                                    </Button>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateDetails;
