const express = require("express");
const router = express.Router();
const {createBlog,getBlogs,updateBlog, deleteBlog,getBlogsByUser, getBlogById} = require('../controllers/blogs.controller');
const multer = require('multer')
const app = express();
// '../backend/uploads',
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public');
    },
    filename: function (req, file, cb) {
        const filename = file.originalname;
        let fileExt = filename.split('.');
        fileExt = fileExt[fileExt.length - 1];

        const uniqueSuffix = Date.now() + '.' + fileExt;
        cb(null, uniqueSuffix);
    }
}); 
const upload = multer({ storage });
router.post('/api/blogs',upload.single('image'),async(req,res)=>{
    try {
        let imagePath;
        if(req.file) {
            imagePath = 'public/' + req.file.filename;
        }
        const blog = await createBlog({
            title:req.body.title,
            text:req.body.text,
            image:imagePath,
            user_id:req.body.user_id,
            category_id:req.body.category_id
        })
        res.status(200).send(blog);
    } catch(e){
        res.status.send(e)
    }
})
router.get('/api/blogs', async(req,res) => {
    try {
        const blogs = await getBlogs();
        res.status(200).send(blogs)
    } catch(e) {
        res.status(500).send(e)
    }
})
router.put('/api/blogs',async(req,res) => {
    try {
        const blog = await updateBlog(req.body)
        res.status(200).send(blog)
    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.delete('/api/blogs/:id',async(req,res)=>{
    try {
        await deleteBlog(req.params.id)
        res.status(200).end()
    } catch(e) {
        res.status(400).send(e)
    }
})
router.get('/api/blogs/:id',async(req,res)=>{
    try {
        const blogs = await getBlogsByUser(req.params.id)
        res.status(200).send(blogs)
    } catch(e) {
        res.status(400).send(e)
    }
})
router.get('/api/blog/:id',async(req,res)=>{
    try {
        const blog = await getBlogById(req.params.id)
        res.status(200).send(blog)
    } catch(e) {
        res.status(400).send(e)
    }
})
module.exports = router;