import React  from 'react'
import {Layout} from 'antd'
import './LayoutCustom.css'

import {Game} from '../Game/Game'

const {Header, Content, Footer} = Layout

export const LayoutCustom = () => {


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
                   <Game/>
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


