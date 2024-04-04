const koa = require('koa')
const KoaLogger = require('koa-logger')
const { koaBody } = require('koa-body')
const router = require('./routes.js')
const orm = require('./models')
const cors = require('@koa/cors')

const app = new koa();

app.use(cors()) // Permitirá conectar back y front

app.context.orm = orm

// app.use para usar Middlewares
app.use(KoaLogger()) // Entrega info extra de las request (estado 200, 204, etc en el servidor)
app.use(koaBody()) // Middlewear que sirve para los http request y response

app.use(router.routes())

app.use((ctx, next) => {
  ctx.body = 'Hola mundo! Saludos desde mi app'
})

module.exports = app
