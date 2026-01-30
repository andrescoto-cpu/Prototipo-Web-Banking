export declare class TransferController {
    getTransfers(query: any): Promise<{
        success: boolean;
        data: import("../mock-data").Transfer[];
    }>;
    createTransfer(transferDto: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        data: {
            id: string;
            fromAccountId: any;
            toAccountId: any;
            amount: any;
            currency: any;
            description: any;
            type: any;
            status: "COMPLETED";
            date: string;
            reference: string;
        };
        message: string;
    }>;
    validateTransfer(transferDto: any): Promise<{
        valid: boolean;
        message: string;
    }>;
}
