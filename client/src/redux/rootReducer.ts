import {configureStore, combineReducers} from '@reduxjs/toolkit'

// import authReducer from './authReducer'
import gameReducer from './gameReducer'

const rootReducer = combineReducers({
    // auth: authReducer,
    game: gameReducer
})
export type RootStateType = ReturnType<typeof rootReducer>
export const store = configureStore({
    reducer: rootReducer

})
