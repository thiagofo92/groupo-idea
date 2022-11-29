import Express from 'express'

const app = Express()

const port = 4500
const host = '0.0.0.0'

app.listen(port, host, () => {
  console.log(`Server is running ${host}:${port}`)
})