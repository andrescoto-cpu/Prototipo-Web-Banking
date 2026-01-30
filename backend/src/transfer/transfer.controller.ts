import { Controller, Get, Post, Body } from '@nestjs/common';
import { MOCK_TRANSFERS, MOCK_ACCOUNTS } from '../mock-data';

@Controller('transfers')
export class TransferController {
  @Get()
  async getTransfers(@Body() query: any) {
    return {
      success: true,
      data: MOCK_TRANSFERS,
    };
  }

  @Post()
  async createTransfer(@Body() transferDto: any) {
    // Validar cuentas
    const fromAccount = MOCK_ACCOUNTS.find(acc => acc.id === transferDto.fromAccountId);
    const toAccount = MOCK_ACCOUNTS.find(acc => acc.id === transferDto.toAccountId);

    if (!fromAccount || !toAccount) {
      return {
        success: false,
        message: 'Cuenta no encontrada',
      };
    }

    if (fromAccount.balance < transferDto.amount) {
      return {
        success: false,
        message: 'Saldo insuficiente',
      };
    }

    // Simular transferencia exitosa
    const newTransfer = {
      id: `trf-${Date.now()}`,
      fromAccountId: transferDto.fromAccountId,
      toAccountId: transferDto.toAccountId,
      amount: transferDto.amount,
      currency: transferDto.currency,
      description: transferDto.description,
      type: transferDto.type,
      status: 'COMPLETED' as const,
      date: new Date().toISOString(),
      reference: `TRF-${new Date().getTime()}`,
    };

    MOCK_TRANSFERS.push(newTransfer);

    return {
      success: true,
      data: newTransfer,
      message: 'Transferencia realizada exitosamente',
    };
  }

  @Post('validate')
  async validateTransfer(@Body() transferDto: any) {
    const fromAccount = MOCK_ACCOUNTS.find(acc => acc.id === transferDto.fromAccountId);

    if (!fromAccount) {
      return {
        valid: false,
        message: 'Cuenta origen no encontrada',
      };
    }

    if (fromAccount.balance < transferDto.amount) {
      return {
        valid: false,
        message: 'Saldo insuficiente',
      };
    }

    return {
      valid: true,
      message: 'Transferencia válida',
    };
  }
}
