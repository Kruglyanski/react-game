import React, {useEffect, useState} from 'react'
import {Card} from '../Card/Card'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from '../../redux/rootReducer'


const modes = {['Легко']: 4, ['Средне']: 6, ['Тяжело']: 8, ['Ад']: 16}
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]


//Тасование Фишера — Йетса:
function shuffle(array: Array<number>) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

export const Game = () => {
    const [shuffledNumbers, setShuffledNumbers] = useState<Array<number>>([])
    console.log(shuffledNumbers)
    const dispatch = useDispatch()
    const isStarted = useSelector((state: RootStateType) => state.game.isStarted)
    const gameMode = useSelector((state: RootStateType) => state.game.gameMode)
    const [isCardsHidden, setIsCardsHidden] = useState(false)
    useEffect(() => {

        setShuffledNumbers(shuffle(numbers))

            if (isStarted) {
                console.log('use', isStarted)
                 const timeout =  setTimeout(() => {
                    console.log('timeout')
                    setIsCardsHidden(true)
                }, 3000)
                return () => clearTimeout(timeout)
            }




    }, [isStarted])


    return (

        <div className="game">
            {console.log('render')}
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
    )
}