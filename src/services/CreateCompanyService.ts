import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import Company from '../models/Company';

interface IRequest {
  companyName: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

class CreateCompanyService {
  public async execute({
    companyName,
    name,
    email,
    password,
    phone,
  }: IRequest): Promise<Company> {
    const companiesRepository = getRepository(Company);

    const findCompanyInCreatedDate = await companiesRepository.findOne({
      where: { email },
    });

    if (findCompanyInCreatedDate) {
      throw new AppError('This email already in use for another company');
    }

    const hashedPassword = await hash(password, 8);

    const company = companiesRepository.create({
      companyName,
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await companiesRepository.save(company);

    return company;
  }
}

export default CreateCompanyService;
