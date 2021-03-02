import {Button, Popover} from 'antd'
import React, {useEffect} from 'react'
import {PlayCircleOutlined, CaretUpOutlined, CaretDownOutlined, BellOutlined, BgColorsOutlined} from '@ant-design/icons'
import {RootStateType} from '../../redux/rootReducer'
import {useDispatch, useSelector} from 'react-redux'
import {setTheme} from '../../redux/appReducer'

type PropsType = {
    playToggleClick: () => void
    volumePlusClick: () => void
    volumeMinusClick: () => void
    play: () => void
    isPlaying: boolean
    toggleSoundsHandler: () => void
}
export const Controls: React.FC<PropsType> = ({playToggleClick, volumePlusClick, volumeMinusClick, isPlaying, play, toggleSoundsHandler}) => {
    const dispatch = useDispatch()
    const isPlayClicked = useSelector((state: RootStateType) => state.app.isPlayClicked)
    const theme = useSelector((state: RootStateType) => state.app.theme)

    useEffect(() => {
        isPlayClicked && !isPlaying && play()
    }, [isPlaying, isPlayClicked])

    const toggleTheme = () => {
        theme === 'Светлая' && dispatch(setTheme('Тёмная'))
        theme === 'Тёмная' && dispatch(setTheme('Светлая'))
    }

    return (
        <>
            <Popover content={'Музыка: on/off'}>
                <Button
                    shape="circle"
                    onClick={playToggleClick}
                    icon={<PlayCircleOutlined/>}
                />
            </Popover>

            <Popover content={'Громкость -'}>
                <Button
                    shape="circle"
                    onClick={volumeMinusClick}
                    icon={<CaretDownOutlined/>}
                />
            </Popover>
            <Popover content={'Громкость +'}>
                <Button
                    shape="circle"
                    onClick={volumePlusClick}
                    icon={<CaretUpOutlined/>}

                />
            </Popover>
            <Popover content={'Звуки: on/off'}>
                <Button
                    shape="circle"
                    onClick={toggleSoundsHandler}
                    icon={<BellOutlined/>}
                />
            </Popover>
            <Popover content={'Сменить тему'}>
                <Button
                    shape="circle"
                    onClick={toggleTheme}
                    icon={<BgColorsOutlined/>}
                />
            </Popover>

        </>

    )
}