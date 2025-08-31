const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    id : Number,
    username : String,
    name : String,
    password : String,
})

const todosSchema = mongoose.Schema({
    id: Number,
    userid : Number,
    todo : String
})

const usersModel = mongoose.model('users', usersSchema);

const todosModel = mongoose.model('todos', todosSchema);

module.exports = {
    usersModel,
    todosModel
};