import { RootEpic, ProjectRole, ProjectDetail, TranslationValue } from 'models'
import { isActionOf } from 'typesafe-actions'
import { map, filter, switchMap, catchError, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'

import { fetchProjects, createProject, toggleDialog, fetchProjectDetail, fetchTranslations } from './actions'

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
        cultureCodes: r.cultureCodes,
        keys: r.translationKeys.map((tk: any) => ({ id: tk.translationKeyId, name: tk.key }))
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

function mapTranslationValues(values: any[]): { [k: number]: TranslationValue} {
    return values.reduce((acc, v) => {
        acc[v.translationKeyId] = { valueId: v.translationValueId, value: v.value}
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