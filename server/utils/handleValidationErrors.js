import { validationResult } from "express-validator";

export default (request, resolve, next) => {
    const errors = validationResult(request)
        
        if (!errors.isEmpty()) {
            return resolve.status(400).json(errors.array())
        }

        next();
}