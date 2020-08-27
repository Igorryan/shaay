import { Router } from 'express';

import ensureAdminAuthenticated from '../middlewares/ensureAdminAuthenticated';

// Routes Imported
import companiesRouter from './companies.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

companiesRouter.use(ensureAdminAuthenticated);

routes.use('/companies', ensureAdminAuthenticated, companiesRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
