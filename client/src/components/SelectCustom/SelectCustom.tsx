import React from 'react'
import { Select } from 'antd'
import {useDispatch} from 'react-redux'
import { setGameMode } from '../../redux/gameReducer'
const { Option } = Select

type SelectOptionsType = {
    items: Array<string>
    default: number
}

type PropsType = {
    selectOptions: SelectOptionsType
    handleChange: (value: string) => void
}


export const SelectCustom: React.FC<PropsType> = ({selectOptions, handleChange}) => {
const dispatch = useDispatch()
    // const handleChange = (value: string) => {
    //
    //     dispatch(setGameMode(value))
    // }
    return (
        <>
            <Select
                defaultValue={selectOptions.items[selectOptions.default]}
                style={{ width: 120 }}
                onChange={handleChange}
            >
                {selectOptions.items.map((i, index) =><Option key={index} value={i}>{i}</Option>)}


            </Select>

        </>
    )
}







