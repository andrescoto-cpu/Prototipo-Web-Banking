export declare class CustomerController {
    getCustomers(): Promise<{
        success: boolean;
        data: import("../mock-data").Customer[];
    }>;
}
