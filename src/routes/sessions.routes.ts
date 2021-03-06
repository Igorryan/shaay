import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

// Responsabilidade: Receber requisição e devolver resposta.

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSession = new CreateSessionService();

  const { company, token } = await createSession.execute({
    email,
    password,
  });

  return response.status(200).json({ company, token });
});

export default sessionsRouter;
