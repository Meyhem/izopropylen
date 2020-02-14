import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'

export function useDispatchingCallback<T extends (...args: any[]) => void>(factory: (d: Dispatch) => T, deps?: any[]) {
    const dispatch = useDispatch()
    if (!deps) {
        deps = []
    }
    return useCallback(factory(dispatch), [dispatch, ...deps])
}
