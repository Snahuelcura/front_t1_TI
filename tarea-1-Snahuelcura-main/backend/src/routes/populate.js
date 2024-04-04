// routes/populate.js
const Router = require("koa-router");
const seedUser = require("../seeders/20240328191744-seed-user");
const seedPost = require("../seeders/20240328192025-seed-post");
const seedComment = require("../seeders/20240328192036-seed-comment");

const router = new Router();

router.post("/", async (ctx) => {
  try {
    // Populate the databases with seed data
    await seedUser.up(ctx.orm.sequelize.getQueryInterface());
    await seedPost.up(ctx.orm.sequelize.getQueryInterface());
    await seedComment.up(ctx.orm.sequelize.getQueryInterface());
    ctx.body = "Databases populated successfully";
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    console.log(error);
    ctx.body = "Error populating databases";
  }
});

module.exports = router;
