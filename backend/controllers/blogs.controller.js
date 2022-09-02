const {blogs,users,categories} = require('../models')

const getBlogs = async () => {
    return new Promise(async resolve => {
        const blog = await blogs.findAll({
            include:[{
                model:users,
                attributes:["id",'full_name','nickname','email','password'],
                as:'user',
                required:false,
            },
            {
                model:categories,
                attributes:['id','name'],
                as:'category',
                required:false
            }
        ]
        });
        resolve(blog)
    })
}
const getBlogsByUser = async id => {
    return new Promise(async resolve => {
        const blog = await blogs.findAll({
            where:{user_id:id},
            include:[{
                model:users,
                attributes:["id",'full_name','nickname','email','password'],
                as:'user',
                required:false,
            },
            {
                model:categories,
                attributes:['id','name'],
                as:'category',
                required:false
            }
        ]
        });
        resolve(blog)
    })
}

const getBlogById = async id => {
    return new Promise(async resolve => {
        const blog = await blogs.findOne({
            where:{id},
            include:[{
                model:users,
                attributes:["id",'full_name','nickname','email','password'],
                as:'user',
                required:false,
            },
            {
                model:categories,
                attributes:['id','name'],
                as:'category',
                required:false
            }
        ]
        });
        resolve(blog)
    })
}

const createBlog = ({title,image,category_id,user_id,text}) =>{
    return new Promise(async resolve => {
        
        const blog = await blogs.create({
            category_id:category_id,
            title:title,
            image:image,
            user_id:user_id,
            text:text
        })
        resolve(blog);
    })
}
const updateBlog = ({title,image,category_id,text,id}) => {
    return new Promise(async resolve => {
        const blog = await blogs.update({title,image,category_id,text},{where:{id}});
        resolve(blog)
    })
}
const deleteBlog = async id => {
    return new Promise(async resolve => {
        await blogs.destroy({where:{id}})
        resolve(true)
    })
}
module.exports = {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
    getBlogsByUser,
    getBlogById
}
