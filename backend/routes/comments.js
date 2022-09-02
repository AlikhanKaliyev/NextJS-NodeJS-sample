const express = require("express");
const router = express.Router();
const {getComments,createComment} = require('../controllers/comments.controller')
router.get('/api/comments/:id', async(req,res) => {
    try {
        const comments = await getComments(req.params.id);
        res.status(200).send(comments);
    } catch(e){
        res.status(400).send(e)
    }
})
router.post('/api/comments',async(req,res) => {
    try {
        const comments = await createComment(req.body);
        res.status(200).send(comments)              ;
    } catch(e){
        res.status(400).send(e);
    }
})
router.delete('')
module.exports = router;