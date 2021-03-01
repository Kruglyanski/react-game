import { createSlice} from '@reduxjs/toolkit'


type StateType = {
    isError: boolean
    currentGameNumber: number
    isStarted: boolean
    totalNumbers: number
    count: number
}


const initialState: StateType = {
    isError: false,
    currentGameNumber: 1,
    isStarted: false,
    totalNumbers: 2,
    count: 0
}


const gameReducer = createSlice({
    name: 'postReducer',
    initialState,
    reducers: {
        setCurrentGameNumber: (state, action) => {

            return {
                ...state,
                currentGameNumber: (action.payload === 0) ? 0 : state.currentGameNumber + action.payload
            }
        },

        setIsError: (state, action) => {
            return {
                ...state,
                isError: action.payload
            }
        },

        setCount: (state) => {
            return {
                ...state,
                count: state.count + 1
            }
        },

        setIsStarted: (state, action) => {
            return {
                ...state,
                isStarted: action.payload
            }
        }


    },
    extraReducers: {}
})

export const {setCurrentGameNumber, setIsError, setIsStarted, setCount } = gameReducer.actions

export default gameReducer.reducer