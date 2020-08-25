import Company from '../models/Company';

// Executar uma determinada responsabilidade (regra de negocio), um repositorio pode ser enviado nos parametros do constructor
// respeitando Dependency Inversion do principio SOLID.
class CreateCompanyService {
  // eslint-disable-next-line class-methods-use-this
  public execute(): string {
    // Lançamento de excessões
    return 'ok';
  }
}

export default CreateCompanyService;
