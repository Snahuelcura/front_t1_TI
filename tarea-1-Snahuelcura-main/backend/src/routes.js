const Router = require("koa-router");
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const comments = require("./routes/comments.js");
const reset = require("./routes/reset.js");

const populate = require("./routes/populate.js");

const router = new Router();

router.use("/users", users.routes());
router.use("/posts", posts.routes());
router.use("/comments", comments.routes());
router.use("/reset", reset.routes());
router.use("/populate", populate.routes());
module.exports = router;
 


