import Company from '../models/Company';

class CompaniesRepository {
  private companies: Company[];

  constructor() {
    this.companies = [];
  }

  public create(provider: string, date: Date): Company {
    const company = new Company({ provider, date });

    this.companies.push(company);

    return company;
  }
}

export default CompaniesRepository;
