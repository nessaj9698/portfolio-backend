import jwt from 'jsonwebtoken';


export default (request, response, next) => {
    const token = (request.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');
            request.userId = decoded._id;
            next();
        } catch (error) {
            response.status(403).json({
                message:'Неверный токен'
            })
        }
    } else {
        response.status(403).json({
            message:'Неверный токен'
        })
    }

   
}