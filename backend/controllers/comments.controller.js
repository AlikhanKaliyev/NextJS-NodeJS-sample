const {comments,users,blogs} = require('../models')

const getComments = async id => {
    return new Promise(async resolve => {
        const comms = await comments.findAll({
            where:{blog_id:id},
            include:[{
                model:users,
                attributes:["id",'nickname'],
                as:'author',
                required:false,
            },
            {
                model:blogs,
                attributes:['id','title'],
                as:'blog',
                required:false
            }]
        });
        resolve(comms)
    })
}
const createComment = async(data) => {
    return new Promise(async resolve => {
        const comment = await comments.create({
            user_id:data.user_id,
            blog_id:data.blog_id,
            text:data.text
        });
        resolve(comment);
    })
}
module.exports = {
    getComments,
    createComment
}