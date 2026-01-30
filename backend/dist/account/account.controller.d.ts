export declare class AccountController {
    getAccounts(customerId: string): Promise<{
        success: boolean;
        data: import("../mock-data").Account[];
    }>;
    getAccountById(id: string): Promise<{
        success: boolean;
        data: import("../mock-data").Account;
    }>;
    getTransactions(id: string, limit?: string): Promise<{
        success: boolean;
        data: import("../mock-data").Transaction[];
    }>;
}
