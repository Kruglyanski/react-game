import { createSlice} from '@reduxjs/toolkit'


type StateType = {
    isError: boolean
    currentGameNumber: number
    isStarted: boolean
}


const initialState: StateType = {
    isError: false,
    currentGameNumber: 1,
    isStarted: false
}


const gameReducer = createSlice({
    name: 'postReducer',
    initialState,
    reducers: {
        setCurrentGameNumber: (state) => {
            return {
                ...state,
                currentGameNumber: state.currentGameNumber + 1
            }
        },

        setIsError: (state, action) => {
            return {
                ...state,
                isError: action.payload
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

export const {setCurrentGameNumber, setIsError, setIsStarted} = gameReducer.actions

export default gameReducer.reducer