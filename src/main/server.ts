import Express from 'express'
import { Routers } from './routers/routers'

const app = Express()

const port = 4500
const host = '0.0.0.0'

app.use(Express.json())

const routers = new Routers(Express.Router())
app.use('/api', routers.factory())
app.listen(port, host, () => {
  console.log(`Server is running ${host}:${port}`)
})