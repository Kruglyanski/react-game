import React from 'react'
import 'antd/dist/antd.css'
import './App.css'
import {LayoutCustom} from './components/Layout/LayoutCustom'
import {useSelector} from 'react-redux'
import {RootStateType} from './redux/rootReducer'
import {ModalCustom} from './components/ModalCustom/ModalCustom'
import {GameOver} from './components/GameOver/GameOver'
import {RegistrationForm} from './components/RegistrationForm/RegistrationForm'
import {LoginForm} from './components/LoginForm/LoginForm'
import { Message } from './components/Message/Message'



function App() {
    const isModalVisible = useSelector((state: RootStateType) => state.app.isModalVisible)
    const modalType = useSelector((state: RootStateType) => state.app.modalType)


    return (
        <div className="App">
            <Message/>
            <LayoutCustom/>
            {
                isModalVisible && <ModalCustom>
                    {modalType === 'gameOver' && <GameOver/>}
                    {modalType === 'register' && <RegistrationForm/>}
                    {modalType === 'login' && <LoginForm/>}
                </ModalCustom>
            }
        </div>

    )
}

export default App
