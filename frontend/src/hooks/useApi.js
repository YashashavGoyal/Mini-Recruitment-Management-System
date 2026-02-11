
const useApi = () => {
    const API_BASE_URL = 'http://localhost:5000/api';

    const getApiRoute = (route) => `${API_BASE_URL}/${route}`;

    return {
        jobs: {
            getAll: getApiRoute('jobs'),
            create: getApiRoute('jobs'),
            getById: (id) => getApiRoute(`jobs/${id}`),
            update: (id) => getApiRoute(`jobs/${id}`),
            delete: (id) => getApiRoute(`jobs/${id}`),
            getApplications: (id) => getApiRoute(`jobs/${id}/applications`),
        },
        candidates: {
            getAll: getApiRoute('candidates'),
            create: getApiRoute('candidates'),
            getById: (id) => getApiRoute(`candidates/${id}`),
        },
        applications: {
            create: getApiRoute('applications'),
            getAll: getApiRoute('applications'),
        }
    }
}

export default useApi;
