import {Button} from 'antd'
import React, {useEffect} from 'react'
import useSound from 'use-sound'
// @ts-ignore
import soundUrl from '../../assets/audio/m2.mp3'
import {setIsSoundEnabled, setVolume} from '../../redux/appReducer'
import {RootStateType} from '../../redux/rootReducer'
import {useDispatch, useSelector} from 'react-redux'

type PropsType = {
    playToggleClick: () => void
    volumePlusClick: () => void
    volumeMinusClick: () => void
    play: () => void
    isPlaying: boolean
    toggleSoundsHandler: () => void
}
export const PlayMusic: React.FC<PropsType> = ({playToggleClick,  volumePlusClick, volumeMinusClick, isPlaying,  play, toggleSoundsHandler}) => {
    const dispatch = useDispatch()
    const isSoundEnabled = useSelector((state: RootStateType) => state.app.isSoundEnabled)
    const isPlayClicked = useSelector((state: RootStateType) => state.app.isPlayClicked)
    const volume = useSelector((state: RootStateType) => state.app.volume)


    console.log('isPlaying', isPlaying)
    useEffect(() => {
        isPlayClicked && !isPlaying && play()
    }, [isPlaying, isPlayClicked])

    return (
        <>
            <Button onClick={playToggleClick}>
            <span role="img" aria-label="Heart">
            </span>
            </Button>
            <Button onClick={volumeMinusClick}>
                <span>-</span>
            </Button>
            <Button onClick={volumePlusClick}>
                <span>+</span>
            </Button>
            <Button onClick={toggleSoundsHandler}>
                <span>/</span>
            </Button>

        </>

    )
}