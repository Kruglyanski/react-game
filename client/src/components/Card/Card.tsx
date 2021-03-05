import React, {useState} from 'react'
import './Card.css'
import {letters} from '../../utils/consts'
import {getPoints} from '../../utils/funcs'
import {EyeInvisibleOutlined} from '@ant-design/icons'
import { useDispatch, useSelector} from 'react-redux'
import {
    createCount,
    getRecords,
    setCount,
    setCurrentGameNumber, setGameMode,
    setIsError,
    setIsStarted
} from '../../redux/gameReducer'
import {setIsModalVisible, setModalType} from '../../redux/appReducer'
import {RootStateType} from '../../redux/rootReducer'
import useSound from 'use-sound'
// @ts-ignore
import a1 from '../../assets/audio/a1.mp3'
// @ts-ignore
import a2 from '../../assets/audio/a2.mp3'
// @ts-ignore
import a7 from '../../assets/audio/a7.mp3'

type PropsType = {
    number: number | null
    isCardsHidden: boolean
    setIsCardsHidden: (arg: boolean) => void
    totalNumbers: number
}

export const Card: React.FC<PropsType> = ({number, isCardsHidden, setIsCardsHidden, totalNumbers}) => {
    const dispatch = useDispatch()
    const game = useSelector((state: RootStateType) => state.game)
    const name = useSelector((state: RootStateType) => state.auth.name)
    const app = useSelector((state: RootStateType) => state.app)
    const [isActiveClass, setIsActiveClass] = useState(false)
    const [isErrorClass, setIsErrorClass] = useState(false)

//добавляем звуки в игру:
    const [playA7, {stop: stopA7}] = useSound(a7, {
        volume: app.volume
    })
    const [playA2, {stop: stopA2}] = useSound(a2, {
        volume: app.volume
    })
    const [playA3, {stop: stopA3}] = useSound(a1, {
        volume: app.volume
    })

//обработка кликов по карточкам:
    const cardHandler = async () => {
        if (game.currentGameNumber === 1 && number === 1) {    //начало игры
            setIsCardsHidden(true)
        }

        if (game.currentGameNumber === number) {               //удачный клик
            app.isSoundEnabled && playA3()
            await setTimeout(() => {
                stopA3()
            }, 1000)
            dispatch(setCurrentGameNumber(1))
            setIsActiveClass(true)

        } else {                                               //неудачныйный клик
            app.isSoundEnabled && playA2()
            await setTimeout(() => {
                stopA2()
                dispatch(setIsError(true))
                dispatch(setIsStarted(false))
                dispatch(setGameMode('Средняя'))

            }, 1000)
            dispatch(setModalType('gameOver'))
            dispatch(setIsModalVisible(true))
            await dispatch(createCount({count: game.count, name}))
            dispatch(getRecords())
            setIsActiveClass(true)
            setIsErrorClass(true)

        }

        if (game.currentGameNumber === totalNumbers) {         //конец раунда
            app.isSoundEnabled && playA7()
            await setTimeout(() => {
                stopA7()
                dispatch(setIsStarted(false))
            }, 1000)
            dispatch(setCount(getPoints(game.gameMode)))
            dispatch(setCurrentGameNumber(0))
        }
    }
// присваиваем классы карточке в соответствии с результатом клика и выбранной темой
    const classNames = ['card']
    app.theme === 'Тёмная' && classNames.push('dark')
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
                    {!game.isLetterMode ? number : letters[number! - 1]}
                </div>
                <div className="back">
                    <EyeInvisibleOutlined />
                </div>
            </div>
        </div>
    )
}