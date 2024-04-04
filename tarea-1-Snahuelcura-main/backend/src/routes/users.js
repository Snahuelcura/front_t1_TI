const Router = require("koa-router");


const router = new Router();



router.post("users.create", "/", async (ctx) => {
    try{
        console.log("creando usuario");
        console.log(ctx.request.body);
        const user = await ctx.orm.User.create(ctx.request.body);
        const fecha_creacion = user.createdAt;
        ctx.body = {
            "id": user.id,
            "username": user.username,
            "avatar": user.avatar,
            "created": fecha_creacion,

        };


        ctx.status = 201;
    } catch (error) {

        if (!ctx.request.body.password){
            ctx.body = {error_mesage: "Missing parameter: password"}
            ctx.status = 400;
        }

        else if (!ctx.request.body.username){
            ctx.body = {error_mesage: "Missing parameter: username"}
            ctx.status = 400;
        }


        else {
            ctx.body = error;
            ctx.status = 400;}
        
}});

router.get("users.list", "/", async (ctx) => {

    try{
        const users = await ctx.orm.User.findAll();
        const formattedUsers = users.map(user => {
            return {
                "id": user.id,
                "username": user.username,
                "avatar": user.avatar,
                "created": user.createdAt
            };
        });
        ctx.body = formattedUsers;
        ctx.status = 200;



    } catch (error) {
        ctx.body = error;
        ctx.status =400
    }

})

router.get("users.show", "/:id", async (ctx) => {

    try{
        // const user = await ctx.orm.User.findByPk(ctx.params.id);
        const user = await ctx.orm.User.findOne({where: {id: ctx.params.id}});
        ctx.body = user;
        ctx.status = 200;
    } catch (error) {
        ctx.body = error
        ctx.status = 400
    }
})

module.exports = router;