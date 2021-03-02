import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from '../../redux/rootReducer'
import {getRecords} from '../../redux/gameReducer'
import './RecordsList.css'
import {Button} from 'antd'
import { setIsModalVisible } from '../../redux/appReducer'

export const RecordsList = () => {
    const dispatch = useDispatch()
    const records = useSelector((state: RootStateType) => state.game.records)
    useEffect(() =>{
        dispatch(getRecords())
    }, [])
    return (
        <div className="records">
            <h4>Лучшие игроки:</h4>
            <div className="recordsItem">
                <b>Имя:</b>
                <div>Счёт:</div>
                <div>Дата и время игры:</div>
            </div>
            {records.map(i => {
                return (
                    <div key={i._id} className="recordsItem">
                        <b>{i.userName}:</b>
                        <div>{i.count}</div>
                        <div>{i.date}</div>

                    </div>

            )
            })}
            <br/>
            <Button
                type="primary"
                onClick={() => dispatch(setIsModalVisible(false))}
            >
                Закрыть
            </Button>
            </div>
    )
}




