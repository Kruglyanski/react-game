import {configureStore, combineReducers} from '@reduxjs/toolkit'

import appReducer from './appReducer'
import gameReducer from './gameReducer'

const rootReducer = combineReducers({
    // auth: authReducer,
    game: gameReducer,
    app: appReducer
})
export type RootStateType = ReturnType<typeof rootReducer>
export const store = configureStore({
    reducer: rootReducer,


})
