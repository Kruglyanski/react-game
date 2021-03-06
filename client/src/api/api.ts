import {LoginFormType, RegistrationFormType} from '../redux/authReducer'
import {CreateCountType} from '../redux/gameReducer'
//api представлен в виде объектов с методами, отдельный метод - отдельный  запрос на сервер
export const api = {
    register(registrationForm: RegistrationFormType) {
        console.log(registrationForm)
        return fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationForm)
        }).then(function (response) {
            return response
        }).catch(function (error) {
            console.log(error)
        })
    },
    login(loginForm: LoginFormType) {

        return fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...loginForm
            })
        }).then(function (response) {
            return response
        }).catch(function (error) {
            console.log(error)
        })
    },
    count({count, name}: CreateCountType) {

        return fetch('/api/count', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                count, name
            })
        }).then(function (response) {
            return response
        }).catch(function (error) {
            console.log(error)
        })
    },
    records() {
        return fetch('/api/getrecords', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function (response) {
            return response
        })
            .catch(function (error) {
                console.log(error)
            })
    }

}