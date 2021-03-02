import React from 'react'
import {Button, Layout} from 'antd'
import './LayoutCustom.css'
import {Game} from '../Game/Game'
import {useDispatch, useSelector} from 'react-redux'
import {
    createCount,
    setCount,
    setCurrentGameNumber,
    setGameMode,
    setIsLetterMode,
    setIsStarted
} from '../../redux/gameReducer'
import {RootStateType} from '../../redux/rootReducer'
import useSound from 'use-sound'
import {setIsModalVisible, setModalType, setVolume, setIsPlayClicked, setIsSoundEnabled} from '../../redux/appReducer'
import {useEffect} from 'react'
import {authLogout, cleanAuthError, setIsAuthenticated, setIsMessageShow} from '../../redux/authReducer'
import {RecordsList} from '../RecordsList/RecordsList'
import {SelectCustom} from '../SelectCustom/SelectCustom'

// @ts-ignore
 import soundUrl from '../../assets/audio/m2.mp3'

import {PlayMusic} from '../PlayMusic/PlayMusic'


const {Header, Content, Footer} = Layout

export const LayoutCustom = () => {
    const dispatch = useDispatch()
    const isStarted = useSelector((state: RootStateType) => state.game.isStarted)
    const name = useSelector((state: RootStateType) => state.auth.name)
    const isSoundEnabled = useSelector((state: RootStateType) => state.app.isSoundEnabled)
    const volume = useSelector((state: RootStateType) => state.app.volume)
    const count = useSelector((state: RootStateType) => state.game.count)
    const userName = useSelector((state: RootStateType) => state.auth.name)

    const [play, {stop, isPlaying}] = useSound(soundUrl, {
        volume: volume
    })
    const startHandler = () => {
        dispatch(setIsStarted(true))

    }

    const reStartHandler = async () => {
        dispatch(setModalType('gameOver'))
        dispatch(setIsModalVisible(true))
        await dispatch(createCount({count, name}))
        dispatch(setCurrentGameNumber(0))
        dispatch(setCount(0))
    }

    const registerHandler = () => {
        dispatch(setModalType('register'))
        dispatch(setIsModalVisible(true))
        dispatch(cleanAuthError())
    }

    const loginHandler = () => {
        dispatch(setModalType('login'))
        dispatch(setIsModalVisible(true))
        dispatch(cleanAuthError())
        dispatch(setIsMessageShow(false))
    }

    const logoutHandler = () => {
        dispatch(authLogout())
        localStorage.removeItem('userData')

    }
    const playToggleClick = () => {
        dispatch(setIsPlayClicked())
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
    const toggleSoundsHandler = () => {
        dispatch(setIsSoundEnabled(!isSoundEnabled))

    }
    const keyPressHandler = (e:KeyboardEvent) => {
        e.preventDefault()
        e.key === ' ' && !isStarted && startHandler()
        e.key === "Escape" && reStartHandler()
        e.key === "=" && volumePlusClick()
        e.key === "-" && volumeMinusClick()
        e.key === "0" && playToggleClick()
        e.key === "9" && toggleSoundsHandler()
    }

    useEffect(() => {
        const localStorageAuthData = JSON.parse(localStorage.getItem('userData') as string)
        localStorageAuthData && dispatch(setIsAuthenticated(localStorageAuthData))
    }, [])


    useEffect(() => {
        document.addEventListener('keydown', keyPressHandler, false)

        return () => {
            document.removeEventListener('keydown', keyPressHandler, false)
        }
    }, [keyPressHandler])

    return (
        <>
            <Layout className="layout">
                <Header>
                    <div>

                    </div>
                    <h1 >MEMORY GAME</h1>

                    <div  className='me'>
                        <div className='name'>{userName}</div>

                        <div className='logout' onClick={() => console.log('exit')}>
                            <a href='/' onClick={logoutHandler}>Выйти</a>
                        </div>
                    </div>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <div className="site-layout-content">
                        <div className="stats">
                            Счёт: {count}
                            <RecordsList/>
                        </div>

                        {
                            isStarted
                                ?
                                <Game/>
                                :
                                <div>
                                    <p>Для того, чтобы участвовать в статистике игры, <a
                                        onClick={loginHandler}>войдите</a> в систему или<a
                                        onClick={registerHandler}> зарегистрируйтесь</a>!</p>
                                    {
                                        count === 0 && <div>
                                            <div>Сложность:</div>
                                            <SelectCustom
                                                selectOptions ={{
                                                items: ['Легко', 'Средне', 'Тяжело', 'Ад'],
                                                default: 1
                                            }}
                                                handleChange={(value) =>dispatch(setGameMode(value))}
                                            />
                                            <SelectCustom
                                                selectOptions ={{
                                                items: ['Цифры', 'Буквы'],
                                                default: 0
                                            }}
                                                handleChange={(value) =>dispatch(setIsLetterMode(value))}
                                            />
                                        </div>
                                    }
                                    <Button
                                        style={{width: 150, height: 50}}
                                        type="primary"
                                        onClick={startHandler}
                                        className="startButton"
                                    >
                                        {count === 0 ? 'Начать!' : 'Дальше'}
                                    </Button>
                                </div>
                        }

                        <div className="controls">
                            <PlayMusic
                                playToggleClick={playToggleClick}
                                volumePlusClick={volumePlusClick}
                                volumeMinusClick={volumeMinusClick}
                                play={play}
                                isPlaying={isPlaying}
                                toggleSoundsHandler={toggleSoundsHandler}
                            />
                            <Button
                                style={{width: 150, height: 50}}
                                type="primary"
                                onClick={reStartHandler}
                                className="startButton"
                            >
                                Играть заново!
                            </Button>
                        </div>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    <div className="footerContent">
                        Created by <a href="https://github.com/Kruglyanski">Roman Kruglyansky</a> 2021
                        <a href="https://rs.school/js/">
                            <div className="rs"/>
                        </a>
                    </div>

                </Footer>
            </Layout>
        </>

    )
}


