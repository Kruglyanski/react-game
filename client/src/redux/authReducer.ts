import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {api} from '../api/api'

export type LoginFormType = {
    email: string
    password: string

}
export type RegistrationFormType = {
    email: string
    password: string
    name: string

}

const initialState = {
    isModalVisible: false,
    token: '',
    userId: '',
    authError: '',
    name: '',
    isAuthenticated: false,
    isRegistered: false,
    registerMessage: '',
    isMessageShow: false,
    loginForm: {
        email: '',
        password: ''
    },
    registrationForm: {
        email: '',
        password: '',
        name: ''
    }
}


export const authLogin = createAsyncThunk(
    'authReducer/authLogin ',
    async (loginForm: LoginFormType) => {

        const data = await api.login(loginForm)
            .then((res) => res && res.json())

        if (!data.token) {
            throw new Error(data.message || 'Something went wrong!')
        }

        localStorage.setItem('userData', JSON.stringify({
            userId: data.userId, token: data.token, name: data.name
        }))
        return data

    }
)
export const authRegister = createAsyncThunk(
    'authReducer/authRegister',
    async (registrationForm: RegistrationFormType) => {
        return await api.register(registrationForm)
            .then((res) => res && res.json())


    }
)


const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        loginFormChange: (state, action) => {
            return {
                ...state,
                loginForm: {...state.loginForm, ...action.payload}
            }
        },
        registrationFormChange: (state, action) => {
            return {
                ...state,
                registrationForm: {...state.registrationForm, ...action.payload}
            }
        },
        setIsAuthenticated: (state, action) => {
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                name: action.payload.name,
                isAuthenticated: !!action.payload.token
            }
        },
        setIsRegistered: (state, action) => {
            return {
                ...state,
                isRegistered: action.payload
            }
        },

        cleanAuthError: (state) => {
            return {
                ...state,
                authError: ''
            }
        },

        cleanRegistrationForm: (state) => {
            return {
                ...state,
                registrationForm: {
                    email: '',
                    password: '',
                    name: ''
                }
            }
        },
        cleanLoginForm: (state) => {
            return {
                ...state,
                loginForm: {
                    email: '',
                    password: ''
                }
            }
        },


        authLogout: (state) => {
            return {
                ...state,
                token: '',
                userId: '',
                isAuthenticated: false,
                loginForm: {
                    ...state.loginForm,
                    email: '',
                    password: ''
                }
            }
        },

        setIsMessageShow: (state, action) => {
            return {
                ...state,
                isMessageShow: action.payload
            }
        }

    },
    extraReducers: {

        [authRegister.fulfilled.type]: (state, action) => {

            return {
                ...state,
                registerMessage: action.payload.message,
                isRegistered: action.payload.ok
            }

        },

        [authLogin.fulfilled.type]: (state, action) => {

            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                isAuthenticated: !!action.payload.token,
                authError: '',
                name: action.payload.name

            }

        },

        [authLogin.rejected.type]: (state, action) => {
            return {
                ...state,
                authError: action.error.message
            }

        }

    }
})

export const {
    authLogout,
    loginFormChange,
    registrationFormChange,
    setIsAuthenticated,
    setIsRegistered,
    setIsMessageShow,
    cleanRegistrationForm,
    cleanAuthError,
    cleanLoginForm
} = authReducer.actions

export default authReducer.reducer