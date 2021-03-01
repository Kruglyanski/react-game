import {createSlice} from '@reduxjs/toolkit'

type StateType = {
    isModalVisible: boolean
    modalType: 'login' | 'register' | 'gameOver'

}

const initialState: StateType = {
    isModalVisible: false,
    modalType: 'login'


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
        }


    },
    extraReducers: {}
})

export const {setIsModalVisible, setModalType } = appReducer.actions

export default appReducer.reducer