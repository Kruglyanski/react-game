import {Button} from 'antd'
import React, {useEffect} from 'react'
import useSound from 'use-sound'
// @ts-ignore
import soundUrl from '../../assets/audio/m2.mp3'
import { setIsSoundEnabled, setVolume } from '../../redux/appReducer'
import {RootStateType} from '../../redux/rootReducer'
import {useDispatch, useSelector} from 'react-redux'

export const PlayMusic = () => {
    const dispatch = useDispatch()
    const isSoundEnabled = useSelector((state: RootStateType) => state.app.isSoundEnabled)
    const volume = useSelector((state: RootStateType) => state.app.volume)
    const [isPlayClicked, setIsPlayClicked] = React.useState(false)
    const [play, {stop, isPlaying}] = useSound(soundUrl, {
        volume: volume
    })
console.log("isPlaying", isPlaying)
    useEffect(() => {
        isPlayClicked && !isPlaying && play()
    },[isPlaying, isPlayClicked])
    const playClick = () => {
        setIsPlayClicked(!isPlayClicked)
        isPlaying
        ?
        stop()
            :
        play()
    }
    const volumePlusClick = () => {
        dispatch(setVolume(volume + 0.1))

    }
    const volumeMinusClick = () => {
        dispatch(setVolume(volume - 0.1))

    }
    return (
        <>
            <Button onClick={playClick}>
            <span role="img" aria-label="Heart">
            </span>
            </Button>
            <Button onClick={volumeMinusClick}>
            <span>-</span>
            </Button>
            <Button onClick={volumePlusClick}>
            <span>+</span>
            </Button>
            <Button onClick={() => dispatch(setIsSoundEnabled(!isSoundEnabled))}>
            <span>/</span>
            </Button>

        </>

    )
}