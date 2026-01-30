import { Controller, Get, Param, Query } from '@nestjs/common';
import { MOCK_ACCOUNTS, MOCK_TRANSACTIONS } from '../mock-data';

@Controller('accounts')
export class AccountController {
  @Get()
  async getAccounts(@Query('customerId') customerId: string) {
    const accounts = MOCK_ACCOUNTS.filter(acc => acc.customerId === customerId || customerId === '1');
    
    return {
      success: true,
      data: accounts,
    };
  }

  @Get(':id')
  async getAccountById(@Param('id') id: string) {
    const account = MOCK_ACCOUNTS.find(acc => acc.id === id);
    
    return {
      success: true,
      data: account,
    };
  }

  @Get(':id/transactions')
  async getTransactions(
    @Param('id') id: string,
    @Query('limit') limit: string = '10',
  ) {
    const transactions = MOCK_TRANSACTIONS.filter(tx => tx.accountId === id)
      .slice(0, parseInt(limit));
    
    return {
      success: true,
      data: transactions,
    };
  }
}
