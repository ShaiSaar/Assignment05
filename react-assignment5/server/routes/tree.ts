import * as express from 'express'
import * as Controller from '../controllers'

const router = express.Router()

router.get('/', Controller.GetTreeController)

export default router
