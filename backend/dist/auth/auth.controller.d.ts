export declare class AuthController {
    private sessions;
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        success: boolean;
        requiresMFA: boolean;
        sessionId: string;
        customer: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
        };
    }>;
    verifyMFA(mfaDto: {
        sessionId: string;
        code: string;
    }): Promise<{
        success: boolean;
        token: string;
        message: string;
    }>;
    getProfile(auth: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        documentNumber: string;
    }>;
    logout(auth: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
