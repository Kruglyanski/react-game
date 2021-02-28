import React from 'react'
import 'antd/dist/antd.css'
import './App.css'
import {LayoutCustom} from './components/Layout/LayoutCustom'
import {useSelector} from 'react-redux'
import {RootStateType} from './redux/rootReducer'
import {ModalCustom} from './components/ModalCustom/ModalCustom'
import {GameOver} from './components/GameOver/GameOver'

function App() {
    const isModalVisible = useSelector((state: RootStateType) => state.app.isModalVisible)

    return (
        <div className="App">
            <LayoutCustom/>
            {
                isModalVisible && <ModalCustom modalTitle='Игра окончена'>
                    <GameOver/>
                </ModalCustom>
            }
        </div>

    )
}

export default App
