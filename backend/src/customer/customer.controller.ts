import { Controller, Get } from '@nestjs/common';
import { MOCK_CUSTOMERS } from '../mock-data';

@Controller('customer')
export class CustomerController {
  @Get()
  async getCustomers() {
    return {
      success: true,
      data: MOCK_CUSTOMERS,
    };
  }
}
