const Router = require("koa-router");

const router = new Router();

router.post("reset.all", "/", async (ctx) => {
    try {
        // Eliminar todas las instancias de todos los modelos
        await Promise.all([
            ctx.orm.Comment.destroy({ where: {} }),
            
            ctx.orm.Post.destroy({ where: {} }),
            ctx.orm.User.destroy({ where: {} }),
            // Agrega aquí más modelos si es necesario
        ]);

        // Reiniciar la secuencia de ID de la tabla de usuarios
        await ctx.orm.sequelize.query('ALTER SEQUENCE "Users_id_seq" RESTART WITH 1');

        // Reiniciar la secuencia de ID de la tabla de posts
        await ctx.orm.sequelize.query('ALTER SEQUENCE "Posts_id_seq" RESTART WITH 1');

        // Reiniciar la secuencia de ID de la tabla de comments
        await ctx.orm.sequelize.query('ALTER SEQUENCE "Comments_id_seq" RESTART WITH 1');

        ctx.body = { message: "All data deleted successfully" };
        ctx.status = 200;
    } catch (error) 
        {
        console.log(error);
        ctx.body = { error: "Failed to reset data" };
        ctx.status = 500; // Error interno del servidor
    }
});

module.exports = router;
