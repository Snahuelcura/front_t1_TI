const Router = require("koa-router");


const router = new Router();

//crear posts

router.post("posts.create", "/", async (ctx) => {
    try{
        console.log("crando post");
        console.log(ctx.request.body);
       
        const post = await ctx.orm.Post.create(ctx.request.body);
        
        ctx.body =  {
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "image": post.image,
            "userId": post.userId,
            "created": post.createdAt,

        };
        ctx.status = 201;}

    catch (error) {

        if (!ctx.request.body.content || ctx.request.body.content === ""){
            ctx.body = {error_mesage: "Missing parameter: content"}
            ctx.status = 400;
        }

        else if (!ctx.request.body.userId){
            ctx.body = {error_mesage: "Missing parameter: userId"}
            ctx.status = 404;
        }

        else if (!ctx.request.body.title || ctx.request.body.title === ""){
            console.log("entro al error de title")
            ctx.body = {error_mesage: "Missing parameter: title"}
            ctx.status = 400;
        }
        // si el userID no es un valor numerico
        else if (isNaN(parseInt(ctx.request.body.userId, 10))) {
            console.log("entro al error de userId");
            ctx.body = { error_mesage: "userId must be a number" };
            ctx.status = 400;}

        else {
            console.log("entro al else")
            ctx.body = error;
            ctx.status = 400;
        }

        // invalid userid: usuario no existe
        const userId = ctx.request.body.userId;
        if (!Number.isNaN(Number(userId))) {
            // El userId es un número válido
            const user = await ctx.orm.User.findByPk(Number(userId));
            if (!user) {
                ctx.body = { error_message: "user with id <userId> does not exist" };
                ctx.status = 404;
                return;
            }
        } else {
            ctx.body = { error_message: "userId must be a number" };
            ctx.status = 404;
            return;
        }


        
    }
});

// obtener posts
router.get("posts.list", "/", async (ctx) => {

    try{
        const posts = await ctx.orm.Post.findAll();
        const formattedPosts = posts.map(post => {
            return {
                "id": post.id,
                "title": post.title,
                "content": post.content,
                "image": post.image,
                "userId": post.userId,
                "created": post.createdAt
            };
        });

        ctx.body = formattedPosts;
        ctx.status = 200;

    } catch (error) {
        ctx.body = error;
        ctx.status =400

    }
});

// obtener post por id de usuaroio
router.get("posts.show", "/:userId", async (ctx) => {

    try{
        const userId = ctx.params.userId;
        const posts = await ctx.orm.Post.findAll({where: {userId: userId}});
        const formattedPosts = posts.map(post => ({
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "image": post.image,
            "userId": post.userId,
            "createdAt": post.createdAt,
        }));
        ctx.body = formattedPosts;
        ctx.status = 200;

    } catch (error){
        ctx.body = error
        ctx.status = 400;

    }
});


module.exports = router;