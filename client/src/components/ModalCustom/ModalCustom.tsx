import React from 'react'
import {Modal} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from '../../redux/rootReducer'
import {setIsModalVisible} from '../../redux/appReducer'

type PropType = {
    children: React.ReactNode
}

export const ModalCustom:React.FC<PropType>  = (props) => {

    const dispatch = useDispatch()

    const isModalVisible = useSelector((state: RootStateType) => state.app.isModalVisible)

    const handleOk = () => {
        dispatch(setIsModalVisible(false))
    }


    const handleCancel = () => {
        dispatch(setIsModalVisible(false))
    }


    return (
        <>
            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                closable={false}
                bodyStyle={{borderRadius: 10}}
            >
                {props.children}
            </Modal>
        </>
    )
}

