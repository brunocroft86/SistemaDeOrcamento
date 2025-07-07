export default class ClienteMockService {
  static listar() {
    return Promise.resolve([
      {
        id: 1,
        nome: 'João Silva',
        sobrenome: 'Silva',
        cpf: '111.111.111-11',
        telefones: ['(11) 11111-1111'],
        endereco: 'Rua A, 100'
      },
      {
        id: 2,
        nome: 'Maria Souza',
        sobrenome: 'Souza',
        cpf: '222.222.222-22',
        telefones: ['(22) 22222-2222', '(22) 99999-9999'],
        endereco: 'Rua B, 200'
      },
      {
        id: 3,
        nome: 'Pedro Santos',
        sobrenome: 'Santos',
        cpf: '333.333.333-33',
        telefones: ['(33) 33333-3333'],
        endereco: 'Rua C, 300'
      }
    ])
  }
}
