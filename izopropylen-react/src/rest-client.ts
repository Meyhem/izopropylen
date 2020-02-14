import Axios from 'axios-observable'

export const makeRestClient = (axios: Axios) => ({
    authenticate: (username: string, password: string) =>
        axios.post('/accounts/token', { username, password }),

    fetchProjects: () => axios.get<[{projectId: number, name: string, role: string}]>('/projects/me'),

    createProject: (data: {name: string}) => axios.post<number>('/projects', data),

    fetchProjectDetail: (id: number) => axios.get(`/projects/${id}`),

    fetchTranslations: (projectId: number, cultureCode: string) => axios.get(`/projects/${projectId}/${cultureCode}`),

    saveTranslationValue: (code: string, keyId: number, value: string) =>
        axios.post(`/translations/${keyId}/values/${code}`, { value }),

    createKey: (projectId: number, key: string) =>
        axios.post(`/translations`, { projectId, key }),

    deleteCultureCode: (projectId: number, cultureCode: string) =>
        axios.delete(`/projects/${projectId}/${cultureCode}`)
})