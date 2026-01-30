import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MOCK_CDPS } from '../mock-data';

@Controller('cdp')
export class CdpController {
  @Get()
  async getCDPs(@Body() query: any) {
    return {
      success: true,
      data: MOCK_CDPS,
    };
  }

  @Get(':id')
  async getCDPById(@Param('id') id: string) {
    const cdp = MOCK_CDPS.find(c => c.id === id);
    
    return {
      success: true,
      data: cdp,
    };
  }

  @Post()
  async createCDP(@Body() cdpDto: any) {
    const newCDP = {
      id: `cdp-${Date.now()}`,
      customerId: cdpDto.customerId,
      cdpNumber: `CDP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      amount: cdpDto.amount,
      currency: cdpDto.currency,
      interestRate: cdpDto.interestRate,
      termMonths: cdpDto.termMonths,
      startDate: new Date().toISOString().split('T')[0],
      maturityDate: new Date(Date.now() + cdpDto.termMonths * 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      status: 'ACTIVE' as const,
      autoRenew: cdpDto.autoRenew || false,
    };

    MOCK_CDPS.push(newCDP);

    return {
      success: true,
      data: newCDP,
      message: 'CDP creado exitosamente',
    };
  }

  @Post('simulate')
  async simulateCDP(@Body() simDto: any) {
    const { amount, interestRate, termMonths } = simDto;
    const monthlyRate = interestRate / 100 / 12;
    const totalInterest = amount * monthlyRate * termMonths;
    const finalAmount = amount + totalInterest;

    return {
      success: true,
      data: {
        principal: amount,
        interestRate,
        termMonths,
        totalInterest: parseFloat(totalInterest.toFixed(2)),
        finalAmount: parseFloat(finalAmount.toFixed(2)),
        monthlyInterest: parseFloat((totalInterest / termMonths).toFixed(2)),
      },
    };
  }
}
