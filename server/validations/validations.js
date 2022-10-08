import { body } from "express-validator";

export const registerValidator = [
    body('login').isLength({min:4}),
    body('password').isLength({ min:5 })

]

export const loginValidator = [
    body('login').isLength({min:4}),
    body('password').isLength({ min:5 })

]

export const postCreateValidator = [
    body('title', "Введите заголовок статьи").isLength({min:4}).isString(),
    body('text', "Введите текст статьи").isLength({min:10}).isString(),
    body('imageURL', "Неверная ссылка на изображение").optional().isString(),
    body('tags', "Ошибка с метками").optional().isString(),

]