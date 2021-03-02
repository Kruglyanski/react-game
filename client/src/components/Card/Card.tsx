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
// @ts-ignore
import a1 from '../../assets/audio/a1.mp3'
// @ts-ignore
import a2 from '../../assets/audio/a2.mp3'
// @ts-ignore
import a7 from '../../assets/audio/a7.mp3'
import useSound from 'use-sound'

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
    const gameMode = useSelector((state: RootStateType) => state.game.gameMode)
    const isLetterMode = useSelector((state: RootStateType) => state.game.isLetterMode)
    const isSoundEnabled = useSelector((state: RootStateType) => state.app.isSoundEnabled)
    const volume = useSelector((state: RootStateType) => state.app.volume)
    const [isActiveClass, setIsActiveClass] = useState(false)
    const [isErrorClass, setIsErrorClass] = useState(false)
    let points: number
    switch (gameMode) {
        case 'Легко':
            points = 1
            break
        case 'Средне':
            points = 2
            break
        case 'Тяжело':
            points = 8
            break
        case 'Ад':
            points = 16
            break
        default:
            points = 2
    }
    const [playA7, {stop: stopA7}] = useSound(a7, {
        volume
    })

    const [playA2, {stop: stopA2}] = useSound(a2, {
        volume
    })

    const [playA3, {stop: stopA3}] = useSound(a1, {
        volume
    })

    const cardHandler = async () => {
        if (currentGameNumber === 1 && number === 1) {
            setIsCardsHidden(true)
        }


        if (currentGameNumber === number) {
            isSoundEnabled && playA3()
            await setTimeout(() => {
                stopA3()
            }, 1000)
            dispatch(setCurrentGameNumber(1))
            setIsActiveClass(true)

        } else {
            isSoundEnabled && playA2()
            await setTimeout(() => {
                stopA2()
                dispatch(setIsError(true))
                dispatch(setIsStarted(false))

            }, 1000)
            dispatch(setModalType('gameOver'))
            dispatch(setIsModalVisible(true))
            await dispatch(createCount({count, name}))
            dispatch(getRecords())
            setIsActiveClass(true)
            setIsErrorClass(true)


        }

        if (currentGameNumber === totalNumbers) {
            isSoundEnabled && playA7()
            await setTimeout(() => {
                stopA7()
                dispatch(setIsStarted(false))
            }, 1000)
            dispatch(setCount(points))
            dispatch(setCurrentGameNumber(0))
        }
    }

    const classNames = ['card']



    isCardsHidden && classNames.push('hiddenCard')
    if (isActiveClass) {
        const i = classNames.indexOf('hiddenCard')
        classNames.splice(i, 1)
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