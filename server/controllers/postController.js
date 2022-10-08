import PostModel from "../models/post.js"


export const getAll = async (request, resolve) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        resolve.json(posts)
    } catch (error) {
        resolve.status(400).json({
            message:"Не удалось получить все статьи"
        })
    }
}

export const getAllTags = async (request, resolve) => {
    try {
        const posts = await PostModel.find().exec();
        const tags = posts.map(obj => obj.tags).flat();

        resolve.json(tags)
    } catch (error) {
        resolve.status(400).json({
            message:"Не удалось получить все статьи"
        })
    }
}

export const getOne = async (request, resolve) => {
    try {
        const postId = request.params.id
        
        PostModel.findOne({
            _id:postId
        },
        (err, doc) => {
            resolve.json(doc)
        })
        
    } catch (error) {
        resolve.status(400).json({
            message:error
        })
    }
}

export const remove = async (request, resolve) => {
    try {
        const postId = request.params.id
        
        PostModel.findOneAndDelete({
            _id:postId
        },
        (err, doc) => {
            if (err) {
                return resolve.status(400).json({
                    message:err
                })
            }
            if (!doc) {
                return resolve.status(404).json({
                    message:"Статья не найдена"
                })
            }
            resolve.json({
                success:true
            })
        })
        
    } catch (error) {
        resolve.status(400).json({
            message:error
        })
    }
}

export const create = async (request, resolve) => {
    try {
        const doc = new PostModel({
            title: request.body.title,
            text:request.body.text,
            imageURL:request.body.imageURL,
            tags: request.body.tags,
            excerpt: request.body.excerpt,
            user: request.userId
        })
        const post = await doc.save()

        resolve.json(post)
    } catch (error) {
        console.log(error)
        resolve.status(500).json({
            message: error
        })
    }
}

export const update = async (request, resolve) => {
    try {
        const postId = request.params.id

        await PostModel.updateOne({
            _id:postId
        },
        {
            title: request.body.title,
            text:request.body.text,
            image:request.body.image,
            tags: request.body.tags,
            user: request.userId
        })
        resolve.json({
            success:true
        })
    } catch (error) {
        resolve.status(500).json({
            message: error
        })
    }
}

