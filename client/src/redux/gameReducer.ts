import { createSlice} from '@reduxjs/toolkit'


type StateType = {
    isError: boolean
    currentGameNumber: number
}


const initialState: StateType = {
    isError: false,
    currentGameNumber: 1
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
        }


    },
    extraReducers: {}
})

export const {setCurrentGameNumber, setIsError} = gameReducer.actions

export default gameReducer.reducer