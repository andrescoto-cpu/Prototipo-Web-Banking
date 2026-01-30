export interface Customer {
    id: string;
    documentType: string;
    documentNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
}
export interface Account {
    id: string;
    customerId: string;
    accountNumber: string;
    accountType: 'SAVINGS' | 'CHECKING';
    currency: 'USD' | 'CRC';
    balance: number;
    availableBalance: number;
    status: 'ACTIVE' | 'BLOCKED' | 'CLOSED';
    openDate: string;
    interestRate?: number;
}
export interface Transaction {
    id: string;
    accountId: string;
    type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER' | 'FEE' | 'INTEREST';
    amount: number;
    currency: string;
    description: string;
    date: string;
    balance: number;
    reference: string;
}
export interface Transfer {
    id: string;
    fromAccountId: string;
    toAccountId: string;
    amount: number;
    currency: string;
    description: string;
    type: 'OWN' | 'THIRD_PARTY' | 'ACH';
    status: 'PENDING' | 'COMPLETED' | 'REJECTED';
    date: string;
    reference: string;
}
export interface CDP {
    id: string;
    customerId: string;
    cdpNumber: string;
    amount: number;
    currency: string;
    interestRate: number;
    termMonths: number;
    startDate: string;
    maturityDate: string;
    status: 'ACTIVE' | 'MATURED' | 'CANCELLED';
    autoRenew: boolean;
}
export declare const MOCK_CUSTOMERS: Customer[];
export declare const MOCK_ACCOUNTS: Account[];
export declare const MOCK_TRANSACTIONS: Transaction[];
export declare const MOCK_CDPS: CDP[];
export declare const MOCK_TRANSFERS: Transfer[];
export declare const MOCK_USERS: {
    email: string;
    password: string;
    customerId: string;
    mfaEnabled: boolean;
}[];
