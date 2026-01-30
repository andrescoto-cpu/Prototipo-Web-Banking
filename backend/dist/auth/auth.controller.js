"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const mock_data_1 = require("../mock-data");
let AuthController = class AuthController {
    constructor() {
        this.sessions = new Map();
    }
    async login(loginDto) {
        const user = mock_data_1.MOCK_USERS.find(u => u.email === loginDto.email && u.password === loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const customer = mock_data_1.MOCK_CUSTOMERS.find(c => c.id === user.customerId);
        return {
            success: true,
            requiresMFA: true,
            sessionId: `session-${Date.now()}`,
            customer: {
                id: customer.id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
            },
        };
    }
    async verifyMFA(mfaDto) {
        const token = `Bearer mock-jwt-token-${Date.now()}`;
        this.sessions.set(token, {
            sessionId: mfaDto.sessionId,
            authenticated: true,
            timestamp: Date.now(),
        });
        return {
            success: true,
            token,
            message: 'Autenticación exitosa',
        };
    }
    async getProfile(auth) {
        if (!auth || !this.sessions.has(auth)) {
            throw new common_1.UnauthorizedException('Sesión inválida');
        }
        const customer = mock_data_1.MOCK_CUSTOMERS[0];
        return {
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
            documentNumber: customer.documentNumber,
        };
    }
    async logout(auth) {
        if (auth) {
            this.sessions.delete(auth);
        }
        return {
            success: true,
            message: 'Sesión cerrada exitosamente',
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('verify-mfa'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyMFA", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth')
], AuthController);
//# sourceMappingURL=auth.controller.js.map