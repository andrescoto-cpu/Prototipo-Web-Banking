export declare class CdpController {
    getCDPs(query: any): Promise<{
        success: boolean;
        data: import("../mock-data").CDP[];
    }>;
    getCDPById(id: string): Promise<{
        success: boolean;
        data: import("../mock-data").CDP;
    }>;
    createCDP(cdpDto: any): Promise<{
        success: boolean;
        data: {
            id: string;
            customerId: any;
            cdpNumber: string;
            amount: any;
            currency: any;
            interestRate: any;
            termMonths: any;
            startDate: string;
            maturityDate: string;
            status: "ACTIVE";
            autoRenew: any;
        };
        message: string;
    }>;
    simulateCDP(simDto: any): Promise<{
        success: boolean;
        data: {
            principal: any;
            interestRate: any;
            termMonths: any;
            totalInterest: number;
            finalAmount: number;
            monthlyInterest: number;
        };
    }>;
}
