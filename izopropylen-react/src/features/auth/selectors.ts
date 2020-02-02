import { createSelector } from 'reselect'
import { RootState } from 'models'

const selectFeature = (s: RootState) => s.auth

export const selectIsLoading = createSelector(selectFeature, a => a.loading)
export const selectErrorMessage = createSelector(selectFeature, a => a.error?.response?.data?.message)