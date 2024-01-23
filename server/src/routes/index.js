const userRouter = require("./user.api")
const imageassetsRouter = require("./imageassets.api")
const imageRouter = require("./image.api")
const cardRouter = require("./card.api")
const transactionRouter = require("./transaction.api")
const backgroundRouter = require("./background.api")


const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/imageassets', imageassetsRouter)
    app.use('/api/image', imageRouter)
    app.use('/api/card', cardRouter);
    app.use('/api/transaction', transactionRouter);
    app.use('/api/background', backgroundRouter)
}

module.exports = initRoutes