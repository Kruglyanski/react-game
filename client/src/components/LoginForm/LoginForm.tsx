import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Form, Input} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import {
    authLogin,
    cleanAuthError,
    loginFormChange,
    setIsCustomModalVisible,
    setIsMessageShow
} from '../../redux/authReducer'
import {RootStateType} from '../../redux/rootReducer'
import {setIsModalVisible} from '../../redux/appReducer'


export const LoginForm: React.FC = () => {

    const dispatch = useDispatch()
    const loginForm = useSelector((state: RootStateType) => state.auth.loginForm)
    const isAuthenticated = useSelector((state: RootStateType) => state.auth.isAuthenticated)


    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(loginFormChange({[event.target.name]: event.target.value}))
    }

    const loginHandler = async () => {

        await dispatch(authLogin(loginForm))
        dispatch(setIsMessageShow(true))
        dispatch(setIsMessageShow(false))
        dispatch(cleanAuthError())

        dispatch(setIsModalVisible(false))

    }

    useEffect(() =>{
        isAuthenticated && dispatch(setIsModalVisible(false))
    }, [isAuthenticated])

    return (
        <div className="form-wrapper">

            <Form
                name="normal_login"
                className="login-form"
                initialValues={{remember: true}}
            >
                <div className='logo'/>
                <Form.Item
                    name="username"
                    rules={[{required: true, message: 'Пожалуйста, введите email!'}]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon"/>}
                        value={loginForm.email}
                        name="email"
                        onChange={changeHandler}
                        placeholder="Email"
                    />

                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Пожалуйста, введите пароль!'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        onChange={changeHandler}
                    />
                </Form.Item>

                <Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        onClick={loginHandler}
                    >
                       Войти
                    </Button>

                </Form.Item>
            </Form>
        </div>
    )
}