import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import Company from '../models/Company';

interface IRequest {
  id: string;
  fileName: string;
}

class UploadCompanyAvatarService {
  public async execute({ id, fileName }: IRequest): Promise<Company> {
    const companiesRepository = getRepository(Company);

    const company = await companiesRepository.findOne(id);

    if (!company) {
      throw new Error('Only authenticated companies can change avatar');
    }

    if (company.avatar) {
      const companyAvatarFilePath = path.join(
        uploadConfig.directory,
        company.avatar,
      );
      const companyAvatarFileExists = await fs.promises.stat(
        companyAvatarFilePath,
      );

      if (companyAvatarFileExists) {
        await fs.promises.unlink(companyAvatarFilePath);
      }
    }

    company.avatar = fileName;

    await companiesRepository.save(company);

    return company;
  }
}

export default UploadCompanyAvatarService;
