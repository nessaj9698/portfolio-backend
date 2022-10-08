import express from 'express';
import mongoose from 'mongoose'
import { registerValidator, loginValidator, postCreateValidator } from './server/validations/validations.js'
import {checkAuth, handleValidationErrors} from './server/utils/index.js'
import { userController, postController } from './server/controllers/index.js';
import multer from 'multer'
import cors from 'cors'

mongoose.connect(
    process.env.MONGODB_URI
)
    .then(() => console.log('DB is ok'))
    .catch(err => {
        console.log(err)
    })


const app = express();

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })


app.post('/auth/login', loginValidator,handleValidationErrors, userController.login)
app.post('/auth/register', registerValidator,handleValidationErrors, userController.register)
app.get('/auth/me', checkAuth, userController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (request, resolve) => {
    resolve.json({
        url:`/uploads/${request.file.originalname}`
    })
})

app.get('/posts', postController.getAll)
app.get('/posts/tags', postController.getAllTags)
app.get('/posts/:id', postController.getOne)
app.post('/posts', checkAuth, postCreateValidator,postController.create)
app.delete('/posts/:id', checkAuth, postController.remove)
app.patch('/posts/:id', checkAuth, handleValidationErrors, postController.update)

app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        console.log(err)
    }
    console.log('server is ok')
})

