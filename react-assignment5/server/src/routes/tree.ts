import * as express from 'express'
import * as Controller from '../controllers'

const router = express.Router()

//TREE

router.get('/', Controller.GetTreeController)
router.get('/getFullTree', Controller.GetFullTreeController)

export default router

