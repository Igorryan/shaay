import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

// Upload files
import multer from 'multer';
import uploadConfig from '../config/upload';

// Services
import CreateCompanyService from '../services/CreateCompanyService';
import UploadCompanyAvatarService from '../services/UploadCompanyAvatarService';

// Repositories
import CompaniesRepository from '../repositories/CompaniesRepository';

// Ensure Authentications
import ensureAdminAuthenticated from '../middlewares/ensureAdminAuthenticated';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// Responsabilidade: Receber requisição e devolver resposta.
const companiesRouter = Router();
const upload = multer(uploadConfig);

companiesRouter.get(
  '/',
  ensureAdminAuthenticated,
  async (request, response) => {
    const companiesRepository = getCustomRepository(CompaniesRepository);

    const companies = await companiesRepository.find();

    return response.json(companies);
  },
);

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

companiesRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const uploadCompanyAvatar = new UploadCompanyAvatarService();

      const company = await uploadCompanyAvatar.execute({
        id: request.company.id,
        fileName: request.file.filename,
      });

      return response.json(company);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default companiesRouter;
