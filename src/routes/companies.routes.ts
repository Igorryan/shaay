import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateCompanyService from '../services/CreateCompanyService';
import CompaniesRepository from '../repositories/CompaniesRepository';

const companiesRouter = Router();

// Responsabilidade: Receber requisição e devolver resposta.

companiesRouter.get('/', async (request, response) => {
  const companiesRepository = getCustomRepository(CompaniesRepository);

  const companies = await companiesRepository.find();

  return response.json(companies);
});

companiesRouter.post('/', async (request, response) => {
  try {
    const { companyName, name, email, password, phone } = request.body;

    const createCompany = new CreateCompanyService();

    const company = await createCompany.execute({
      companyName,
      name,
      email,
      password,
      phone,
    });

    return response.status(200).json({ company_id: `${company.id}` });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default companiesRouter;
