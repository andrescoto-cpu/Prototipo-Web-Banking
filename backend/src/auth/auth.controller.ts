import { Controller, Post, Body, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { MOCK_USERS, MOCK_CUSTOMERS } from '../mock-data';

@Controller('auth')
export class AuthController {
  private sessions = new Map<string, any>();

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = MOCK_USERS.find(
      u => u.email === loginDto.email && u.password === loginDto.password
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const customer = MOCK_CUSTOMERS.find(c => c.id === user.customerId);

    return {
      success: true,
      requiresMFA: true,
      sessionId: `session-${Date.now()}`,
      customer: {
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
      },
    };
  }

  @Post('verify-mfa')
  async verifyMFA(@Body() mfaDto: { sessionId: string; code: string }) {
    // Simular verificación de MFA (cualquier código funciona en prototipo)
    const token = `Bearer mock-jwt-token-${Date.now()}`;
    
    this.sessions.set(token, {
      sessionId: mfaDto.sessionId,
      authenticated: true,
      timestamp: Date.now(),
    });

    return {
      success: true,
      token,
      message: 'Autenticación exitosa',
    };
  }

  @Get('profile')
  async getProfile(@Headers('authorization') auth: string) {
    if (!auth || !this.sessions.has(auth)) {
      throw new UnauthorizedException('Sesión inválida');
    }

    const customer = MOCK_CUSTOMERS[0]; // Usuario demo

    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      documentNumber: customer.documentNumber,
    };
  }

  @Post('logout')
  async logout(@Headers('authorization') auth: string) {
    if (auth) {
      this.sessions.delete(auth);
    }
    
    return {
      success: true,
      message: 'Sesión cerrada exitosamente',
    };
  }
}
