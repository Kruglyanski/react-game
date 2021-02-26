import React, {useState} from 'react'
import './Card.css'
import {useDispatch, useSelector} from 'react-redux'
import {setCurrentGameNumber, setIsError} from '../../redux/gameReducer'
import {RootStateType} from '../../redux/rootReducer'
type PropsType = {
    number: number | null


}
export const Card: React.FC<PropsType> = ({number}) => {
const dispatch = useDispatch()
    const currentGameNumber = useSelector((state: RootStateType) => state.game.currentGameNumber)
    const isError = useSelector((state: RootStateType) => state.game.isError)
    const [isActiveClass, setIsActiveClass] = useState(false)
    const [isErrorClass, setIsErrorClass] = useState(false)
    const cardHandler = () =>{
                if(currentGameNumber===number){
                    console.log('ok')
                    dispatch(setCurrentGameNumber())
                    setIsActiveClass(!isActiveClass)
                } else {
                    dispatch(setIsError(true))
                    setIsErrorClass(true)
                    console.log('ne ok')
                }
    }

    const classNames =['card']
    isActiveClass && classNames.push('activeCard')
    isErrorClass && classNames.push('errorCard')

    return (
        <div className={classNames.join(' ')} onClick={cardHandler} title={String(number)}>
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