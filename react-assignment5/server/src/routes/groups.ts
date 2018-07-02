import * as express from 'express'
import * as Controller from '../controllers'

const router = express.Router()

//GROUPS

router.get('/getGroup/:id', Controller.GetGroupByIdController)
router.get('/getGroups', Controller.GetGroupsController)
router.post('/addGroup', express.json(), Controller.AddGroupController)
router.put('/updateGroup/:id', express.json(),Controller.UpdateGroupController)
router.delete('/deleteGroup/:id', Controller.DeleteGroupController)

//todo: maybe only an update will be enough
//router.put('/assignUserToGroup/:idGroup/:idUser', express.json(), Controller.DeleteUserController)


export default router
