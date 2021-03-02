import React from 'react'
import {Button, Layout, Popover} from 'antd'
import {YoutubeOutlined} from '@ant-design/icons'
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
import {setIsModalVisible, setModalType, setVolume, setIsPlayClicked, setIsSoundEnabled, setTheme} from '../../redux/appReducer'
import {useEffect} from 'react'
import {authLogout, cleanAuthError, setIsAuthenticated, setIsMessageShow} from '../../redux/authReducer'
import {RecordsList} from '../RecordsList/RecordsList'
import {SelectCustom} from '../SelectCustom/SelectCustom'

// @ts-ignore
import soundUrl from '../../assets/audio/m2.mp3'

import {Controls} from '../Controls/Controls'


const {Header, Content, Footer} = Layout

export const LayoutCustom = () => {
    const dispatch = useDispatch()
    const isStarted = useSelector((state: RootStateType) => state.game.isStarted)
    const name = useSelector((state: RootStateType) => state.auth.name)
    const isAuthenticated = useSelector((state: RootStateType) => state.auth.isAuthenticated)
    const isSoundEnabled = useSelector((state: RootStateType) => state.app.isSoundEnabled)
    const theme = useSelector((state: RootStateType) => state.app.theme)
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
    const recordsHandler = () => {
        dispatch(setModalType('records'))
        dispatch(setIsModalVisible(true))
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
    const keyPressHandler = (e: KeyboardEvent) => {
        if (['Escape', ' ', '=', '-', '0', '9'].includes(e.key)) {
            e.preventDefault()
            e.key === ' ' && !isStarted && startHandler()
            e.key === 'Escape' && reStartHandler()
            e.key === '=' && volumePlusClick()
            e.key === '-' && volumeMinusClick()
            e.key === '0' && playToggleClick()
            e.key === '9' && toggleSoundsHandler()
        }
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
            <Layout className='layout'>
                <Header >

                    <h1 >SEQUENT GAME</h1>

                    {isAuthenticated && <div
                        className='hello'>
                        Привет,&nbsp;{userName}!&nbsp;&nbsp;&nbsp;
                        <a href='/' onClick={logoutHandler}>Выйти</a>
                    </div>
                    }

                </Header>
                <Content style={{padding: '0 50px'}}>
                    <div className={'site-layout-content'}>
                        <div className="controls">
                            <Controls
                                playToggleClick={playToggleClick}
                                volumePlusClick={volumePlusClick}
                                volumeMinusClick={volumeMinusClick}
                                play={play}
                                isPlaying={isPlaying}
                                toggleSoundsHandler={toggleSoundsHandler}
                            />
                            <br/>
                            <br/>

                        </div>
                        <div className="stats">
                            Ваш текущий счёт: <b>{count}</b> <a onClick={recordsHandler}>&nbsp;&nbsp;&nbsp;<b>ТОП-10</b></a>
                        </div>
                        <br/>
                        {
                            isStarted
                                ?
                                <div>

                                    <Button
                                        style={{width: 150, height: 50}}
                                        type="primary"
                                        onClick={reStartHandler}
                                        className={'finishButton'}
                                    >
                                        Завершить
                                    </Button>
                                    <br/>
                                    <br/>
                                    <Game/>
                                    <br/>
                                    <br/>


                                </div>

                                :
                                <div>
                                    {
                                        count === 0 && <>
                                            <p>Для того, чтобы участвовать в статистике игры, <a
                                                onClick={loginHandler}>войдите</a> в систему или<a
                                                onClick={registerHandler}> зарегистрируйтесь</a>!</p>
                                            <h3>Правила игры:</h3>
                                            <p>Перед началом игры можно выбрать опции игры, по умолчанию сложность
                                                выставлена
                                                в значение "Средне", а символы в значение "Цифры", также можно сменить
                                                оформление игрового поля. В зависимости от выбранной сложности
                                                за победу в каждом уровне будет начисляться соответственно 1, 2, 8 и 16
                                                очков.
                                                После нажатия кнопки "Начать" появится игровое поле с карточками, на
                                                которых
                                                изображены
                                                цифры, либо буквы латинского алфавита. Время отображения - 3 секунды,
                                                далее
                                                карточки
                                                закрываются. Необходимо по памяти последовательно кликнуть все карточки
                                                в
                                                порядке
                                                возрастания номеров или индексов букв в алфавите. Клик по неверной
                                                карточке -
                                                проигрыш.

                                            </p>
                                            <h3>Выберите опции игры:</h3>
                                            <div className="optionsWrapper">

                                                <div className="gameMode">Сложность: &nbsp;
                                                    <SelectCustom
                                                        selectOptions={{
                                                            items: ['Легкая', 'Средняя', 'Тяжелая', 'Ад'],
                                                            default: 1
                                                        }}
                                                        handleChange={(value) => dispatch(setGameMode(value))}
                                                    />
                                                </div>
                                                <div className="themeMode">Тема: &nbsp;
                                                    <SelectCustom
                                                        selectOptions={{
                                                            items: ['Тёмная', 'Светлая'],
                                                            default: 1
                                                        }}
                                                        handleChange={(value) => dispatch(setTheme(value))}
                                                    />
                                                </div>
                                                <div className="symbolMode">Символы: &nbsp;
                                                    <SelectCustom
                                                        selectOptions={{
                                                            items: ['Цифры', 'Буквы'],
                                                            default: 0
                                                        }}
                                                        handleChange={(value) => dispatch(setIsLetterMode(value))}
                                                    />
                                                </div>
                                            </div>

                                            <br/>
                                            <h3>Горячие клавиши:</h3>
                                            <p>
                                                <b>"Space"</b> - начать игру&nbsp;
                                                <b>"Escape"</b> - завершить игру<br/>
                                                <b>"="</b> - добавить громкость&nbsp;
                                                <b>"-"</b> - убавить громкость<br/>
                                                <b>"0"</b> - Вкл./откл. звуки&nbsp;
                                                <b>"9"</b> - Вкл./откл. музыку
                                            </p>
                                        </>
                                    }
                                    <Button
                                        style={{width: 150, height: 50}}
                                        type="primary"
                                        onClick={startHandler}
                                        className="startButton"
                                    >
                                        {count === 0 ? 'Начать' : 'Дальше'}
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


