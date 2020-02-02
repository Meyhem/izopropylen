import { createAsyncAction } from "typesafe-actions";
import { AxiosError } from "axios";

const fetchProjects = createAsyncAction(
    'FETCH_PROJECTS_REQUEST',
    'FETCH_PROJECTS_SUCCESS',
    'FETCH_PROJECTS_FAILURE'
)<void, {}, AxiosError>()