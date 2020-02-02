import { API_URL } from "./const"

export const formatApiUrl = (path?: string) => `${API_URL}/${typeof path === undefined ? '' : path}`