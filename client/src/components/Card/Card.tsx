import React, {useState} from 'react'
import './Card.css'

type PropsType = {
    number: number | null
    slicedShuffle: Array<number>
    setCurrentTargetNumber: (arg: any) => void

}
export const Card: React.FC<PropsType> = ({number,slicedShuffle, setCurrentTargetNumber}) => {

    const [isActiveClass, setIsActiveClass] = useState(false)
    const cardHandler = (event:React.SyntheticEvent<HTMLDivElement>) =>{

    }

    return (
        <div className={`card ${isActiveClass && 'active'}`} onClick={cardHandler} title={String(number)}>
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