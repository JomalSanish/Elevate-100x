const zod = require('zod')

const signupZod = zod.object({
    username: zod.string(),
    name: zod.string(),
    password: zod.string()
});

const signinZod = zod.object({
    username: zod.string(),
    password: zod.string()
})

const todoInputZod = zod.object({
    todo: zod.string()
})

module.exports = {
    signupZod,
    signinZod,
    todoInputZod
};
