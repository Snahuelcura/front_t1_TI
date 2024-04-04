const Router = require("koa-router");
const { where } = require("sequelize");

const router = new Router();
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}


router.post("comments.create", "/", async (ctx) => {
    try {
        console.log("creando comentario");
        console.log(ctx.request.body);

        const userId = ctx.request.body.userId;
        const postId = ctx.request.body.postId;

        // Verificar que userId y postId sean números válidos
        if (!isNumeric(userId)) {
            ctx.body = { error_message: "userId must be a number" };
            ctx.status = 404;
            return;
        }

        if (!isNumeric(postId)) {
            ctx.body = { error_message: "postId must be a number" };
            ctx.status = 404;
            return;
        }
        
        if (!ctx.request.body.content || ctx.request.body.content === ""){
            ctx.body = {error_mesage: "Missing parameter: content"}
            ctx.status = 400;
            return;
        }
        // Convertir userId y postId a números enteros
        const userIdInt = parseInt(userId, 10);
        const postIdInt = parseInt(postId, 10);

        // Verificar que el usuario con userId exista
        const user = await ctx.orm.User.findByPk(userIdInt);
        if (!user) {
            ctx.body = { error_message: "User not found" };
            ctx.status = 404;
            return;
        }

        // Verificar que el post con postId exista
        const post = await ctx.orm.Post.findByPk(postIdInt);
        if (!post) {
            ctx.body = { error_message: "Post not found" };
            ctx.status = 404;
            return;
        }

        const comment = await ctx.orm.Comment.create(ctx.request.body);
        ctx.body = {
            "id": comment.id,
            "content": comment.content,
            "userId": comment.userId,
            "postId": comment.postId,
            "created": comment.createdAt
        };
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 500;
    }
});

router.get("comments.show", "/:postId", async (ctx) => {
    

        const postId =  ctx.params.postId;


        console.log(postId);
        console.log(typeof(postId));

        try{
            const comments = await ctx.orm.Comment.findAll({where: {postId: postId}});
            const formattedComments = comments.map(comment => {
                return {
                    "id": comment.id,
                    "content": comment.content,
                    "userId": comment.userId,
                    "postId": comment.postId,
                    "created": comment.createdAt
                };
            });

            ctx.body = formattedComments;
            ctx.status = 200;
    
        } catch (error) {
            ctx.body = error
            ctx.status = 400;
        }






});



router.get("comments.list", "/", async (ctx) => {
    try{
        const comments = await ctx.orm.Comment.findAll();
        ctx.body = comments;
        ctx.status = 200;

    } catch (error) {
        ctx.body = error;
        ctx.status =400

    }
});


module.exports = router;