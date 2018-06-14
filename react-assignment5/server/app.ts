import * as express from 'express'
import * as cors from 'cors'
import * as Routes from './routes'

const app = express()

app.use(cors())

//routes here
app.use('/tree', Routes.TreeRoute)
app.use('/', Routes.Basic)

export default app