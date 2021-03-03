import {SelectCustom} from '../SelectCustom/SelectCustom'
import {setGameMode, setIsLetterMode} from '../../redux/gameReducer'
import {setIsModalVisible, setModalType, setTheme} from '../../redux/appReducer'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from '../../redux/rootReducer'
import {cleanAuthError, setIsRegistered} from '../../redux/authReducer'

export const StartPageContent = () => {
    const dispatch = useDispatch()
    const game = useSelector((state: RootStateType) => state.game)
    //обработчик кнопки зарегистрироваться
    const registerHandler = () => {
        dispatch(setModalType('register'))
        dispatch(setIsModalVisible(true))
        dispatch(setIsRegistered(false))

    }
//обработчик кнопки войти
    const loginHandler = () => {
        dispatch(setModalType('login'))
        dispatch(setIsModalVisible(true))
        dispatch(cleanAuthError())
    }
    return (
        <>
            {
                game.count === 0 && <>
                    <p>Для того, чтобы участвовать в статистике игры,
                        <a href={'/'} onClick={loginHandler}>войдите</a> в систему или
                        <a href={'/'} onClick={registerHandler}> зарегистрируйтесь</a>!</p>
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

        </>
    )
}
