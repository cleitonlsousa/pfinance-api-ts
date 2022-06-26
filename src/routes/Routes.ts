import { Router } from 'express'
import UserRouter from './UserRoute'
import AccountRouter from './AccountRoute'
import AuthRouter from './AuthRoute'
import TransactionRouter from './TransactionRoute'

const routes = Router()

routes.use('/api', UserRouter)
routes.use('/api', AccountRouter)
routes.use('/api', AuthRouter)
routes.use('/api', TransactionRouter)

export default routes