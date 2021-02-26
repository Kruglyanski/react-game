import React, {useState} from 'react'
import {Card} from '../Card/Card'

//Тасование Фишера — Йетса:
function shuffle(array: Array<number>) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}
const modeCards = 8
const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
const shuffledNumbers = shuffle(numbers)

export const Game = () => {
    console.log(shuffledNumbers)
    const slicedShuffle = shuffledNumbers.slice(0, modeCards)
    console.log(slicedShuffle)


    const [currentTargetNumber, setCurrentTargetNumber] = useState(0)




    return (
        <div className="game">

            {shuffledNumbers.map(i =>{

                if (i<=modeCards){

                  return  <Card key={i} number={i} setCurrentTargetNumber={setCurrentTargetNumber} slicedShuffle={slicedShuffle}/>

                } else {

                    return <div key={i} />

                }
            } )}

        </div>
    )
}