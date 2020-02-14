import { RootEpic, ProjectRole, ProjectDetail, TranslationValue } from 'models'
import { isActionOf } from 'typesafe-actions'
import { map, filter, switchMap, catchError, mergeMap } from 'rxjs/operators'
import { of, from } from 'rxjs'

import {
    fetchProjects,
    createProject,
    toggleDialog,
    fetchProjectDetail,
    fetchTranslations,
    saveTranslationValue,
    setEditMode,
    createKey,
    setNewKeyName,
    deleteCultureCode,

} from './actions'
import { AxiosError } from 'axios'
import { addToasterFromAxiosError } from '../app/actions'

export const fetchProjects$: RootEpic = (action$, state$, services) =>
    action$.pipe(
        filter(isActionOf(fetchProjects.request)),
        switchMap(a => services.rest.fetchProjects()
            .pipe(
                map(res => fetchProjects.success(res.data.map(m =>
                    ({ projectId: m.projectId, role: m.role as ProjectRole, name: m.name })))),
                catchError(err => of(fetchProjects.failure(err)))
            )
        )
    )

export const createProject$: RootEpic = (action$, state$, services) =>
    action$.pipe(
        filter(isActionOf(createProject.request)),
        switchMap(a => services.rest.createProject(a.payload)
            .pipe(
                mergeMap(res => [createProject.success(), toggleDialog({ open: false }), fetchProjects.request()]),
                catchError(err => of(createProject.failure(err)))
            )
        )
    )

function mapDetailResponse(r: any): ProjectDetail {
    return {
        id: r.id,
        name: r.name,
        cultureCodes: r.cultureCodes.sort((a: string, b: string) => a.localeCompare(b)),
        keys: r.translationKeys.map((tk: any) => ({ id: tk.translationKeyId, name: tk.key })),
        newKeyName: ''
    }
}

export const fetchProjectDetail$: RootEpic = (action$, state$, services) =>
    action$.pipe(
        filter(isActionOf(fetchProjectDetail.request)),
        switchMap(a => services.rest.fetchProjectDetail(a.payload)
            .pipe(
                map(res => mapDetailResponse(res.data)),
                map(data => fetchProjectDetail.success(data)),
                catchError(err => of(fetchProjects.failure(err)))
            )
        )
    )

function mapTranslationValues(values: any[]): { [k: number]: TranslationValue } {
    return values.reduce((acc, v) => {
        acc[v.translationKeyId] = { valueId: v.translationValueId, value: v.value }
        return acc
    }, {})
}

export const fetchTranslations$: RootEpic = (action$, state$, services) =>
    action$.pipe(
        filter(isActionOf(fetchTranslations.request)),
        switchMap(a => services.rest.fetchTranslations(a.payload.projectId, a.payload.code)
            .pipe(
                map(res => fetchTranslations.success({
                    code: a.payload.code,
                    translations: mapTranslationValues(res.data)
                })),
                catchError(err => of(fetchTranslations.failure(err)))
            )
        )
    )

export const saveTranslationValue$: RootEpic = (action$, state$, services) =>
    action$.pipe(
        filter(isActionOf(saveTranslationValue.request)),
        switchMap(a => services.rest.saveTranslationValue(a.payload.code, a.payload.keyId, a.payload.value)
            .pipe(
                mergeMap(res => [
                    saveTranslationValue.success({
                        code: a.payload.code,
                        keyId: a.payload.keyId,
                        value: a.payload.value
                    }),
                    setEditMode({
                        code: a.payload.code,
                        keyId: a.payload.keyId,
                        edit: false
                    })
                ]),
                catchError((err: AxiosError) => from([
                    saveTranslationValue.failure(err),
                    addToasterFromAxiosError(err)
                ]))
            )
        )
    )

export const createKey$: RootEpic = (action$, state$, services) =>
    action$.pipe(
        filter(isActionOf(createKey.request)),
        switchMap(a => services.rest.createKey(a.payload.projectId, a.payload.keyName)
            .pipe(
                mergeMap(res => [
                    createKey.success({ keyId: res.data, keyName: a.payload.keyName }),
                    setNewKeyName({ value: '' })
                ]),
                catchError(err => of(createKey.failure(err)))
            )
        )
    )

export const deleteCultureCode$: RootEpic = (action$, state$, services) =>
    action$.pipe(
        filter(isActionOf(deleteCultureCode.request)),
        switchMap(a => services.rest.deleteCultureCode(a.payload.projectId, a.payload.code)
            .pipe(
                map(res => deleteCultureCode.success({code: a.payload.code})),
                catchError(err => from([
                    deleteCultureCode.failure(),
                    addToasterFromAxiosError(err)
                ]))
            )
        )
    )