import { RootState } from 'models'
import { createSelector } from 'reselect'

const selectFeature = (state: RootState) => state.projects

export const selectMemberships = createSelector(selectFeature, p => p.memberships)
export const selectIsLoading = createSelector(selectFeature, p => p.loading)
export const selectIsDialogOpen = createSelector(selectFeature, p => !!p.dialogOpen)
export const selectFetchProjectsErrorMessage = createSelector(selectFeature, a => a.fetchProjectsError?.response?.data?.message)
export const selectCreateProjectsErrorMessage = createSelector(selectFeature, a => a.createProjectError?.response?.data?.message)
