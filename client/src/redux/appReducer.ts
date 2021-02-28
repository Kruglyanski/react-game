import { createSlice} from '@reduxjs/toolkit'

type StateType = {
    isModalVisible: boolean

}

const initialState: StateType = {
    isModalVisible: false,

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




    },
    extraReducers: {}
})

export const {setIsModalVisible} = appReducer.actions

export default appReducer.reducer