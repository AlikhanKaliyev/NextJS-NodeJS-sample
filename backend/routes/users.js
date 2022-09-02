const express = require("express");
const router = express.Router();
const {createUser,getUsers,login} = require('../controllers/user.controller');
router.post('/api/users' , async(req,res) => {
    try{
        const user = await createUser(req.body);
        res.status(200).send(user);
    } catch(e) {
        res.status(400).send(e);
    }
})
router.get('/api/users',async(req,res) => {
    try {
        const users = await getUsers();
        res.status(200).send(users);
    } catch(e){
        res.status(400).send(e);
    }
})
router.post('/api/login', async(req,res) => {
    try{
        const token = await login({
            email:req.body.email,
            password:req.body.password
        })
        console.log(token);
        res.status(200).send(token)
    } catch(e) {
        res.status.send(e)
    }
})
module.exports = router;