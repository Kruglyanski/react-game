import React from 'react'
import {Button} from 'antd'
import {setIsStarted} from '../../redux/gameReducer'
import {useDispatch} from 'react-redux'
import { setIsModalVisible } from '../../redux/appReducer'
import './GameOver.css'
export const GameOver = () => {
    const dispatch = useDispatch()
    const startHandler = () => {
        dispatch(setIsStarted(false))
        dispatch(setIsModalVisible(false))
        dispatch(setIsStarted(true))
    }
    return (
        <div className='gameOver'>
            <h2>Игра окончена</h2>
            <p>Вы проиграли!!!</p>
            <Button
                style={{width: 150, height: 50}}
                type="primary"
                onClick={startHandler}
                className="startButton"
            >
                Играть заново!
            </Button>
        </div>
    )
}