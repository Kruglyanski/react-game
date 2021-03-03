Приложение Sequent Game представляет из себя игру наподобие Memory. Суть - нужно запомнить карточки, пока они открыты, и далее последовательно кликать.
При написании Frontend использовались React, Redux, Typescript,  AntDesign.
На начальной странице имеются кнопки вкл/выкл музыку, управление уровнем громкости и переключения темы, статистика игры - счёт игрока и топ-10 лучших игр. Далее имеется диалог, предлагающий войти или зарегистрироваться в приложении.
Данные регистрации уходят на сервер и хранятся в базе данных. 
Формы регистрации и входа, а также топ-10 открываются в модальном окне.
Если зарегистрироваться и далее авторизоваться, то  появляется приветственная надпись с вашим именем и кнопка Выйти под заголовком игры.
Дальше идут правила игры, три опции игры, описание горячих клавиш и кнопка “Начать”.
При нажатии на кнопку игра начинается. 
На странице непосредственно игры присутствуют контролы и статистика также как и на начальной странице, а также кнопка завершить для преждевременной остановки игры. 
При завершении счёт записывается в базу данных.
Backend организован с помощью NodeJS, Express, MongoDb. 

Демо развернуто на сервисе Heroku:
        https://cryptic-mountain-62611.herokuapp.com/


https://www.youtube.com/watch?v=XLozAFQmoI8 небольшой обзор

yarn - to install<br/>
yarn dev - to run development mode
