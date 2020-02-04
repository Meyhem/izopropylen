import { createAction } from 'typesafe-actions'

export const redirect = createAction('REDIRECT')<{to: string}>()