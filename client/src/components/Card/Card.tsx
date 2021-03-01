import React, {useEffect, useState} from 'react'
import './Card.css'
import {useDispatch, useSelector} from 'react-redux'
import {setCount, setCurrentGameNumber, setIsError, setIsStarted} from '../../redux/gameReducer'
import {setIsModalVisible, setModalType} from '../../redux/appReducer'
import {RootStateType} from '../../redux/rootReducer'

type PropsType = {
    number: number | null
    isCardsHidden: boolean
    setIsCardsHidden: (arg: boolean) => void
}
export const Card: React.FC<PropsType> = ({number, isCardsHidden, setIsCardsHidden}) => {
    const dispatch = useDispatch()
    const currentGameNumber = useSelector((state: RootStateType) => state.game.currentGameNumber)
    const totalNumbers = useSelector((state: RootStateType) => state.game.totalNumbers)
    const isError = useSelector((state: RootStateType) => state.game.isError)
    const [isActiveClass, setIsActiveClass] = useState(false)
    const [isErrorClass, setIsErrorClass] = useState(false)



    const cardHandler = () => {
        if (currentGameNumber===1 && number === 1) {
            setIsCardsHidden(true)
        }

        if (currentGameNumber===totalNumbers) {
            dispatch(setIsStarted(false))
            console.log('okokok')
            dispatch(setCount())
            dispatch(setCurrentGameNumber(0))

        }

        if (currentGameNumber === number) {
            console.log('ok')
            dispatch(setCurrentGameNumber(1))
            setIsActiveClass(true)
        } else {
            dispatch(setIsError(true))
            setIsActiveClass(true)
            setIsErrorClass(true)
            dispatch(setIsStarted(false))
            dispatch(setModalType('gameOver'))
            dispatch(setIsModalVisible(true))
            console.log('ne ok')
        }
    }

    const classNames = ['card']



    isCardsHidden && classNames.push('hiddenCard')
    if (isActiveClass){
        const i = classNames.indexOf('hiddenCard')
        classNames.splice(i,1)
    }
    isErrorClass && classNames.push('errorCard')

    return (
        <div className={classNames.join(' ')} onClick={cardHandler}>
            <div className="flippingContainer">
                <div className="front">
                    {number}
                </div>
                <div className="back">

                </div>
            </div>
        </div>
    )
}