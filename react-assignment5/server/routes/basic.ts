import * as express from 'express'

const router = express.Router();

router.get('/', (req,res)=>{
    res.send('this is the basic page')
})

export default router