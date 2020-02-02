import React from 'react'
import { useDispatch } from 'react-redux'

export const useMemoDispatch = () => {
    const dispatch = useDispatch();

    return React.useCallback(dispatch, []);
}
