import React, {useEffect} from 'react'
import {
    Form,
    Input,
    Tooltip,
    Button
} from 'antd'
import {QuestionCircleOutlined} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from '../../redux/rootReducer'
import {authRegister, registrationFormChange, setIsMessageShow, setIsRegistered} from '../../redux/authReducer'
import {setIsModalVisible} from '../../redux/appReducer'


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 8
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 16
        }
    }
}

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 8
        }
    }
}
export const RegistrationForm = () => {
    const [CustomForm] = Form.useForm()
    const dispatch = useDispatch()
    const registrationForm = useSelector((state: RootStateType) => state.auth.registrationForm)
    const isRegistered = useSelector((state: RootStateType) => state.auth.isRegistered)

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(registrationFormChange({[event.target.name]: event.target.value}))
    }
    const registerHandler = async () => {
        await dispatch(authRegister(registrationForm))
        dispatch(setIsMessageShow(true))


    }
    useEffect(() => {
        isRegistered
        && dispatch(setIsModalVisible(false))


    }, [isRegistered])


    return (
        <>
            <Form

                {...formItemLayout}
                form={CustomForm}
                name="register"
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'Введен невалидный E-mail!'
                        },
                        {
                            required: true,
                            message: 'Введите ваш E-mail!'
                        }
                    ]}
                >
                    <Input
                        name="email"
                        value={registrationForm.email}
                        onChange={changeHandler}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[
                        {
                            required: true,
                            message: 'Введите пароль!'
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        name="password"
                        value={registrationForm.password}
                        onChange={changeHandler}
                    />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Подтвердите пароль"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Подтвердите пароль!'
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve()
                                }

                                return Promise.reject('Пароли не совпадают!')
                            }
                        })
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="name"
                    label={
                        <span>
                        Имя
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Введите имя!',
                            whitespace: true
                        }
                    ]}
                >
                    <Input
                        name="name"
                        value={registrationForm.name}
                        onChange={changeHandler}
                    />
                </Form.Item>
                <br/>
                <Form.Item {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{width: 150}}
                        onClick={registerHandler}
                    >
                        Зарегистрироваться
                    </Button>
                </Form.Item>


            </Form>

        </>
    )

}