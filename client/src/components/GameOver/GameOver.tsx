import React from 'react'
import {Button} from 'antd'
import {setCount, setCurrentGameNumber, setIsStarted} from '../../redux/gameReducer'
import {useDispatch, useSelector} from 'react-redux'
import {setIsModalVisible, setModalType} from '../../redux/appReducer'
import './GameOver.css'
import {RootStateType} from '../../redux/rootReducer'
export const GameOver = () => {

    const dispatch = useDispatch()

    const count =useSelector((state: RootStateType) => state.game.count)

    const startHandler = () => {
        dispatch(setIsStarted(false))
        dispatch(setModalType('gameOver'))
        dispatch(setIsModalVisible(false))
        dispatch(setCurrentGameNumber(0))
        dispatch(setCount(0))
    }
    return (
        <div className='gameOver'>
            <h2>Игра окончена</h2>
            <p>Ваш счёт: <b>{count}</b></p>
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