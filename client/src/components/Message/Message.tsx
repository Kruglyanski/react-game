import React from 'react'
import {RootStateType} from '../../redux/rootReducer'
import {useSelector} from 'react-redux'
import {Space, message} from 'antd'

export const Message = () => {
    const isRegistered = useSelector((state: RootStateType) => state.auth.isRegistered)
    const isMessageShow = useSelector((state: RootStateType) => state.auth.isMessageShow)
    const registerMessage = useSelector((state: RootStateType) => state.auth.registerMessage)
    const authError = useSelector((state: RootStateType) => state.auth.authError)
    const modalType = useSelector((state: RootStateType) => state.app.modalType)
    return (
        <>
            {
                isMessageShow
                    ?
                    <Space>
                        {
                            modalType === 'login'
                                ? authError
                                ? message.error(authError)
                                : message.success('Вход выполнен')
                                : null


                        }
                        {
                            modalType === 'register'
                                ? isRegistered
                                ? message.success(registerMessage)
                                : message.error(registerMessage)
                                : null
                        }

                    </Space>
                    :
                    null
            }
        </>
    )
}