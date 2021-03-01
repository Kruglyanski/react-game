import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from '../../redux/rootReducer'
import {getRecords} from '../../redux/gameReducer'


const data = [
    {
        name: 'Vasya',
        count: 66,
        date: 8484848,
        id:1
    },{
        name: 'Vasya',
        count: 66,
        date: 8484848,
        id:2
    },{
        name: 'Vasya',
        count: 66,
        date: 8484848,
        id:3
    },{
        name: 'Vasya',
        count: 66,
        date: 8484848,
        id:4
    },{
        name: 'Vasya',
        count: 66,
        date: 8484848,
        id:5
    },

]
export const RecordsList = () => {
    const dispatch = useDispatch()
    const records = useSelector((state: RootStateType) => state.game.records)
    useEffect(() =>{
        dispatch(getRecords())
    }, [])
    return (
        <>
            {records.map(i => {
                return (
                    <div key={i._id}>
                        <b>{i.userName}:</b>
                        <div>{i.count}</div>
                        <div>{i.date.toLocaleLowerCase()}</div>

                    </div>

            )
            })}
            </>
    )
}




