import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import useApi from '../hooks/useApi';

const CreateJob = () => {
    const navigate = useNavigate();
    const api = useApi();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        jobTitle: '',
        department: '',
        location: '',
        employmentType: 'Full-time',
        salaryRange: '',
        status: 'Open',
        jobDescription: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(api.jobs.create, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/');
            } else {
                console.error('Failed to create job');
            }
        } catch (error) {
            console.error('Error creating job:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-gray-100 text-gray-500">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Create New Job</h1>
                        <p className="mt-1 text-sm text-gray-500">Fill in the details to post a new job opening.</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <Input
                            id="jobTitle"
                            label="Job Title"
                            placeholder="e.g. Senior Frontend Engineer"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Input
                        id="department"
                        label="Department"
                        placeholder="e.g. Engineering"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        id="location"
                        label="Location"
                        placeholder="e.g. Remote / New York"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />

                    <Select
                        id="employmentType"
                        label="Job Type"
                        options={[
                            { value: 'Full-time', label: 'Full-time' },
                            { value: 'Part-time', label: 'Part-time' },
                            { value: 'Contract', label: 'Contract' },
                            { value: 'Internship', label: 'Internship' },
                            { value: 'Temporary', label: 'Temporary' },
                        ]}
                        value={formData.employmentType}
                        onChange={handleChange}
                    />

                    <Input
                        id="salaryRange"
                        label="Salary Range"
                        placeholder="e.g. $120k - $150k"
                        value={formData.salaryRange}
                        onChange={handleChange}
                    />

                    <Select
                        id="status"
                        label="Status"
                        options={[
                            { value: 'Open', label: 'Open' },
                            { value: 'Closed', label: 'Closed' },
                        ]}
                        value={formData.status}
                        onChange={handleChange}
                    />

                    <div className="sm:col-span-2">
                        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
                            Job Description
                        </label>
                        <textarea
                            id="jobDescription"
                            rows={5}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Describe the role, responsibilities, and requirements..."
                            value={formData.jobDescription}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <Button type="button" variant="ghost" className="mr-3" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        <Save className="h-4 w-4 mr-2" />
                        {loading ? 'Saving...' : 'Save Job'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateJob;
