import React, {useEffect, useState} from 'react'
import './Card.css'
import {useDispatch, useSelector} from 'react-redux'
import {
    createCount,
    getRecords,
    setCount,
    setCurrentGameNumber,
    setIsError,
    setIsStarted
} from '../../redux/gameReducer'
import {setIsModalVisible, setModalType} from '../../redux/appReducer'
import {RootStateType} from '../../redux/rootReducer'

type PropsType = {
    number: number | null
    isCardsHidden: boolean
    setIsCardsHidden: (arg: boolean) => void
    totalNumbers: number
}
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X']

export const Card: React.FC<PropsType> = ({number, isCardsHidden, setIsCardsHidden, totalNumbers}) => {
    const dispatch = useDispatch()
    const currentGameNumber = useSelector((state: RootStateType) => state.game.currentGameNumber)
    const name = useSelector((state: RootStateType) => state.auth.name)
    const count = useSelector((state: RootStateType) => state.game.count)
    const isLetterMode = useSelector((state: RootStateType) => state.game.isLetterMode)
    const [isActiveClass, setIsActiveClass] = useState(false)
    const [isErrorClass, setIsErrorClass] = useState(false)



    const cardHandler = () => {
        if (currentGameNumber===1 && number === 1) {
            setIsCardsHidden(true)
        }



        if (currentGameNumber === number) {
            console.log('ok<KKKK')
            dispatch(setCurrentGameNumber(1))
            setIsActiveClass(true)
        } else {
            dispatch(getRecords())
            dispatch(setIsError(true))
            dispatch(createCount({count, name}))
            setIsActiveClass(true)
            setIsErrorClass(true)
            dispatch(setIsStarted(false))
            dispatch(setModalType('gameOver'))
            dispatch(setIsModalVisible(true))

            console.log('ne ok')
        }
        if (currentGameNumber===totalNumbers) {
            dispatch(setIsStarted(false))
            console.log('okokok')
            dispatch(setCount())
            dispatch(setCurrentGameNumber(0))

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
                    {!isLetterMode ? number : letters[number! - 1]}
                </div>
                <div className="back">

                </div>
            </div>
        </div>
    )
}