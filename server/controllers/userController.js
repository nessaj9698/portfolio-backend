import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '../models/user.js'


export const register = async (request, resolve) => {
    try {
       
        const password = request.body.password;
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
       
        const doc = new UserModel({
            login: request.body.login,
            passwordHash: hash
        })

        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id
        }, 'secret123',
            {
                expiresIn: '30d'
            })

        const { passwordHash, ...userData } = user._doc

        resolve.json(
            {
                ...user._doc,
                token
            }
        )
    }
    catch (error) {
        console.log(error)
        resolve.status(500).json({
            message: 'Ошибка!'
        })

    }

}

export const login = async (request, resolve) => {
    try {
        const user = await UserModel.findOne({ login: request.body.login })
        if (!user) {
            return request.status(404).json({
                message: 'Пользователь не найден'
            })
        }
        const isValidPassword = await bcrypt.compare(request.body.password, user._doc.passwordHash)

        if (!isValidPassword) {
            return resolve.status(404).json({
                message: 'Логин или пароль неверны!'
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, 'secret123',
            {
                expiresIn: '30d'
            })

            const { passwordHash, ...userData } = user._doc

            resolve.json(
                {
                    ...user._doc,
                    token
                }
            )
    } catch (error) {
        console.log(error)
        resolve.status(500).json({
            message: 'Не удалось авторизоваться!'
        })
    }
}

export const getMe = async (request,resolve) => {
    try {
        const user = await UserModel.findById(request.userId)

        if (!user) {
            resolve.status(404).json({
                message:'Пользователь не найден'
            })
        } 
            const { passwordHash, ...userData } = user._doc

            resolve.json(
                {
                    ...userData,
                   
                }
            )
       
    } catch (error) {
        console.log(error)
        resolve.status(500).json({
            message:'Нет доступа!'
        })
    }
}