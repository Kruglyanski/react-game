import {createSlice} from '@reduxjs/toolkit'

type StateType = {
    isModalVisible: boolean
    modalType: 'login' | 'register' | 'gameOver'
    volume: number
    isSoundEnabled: boolean
    isPlayClicked: boolean
}

const initialState: StateType = {
    isModalVisible: false,
    modalType: 'login',
    volume: 0.5,
    isSoundEnabled: true,
    isPlayClicked: false

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
        },
        setIsPlayClicked: (state) => {
            return {
                ...state,
                isPlayClicked: !state.isPlayClicked
            }
        }


    },
    extraReducers: {}
})

export const {setIsModalVisible, setModalType, setVolume, setIsSoundEnabled, setIsPlayClicked } = appReducer.actions

export default appReducer.reducer