import { useDispatch, useSelector, useStore } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const Dispatch: () => AppDispatch = useDispatch
export const Selector: TypedUseSelectorHook<RootState> = useSelector
export const Store: () => AppStore = useStore