import React from 'react'
import {Button, Layout} from 'antd'
import './LayoutCustom.css'
import {Game} from '../Game/Game'
import {useDispatch, useSelector} from 'react-redux'
import {setGameMode, setIsLetterMode, setIsStarted} from '../../redux/gameReducer'
import {RootStateType} from '../../redux/rootReducer'
import useSound from 'use-sound'
import {setIsModalVisible, setModalType} from '../../redux/appReducer'
import {useEffect} from 'react'
import {authLogout, cleanAuthError, setIsAuthenticated, setIsMessageShow} from '../../redux/authReducer'
import {RecordsList} from '../RecordsList/RecordsList'
import {SelectCustom} from '../SelectCustom/SelectCustom'

// @ts-ignore
import a1 from '../../assets/audio/a1.mp3'
import {PlayMusic} from '../PlayMusic/PlayMusic'

const {Header, Content, Footer} = Layout

export const LayoutCustom = () => {
    const dispatch = useDispatch()

    const isStarted = useSelector((state: RootStateType) => state.game.isStarted)
    const count = useSelector((state: RootStateType) => state.game.count)
    const userName = useSelector((state: RootStateType) => state.auth.name)
    const [play] = useSound(a1)
    const startHandler = () => {
        dispatch(setIsStarted(true))
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

    useEffect(() => {
        const localStorageAuthData = JSON.parse(localStorage.getItem('userData') as string)
        localStorageAuthData && dispatch(setIsAuthenticated(localStorageAuthData))
    }, [])


    return (
        <>
            <Layout className="layout">
                <Header>
                    <div>

                    </div>
                    <h1 >MEMORY GAME</h1>

                    <button onClick={()=>play()}>0</button>
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
                            <PlayMusic/>

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


