const zod = require('zod');

const signupZod = zod.object({
    username : zod.string().max(20).min(5),
    password : zod.string().max(20).min(5)
})

const signinZod = zod.object({
    username : zod.string().max(20).min(5),
    password : zod.string().max(20).min(5)
})

const blogZod = zod.object({
    title: zod.string().min(5),
    contents: zod.string().min(10),
})

module.exports = {
    signupZod,
    signinZod,
    blogZod
}