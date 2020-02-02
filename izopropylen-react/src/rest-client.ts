import Axios from 'axios-observable'
import { API_URL } from './const'

export const axiosInstance = Axios.create({
    baseURL: API_URL,
    timeout: 5000
})

export const makeRestClient = (axios: Axios) => ({
    authenticate: (username: string, password: string) =>
        axios.post('/accounts/token', { username, password } )
});