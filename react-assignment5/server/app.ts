import * as express from 'express'
import * as cors from 'cors'
import * as Routes from './routes'

const app = express()

app.use(cors())

//routes here
app.use('/tree', Routes.TreeRoute)
app.use('/users', Routes.UsersRoute)
app.use('/groups', Routes.GroupsRoute)
app.use('/messages', Routes.MessagesRoute)
app.use('/', Routes.Basic)

//static files
app.use(express.static('..\/public'))
export default app