import {createSlice} from '@reduxjs/toolkit'

type StateType = {
    isModalVisible: boolean
    modalType: 'login' | 'register' | 'gameOver'
    volume: number
    isSoundEnabled: boolean
}

const initialState: StateType = {
    isModalVisible: false,
    modalType: 'login',
    volume: 0.5,
    isSoundEnabled: true


}


const appReducer = createSlice({
    name: 'appReducer',
    initialState,
    reducers: {
        setIsModalVisible: (state, action) => {
            return {
                ...state,
                isModalVisible: action.payload
            }
        },
        setModalType: (state, action) => {
            return {
                ...state,
                modalType: action.payload
            }
        },
        setVolume: (state, action) => {
            return {
                ...state,
                volume: action.payload
            }
        },
        setIsSoundEnabled: (state, action) => {
            return {
                ...state,
                isSoundEnabled: action.payload
            }
        }


    },
    extraReducers: {}
})

export const {setIsModalVisible, setModalType, setVolume, setIsSoundEnabled } = appReducer.actions

export default appReducer.reducer