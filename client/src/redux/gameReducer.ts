import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {api} from '../api/api'



type StateType = {
    isError: boolean
    currentGameNumber: number
    isStarted: boolean
    count: number
    records: Array<RecordsType>
    gameMode: 'Средне' | 'Легко' | 'Тяжело' | 'Ад'
    isLetterMode: boolean
}
type RecordsType = {
    _id: string
    count: number
    userName: string
    date: string
    __v: number
}
export type CreateCountType = {
    name: string
    count: number
}


const initialState: StateType = {
    isError: false,
    currentGameNumber: 1,
    isStarted: false,
    count: 0,
    records: [],
    gameMode: 'Средне',
    isLetterMode: false
}

export const createCount = createAsyncThunk(
    'gameReducer/createCount',
    async ({count, name}: CreateCountType) => {
        return await api.count({count, name})
            .then((res) => res && res.json())
    }
)
export const getRecords = createAsyncThunk(
    'gameReducer/getRecords',
    async () => {
        return await api.records()
            .then((res) => res && res.json())
    }
)


const gameReducer = createSlice({
    name: 'postReducer',
    initialState,
    reducers: {
        setCurrentGameNumber: (state, action) => {

            return {
                ...state,
                currentGameNumber: (action.payload === 0) ? 1 : state.currentGameNumber + action.payload
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

        setGameMode: (state, action) => {
            return {
                ...state,
                gameMode: action.payload
            }
        },

        setIsLetterMode: (state, action) => {
            return {
                ...state,
                isLetterMode: action.payload !== 'Цыфры'
            }
        },

        setIsStarted: (state, action) => {
            return {
                ...state,
                isStarted: action.payload
            }
        }


    },
    extraReducers: {
        [createCount.fulfilled.type]: (state) => {
            return {
                ...state
            }
        },
        [getRecords.fulfilled.type]: (state, action) => {
            return {
                ...state,
                records: action.payload
            }
        },

    }
})

export const {setCurrentGameNumber, setIsError, setIsStarted, setCount, setGameMode, setIsLetterMode} = gameReducer.actions

export default gameReducer.reducer