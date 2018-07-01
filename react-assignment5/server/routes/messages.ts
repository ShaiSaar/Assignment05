import * as express from 'express'
import * as Controller from '../controllers'

const router = express.Router()

//GROUPS

router.get('/getMessages', Controller.GetMessagesController)
router.post('/addMessage/:groupId', express.json(), Controller.AddMessageController)
router.get('/getMessagesById/:id', Controller.GetMessagesByIdController)
//router.put('/updateMessage/:id', express.json(),Controller.UpdateMessageController)
//router.delete('/deleteMessage/:id', Controller.DeleteMessageController)

export default router
