import { RootState, TranslationGroup } from 'models'
import { createSelector } from 'reselect'

const selectFeature = (state: RootState) => state.projects

export const selectMemberships = createSelector(selectFeature, p => p.memberships)
export const selectIsLoading = createSelector(selectFeature, p => p.loading)
export const selectIsDialogOpen = createSelector(selectFeature, p => !!p.dialogOpen)
export const selectFetchProjectsErrorMessage = createSelector(selectFeature, a => a.fetchProjectsError?.response?.data?.message)
export const selectCreateProjectsErrorMessage = createSelector(selectFeature, a => a.createProjectError?.response?.data?.message)

export const selectTranslationKeys = createSelector(selectFeature, a => a.detail?.keys)
export const selectCultureCodes = createSelector(selectFeature, a => a.detail?.cultureCodes)
export const selectProjectName = createSelector(selectFeature, a => a.detail?.name)
export const selectTranslations = createSelector(selectFeature, p => p.translations)
export const selectTranslationValue = (group: TranslationGroup | undefined, keyId: number) =>
    group?.translations[keyId]
export const selectIsLoadingCultureCode = (group: TranslationGroup | undefined) =>
    group?.loading

export const selectSelectedCultureCodes = createSelector(selectFeature,
    a => Object.keys(a.translations).filter(k => !!a.translations[k]))
