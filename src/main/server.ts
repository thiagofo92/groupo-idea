import Express from 'express'
import { serve as SwaggerServer,  setup as SwaggerSetUp } from 'swagger-ui-express'

import SwaggerJson from './routers/configs/swagger-config.json'
import { Routers } from './routers/routers'
import { configMiddleware } from './routers/middlewares/configs/config'
const app = Express()

const port = 4500
const host = '0.0.0.0'

app.use(Express.json())
app.use(...configMiddleware)

const routers = new Routers(Express.Router())
app.use('/api', routers.factory())
app.use('/api-docs', SwaggerServer, SwaggerSetUp(SwaggerJson))

app.listen(port, host, () => {
  console.log(`Server is running ${host}:${port}`)
})