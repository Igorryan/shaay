import { Router } from 'express';

// Routes Imported
import sessionsRouter from './sessions.routes';
import companiesRouter from './companies.routes';

const routes = Router();

routes.use('/companies', companiesRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
