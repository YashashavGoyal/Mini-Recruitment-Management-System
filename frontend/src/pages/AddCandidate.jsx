import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import useApi from '../hooks/useApi';

const AddCandidate = () => {
    const navigate = useNavigate();
    const api = useApi();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        experience: '',
        currentCompany: '',
        skills: '',
        resumeLink: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                experience: Number(formData.experience),
                skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
            };

            const response = await fetch(api.candidates.create, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                navigate('/candidates');
            } else {
                console.error('Failed to add candidate');
            }
        } catch (error) {
            console.error('Error adding candidate:', error);
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
                        <h1 className="text-2xl font-bold text-gray-900">Add New Candidate</h1>
                        <p className="mt-1 text-sm text-gray-500">Enter candidate details to add to the database.</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">

                    <Input
                        id="fullName"
                        label="Full Name"
                        placeholder="e.g. John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="sm:col-span-2"
                    />

                    <Input
                        id="email"
                        type="email"
                        label="Email Address"
                        placeholder="e.g. john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        id="phone"
                        label="Phone Number"
                        placeholder="e.g. +1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        id="currentCompany"
                        label="Current Company"
                        placeholder="e.g. Tech Corp"
                        value={formData.currentCompany}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        id="experience"
                        label="Years of Experience"
                        type="number"
                        placeholder="e.g. 5"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        id="resumeLink"
                        label="Resume Link (URL)"
                        placeholder="e.g. https://linkedin.com/in/johndoe"
                        value={formData.resumeLink}
                        onChange={handleChange}
                        required
                        className="sm:col-span-2"
                    />

                    <div className="sm:col-span-2">
                        <Input
                            id="skills"
                            label="Skills"
                            placeholder="e.g. React, Node.js, Python (Comma separated)"
                            value={formData.skills}
                            onChange={handleChange}
                            required
                        />
                        <p className="mt-1 text-xs text-gray-500">Separate skills with commas.</p>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <Button type="button" variant="ghost" className="mr-3" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        <Save className="h-4 w-4 mr-2" />
                        {loading ? 'Saving...' : 'Save Candidate'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddCandidate;
