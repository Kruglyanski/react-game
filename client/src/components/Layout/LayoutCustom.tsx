import React from 'react'
import {Button, Layout} from 'antd'
import './LayoutCustom.css'

import {Game} from '../Game/Game'
import {useDispatch, useSelector} from 'react-redux'
import {setIsStarted} from '../../redux/gameReducer'
import {RootStateType} from '../../redux/rootReducer'

const {Header, Content, Footer} = Layout

export const LayoutCustom = () => {
    const dispatch = useDispatch()
    const isStarted = useSelector((state: RootStateType) => state.game.isStarted)
    const startHandler = () => {
        dispatch(setIsStarted(true))
    }

    return (
        <Layout className="layout">
            <Header>
                <div>

                </div>
                <h1>MEMORY GAME</h1>
                <div className='me'>
                    <div className='name'>Имя Фамилия</div>

                    <div className='logout'>
                        <a href={'#'}>Выйти</a>
                    </div>
                </div>
            </Header>
            <Content style={{padding: '0 50px'}}>
                <div className="site-layout-content">
                    <div className="stats">

                    </div>

                    {
                        isStarted
                            ?
                            <Game/>
                            :
                            <Button
                                style={{width: 150, height: 50}}
                                type="primary"
                                onClick={startHandler}
                                className="startButton"
                            >
                                Начать!
                            </Button>
                    }

                    <div className="controls">


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
    )
}


