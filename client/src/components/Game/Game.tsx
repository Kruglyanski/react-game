import React, {useEffect, useState} from 'react'
import {Card} from '../Card/Card'
import {useSelector} from 'react-redux'
import {RootStateType} from '../../redux/rootReducer'
import './Game.css'
import {modes, numbers} from '../../utils/consts'
import {shuffle} from '../../utils/funcs'

export const Game = () => {
    const [shuffledNumbers, setShuffledNumbers] = useState<Array<number>>([])
    const isStarted = useSelector((state: RootStateType) => state.game.isStarted)
    const gameMode = useSelector((state: RootStateType) => state.game.gameMode)
    const theme = useSelector((state: RootStateType) => state.app.theme)
    const [isCardsHidden, setIsCardsHidden] = useState(false)

//Запускаем 3-х секундный отчет при запуске игры

    useEffect(() => {
        setShuffledNumbers(shuffle(numbers))
        if (isStarted) {
            const timeout = setTimeout(() => {
                setIsCardsHidden(true)
            }, 3000)
            return () => clearTimeout(timeout)
        }
    }, [isStarted])


    return (
        <>
            <div className={'game ' + (theme === 'Тёмная' && 'dark')}>
                {shuffledNumbers.map(i => {
                    if (i <= modes[gameMode]) {
                        return <Card
                            key={i}
                            number={i}
                            isCardsHidden={isCardsHidden}
                            setIsCardsHidden={setIsCardsHidden}
                            totalNumbers={modes[gameMode]}
                        />
                    } else {
                        return <div key={i}/>
                    }
                })}
            </div>
        </>

    )
}