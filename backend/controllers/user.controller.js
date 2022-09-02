const { users } = require("../models");
const bcrypt = require("bcryptjs");
const { urlencoded } = require("express");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");
const getUsers = async () => {
    return new Promise(async resolve => {
        const Users = await users.findAll();
        resolve(Users)
    })
}
const createUser = user => new Promise(resolve => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, async function(err, hash) {
            const newuser = await users.create({
                email:user.email,
                full_name:user.full_name,
                nickname:user.nickname,
                password:hash
            })
            resolve(newuser)           
        });
    });
}
)

const login = user => new Promise(async resolve => {
    const isUser = await users.findOne({
        where:{
            email:user.email
        }
    }
    )
    if(!isUser) return resolve(null)
    bcrypt.compare(user.password, isUser.password, function(err, isMatch) {
        if(!isMatch) return resolve(null)
        console.log(isMatch)
        const token = jwt.sign({
            exp: (Math.floor(Date.now() / 1000) + (60 * 60)) * 24 *365,
            id:isUser.id,
            email:isUser.email,
            nickname:isUser.nickname,
            full_name:isUser.full_name
          }, SECRET_KEY);
          resolve(token)
    });
})
module.exports = {
    getUsers,
    createUser,
    login
}