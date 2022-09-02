const {categories,blogs,users} = require('../models');

const getCategories = async () => {
    return new Promise(async resolve => {
        const cats = await categories.findAll();
        resolve(cats)
    })
}

const getSingleCategory = async id => {
    return new Promise(async resolve=>{
        const neededBlogs = await blogs.findAll({
            where:{category_id:id},
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
            }]
    })
        resolve(neededBlogs)
    })
}
module.exports = {
    getCategories,
    getSingleCategory
}