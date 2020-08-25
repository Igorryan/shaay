import { uuid } from 'uuidv4';

class Company {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Company, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Company;
