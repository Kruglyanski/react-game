import React, {useEffect, useState} from 'react'
import {Card} from '../Card/Card'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from '../../redux/rootReducer'


const modeCards = 2
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
    const [isCardsHidden, setIsCardsHidden] = useState(false)
    useEffect(() => {


        console.log('use', shuffle(numbers), isStarted)
         setShuffledNumbers(shuffle(numbers))
        if (isStarted) {
            const timeout = setTimeout(() => {
                setIsCardsHidden(true)
            }, 3000)
            return clearTimeout(timeout)
        }


    }, [isStarted])
    return (

        <div className="game">
            {console.log('render')}
            {shuffledNumbers.map(i => {

                if (i <= modeCards) {
                    return <Card
                        key={i}
                        number={i}
                        isCardsHidden={isCardsHidden}
                        setIsCardsHidden={setIsCardsHidden}
                    />

                } else {

                    return <div key={i}/>

                }
            })}

        </div>
    )
}