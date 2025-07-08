import type { IClienteData } from '../Cliente'

export default class ClienteAPIService {
  static async listar(): Promise<IClienteData[]> {
    try {
      const resp = await fetch('/api/clientes');
      if (!resp.ok) return [];
      return await resp.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}
