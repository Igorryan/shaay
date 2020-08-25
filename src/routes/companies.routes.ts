import { Router, response } from 'express';

import CompaniesRepository from '../repositories/CompaniesRepository';
import CreateCompanyService from '../services/CreateCompanyService';

const appointmentsRouter = Router();

// Responsabilidade: Receber requisição e devolver resposta.

appointmentsRouter.post('/', (req, res) => {
  try {
    const createCompany = new CreateCompanyService();

    return res.send('oi');
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
