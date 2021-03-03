import React from 'react'
import {RootStateType} from '../../redux/rootReducer'
import {useSelector} from 'react-redux'
import { Alert } from 'antd';



export const Message = () => {
    const isRegistered = useSelector((state: RootStateType) => state.auth.isRegistered)
    const isAuthenticated = useSelector((state: RootStateType) => state.auth.isAuthenticated)
    const isMessageShow = useSelector((state: RootStateType) => state.auth.isMessageShow)
    const registerMessage = useSelector((state: RootStateType) => state.auth.registerMessage)
    const authError = useSelector((state: RootStateType) => state.auth.authError)
    const modalType = useSelector((state: RootStateType) => state.app.modalType)



    return (
    //     <>
    //     <Alert message="Success Text" type="success" />
    //     <Alert message="Info Text" type="info" />
    //     <Alert message="Warning Text" type="warning" />
    //     <Alert message="Error Text" type="error" />
    // </>
        <>
            {
                isMessageShow
                    ?
                    <>
                        {
                            modalType === 'login'
                                ? isAuthenticated
                                ?<Alert message='Вход выполнен' type="success" closable/>
                                :authError && <Alert message={authError} type="error" closable/>
                                : null


                        }
                        {
                            modalType === 'register'
                                ? isRegistered
                                ? <Alert message={registerMessage} type="success" closable/>
                                : <Alert message={registerMessage} type="error" closable />
                                : null
                        }

                   </>
                    :
                    null
            }
        </>
    )
}