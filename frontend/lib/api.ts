// Configuración API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export interface LoginResponse {
  success: boolean;
  requiresMFA: boolean;
  sessionId: string;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface MFAResponse {
  success: boolean;
  token: string;
  message: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Error en autenticación');
    }
    
    return response.json();
  },

  async verifyMFA(sessionId: string, code: string): Promise<MFAResponse> {
    const response = await fetch(`${API_URL}/auth/verify-mfa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, code }),
    });
    
    if (!response.ok) {
      throw new Error('Código MFA inválido');
    }
    
    return response.json();
  },

  async logout(token: string): Promise<void> {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': token,
      },
    });
  },

  async getProfile(token: string): Promise<any> {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        'Authorization': token,
      },
    });
    
    if (!response.ok) {
      throw new Error('Error obteniendo perfil');
    }
    
    return response.json();
  },
};

export const accountService = {
  async getAccounts(token: string, customerId: string): Promise<any> {
    const response = await fetch(`${API_URL}/accounts?customerId=${customerId}`, {
      headers: {
        'Authorization': token,
      },
    });
    
    return response.json();
  },

  async getTransactions(token: string, accountId: string, limit: number = 10): Promise<any> {
    const response = await fetch(`${API_URL}/accounts/${accountId}/transactions?limit=${limit}`, {
      headers: {
        'Authorization': token,
      },
    });
    
    return response.json();
  },
};

export const transferService = {
  async createTransfer(token: string, transferData: any): Promise<any> {
    const response = await fetch(`${API_URL}/transfers`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transferData),
    });
    
    return response.json();
  },

  async validateTransfer(token: string, transferData: any): Promise<any> {
    const response = await fetch(`${API_URL}/transfers/validate`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transferData),
    });
    
    return response.json();
  },
};

export const cdpService = {
  async getCDPs(token: string): Promise<any> {
    const response = await fetch(`${API_URL}/cdp`, {
      headers: {
        'Authorization': token,
      },
    });
    
    return response.json();
  },

  async createCDP(token: string, cdpData: any): Promise<any> {
    const response = await fetch(`${API_URL}/cdp`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cdpData),
    });
    
    return response.json();
  },

  async simulateCDP(token: string, simData: any): Promise<any> {
    const response = await fetch(`${API_URL}/cdp/simulate`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(simData),
    });
    
    return response.json();
  },
};
