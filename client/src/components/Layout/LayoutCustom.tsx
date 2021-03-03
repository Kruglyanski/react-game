import React from 'react'
import {Button, Layout, Popover} from 'antd'
import {YoutubeOutlined} from '@ant-design/icons'
import './LayoutCustom.css'
import {Game} from '../Game/Game'
import {useDispatch, useSelector} from 'react-redux'
import {
    createCount,
    setCurrentGameNumber,
    setGameMode,
    setIsStarted
} from '../../redux/gameReducer'
import {RootStateType} from '../../redux/rootReducer'
import useSound from 'use-sound'
import {setIsModalVisible, setModalType, setVolume, setIsPlayClicked, setIsSoundEnabled} from '../../redux/appReducer'
import {useEffect} from 'react'
import {authLogout, setIsAuthenticated} from '../../redux/authReducer'

// @ts-ignore
import soundUrl from '../../assets/audio/m2.mp3'

import {Controls} from '../Controls/Controls'
import {StartPageContent} from '../StartPageContent/StartPageContent'


const {Header, Content, Footer} = Layout

export const LayoutCustom = () => {
    const dispatch = useDispatch()
    const game = useSelector((state: RootStateType) => state.game)
    const auth = useSelector((state: RootStateType) => state.auth)
    const app = useSelector((state: RootStateType) => state.app)

//добавляем музыку:
    const [play, {stop, isPlaying}] = useSound(soundUrl, {
        volume: app.volume
    })
//обработчик кнопки Начать
    const startHandler = () => {
        dispatch(setIsStarted(true))

    }
//обработчик кнопки Завершить
    const reStartHandler = async () => {
        dispatch(setModalType('gameOver'))
        dispatch(setIsModalVisible(true))
        await dispatch(createCount({count: game.count, name: auth.name}))
        dispatch(setGameMode('Средняя'))
        dispatch(setCurrentGameNumber(0))

    }

//обработчик кнопки Выйти
    const logoutHandler = () => {
        dispatch(authLogout())
        localStorage.removeItem('userData')

    }
//обработчик кнопки ТОП-10
    const recordsHandler = () => {
        dispatch(setModalType('records'))
        dispatch(setIsModalVisible(true))
    }
//обработчик кнопки Вкл/Выкл музыку
    const playToggleClick = () => {
        dispatch(setIsPlayClicked())
        isPlaying
            ?
            stop()
            :
            play()
    }
//обработчик кнопки громкость +
    const volumePlusClick = () => {
        dispatch(setVolume(app.volume + 0.1))
    }
//обработчик кнопки громкость -
    const volumeMinusClick = () => {
        dispatch(setVolume(app.volume - 0.1))

    }
//обработчик кнопки Вкл/Выкл звуки
    const toggleSoundsHandler = () => {
        dispatch(setIsSoundEnabled(!app.isSoundEnabled))

    }
//обработчик события keydown (горячие клавиши)
    const keyPressHandler = (e: KeyboardEvent) => {
        if (['Escape', ' ', '=', '-', '0', '9'].includes(e.key)) {
            e.preventDefault()
            e.key === ' ' && !game.isStarted && startHandler()
            e.key === 'Escape' && reStartHandler()
            e.key === '=' && volumePlusClick()
            e.key === '-' && volumeMinusClick()
            e.key === '0' && playToggleClick()
            e.key === '9' && toggleSoundsHandler()
        }
    }
//авторизация из LocalStorage
    useEffect(() => {
        const localStorageAuthData = JSON.parse(localStorage.getItem('userData') as string)
        localStorageAuthData && dispatch(setIsAuthenticated(localStorageAuthData))
    }, [dispatch])

//добавляем прослушку событий нажатия клавиш
    useEffect(() => {
        document.addEventListener('keydown', keyPressHandler, false)

        return () => {
            document.removeEventListener('keydown', keyPressHandler, false)
        }
    })

    return (
        <>
            <Layout className='layout'>
                <Header >
                    <h1>SEQUENT GAME</h1>
                    {auth.isAuthenticated && <div className='hello'>
                        Привет,&nbsp;{auth.name}!&nbsp;&nbsp;&nbsp;
                        <a href='/' onClick={logoutHandler}>Выйти</a>
                    </div>
                    }
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <div className={'site-layout-content'}>
                        <div className="controls">
                            <Controls //кнопки управления звуком и темой
                                playToggleClick={playToggleClick}
                                volumePlusClick={volumePlusClick}
                                volumeMinusClick={volumeMinusClick}
                                play={play}
                                isPlaying={isPlaying}
                                toggleSoundsHandler={toggleSoundsHandler}
                            />

                        </div>
                        <div className="stats">
                             <b style={{color: 'green'}}>Cчёт: {game.count}</b>
                            <a href={'/'} onClick={recordsHandler}>&nbsp;&nbsp;&nbsp;<b>ТОП-10</b></a>
                        </div>
                        {game.isStarted && <Button //кнопка завершить
                            style={{width: 100, height: 30, display: 'inline-block', fontSize: 14}}
                            type="primary"
                            onClick={reStartHandler}
                            className={'finishButton'}
                        >
                            Завершить
                        </Button>}
                        <br/>
                        {
                            game.isStarted
                                ?
                                    <Game/>//игровое поле
                                :

                                <div>
                                    <StartPageContent/>
                                    <br/>
                                    <Button // кнопка начать / дальше
                                        style={{width: 150, height: 50}}
                                        type="primary"
                                        onClick={startHandler}
                                        className="startButton"
                                    >
                                        {game.count === 0 ? 'Начать' : 'Дальше'}
                                    </Button>
                                </div>
                        }


                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}} >
                    <div className="footerContent">
                        Created by <a href="https://github.com/Kruglyanski">Roman Kruglyansky</a> 2021
                        <a href="https://rs.school/js/">
                            <div className="rs"/>
                        </a>

                    </div>
                    <Popover content={'Ссылка на видео с пояснением'}>
                        <a href={'/'}><YoutubeOutlined style={{fontSize: 40}}/></a>
                    </Popover>
                </Footer>
            </Layout>
        </>

    )
}


