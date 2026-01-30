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
exports.CdpController = void 0;
const common_1 = require("@nestjs/common");
const mock_data_1 = require("../mock-data");
let CdpController = class CdpController {
    async getCDPs(query) {
        return {
            success: true,
            data: mock_data_1.MOCK_CDPS,
        };
    }
    async getCDPById(id) {
        const cdp = mock_data_1.MOCK_CDPS.find(c => c.id === id);
        return {
            success: true,
            data: cdp,
        };
    }
    async createCDP(cdpDto) {
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
            status: 'ACTIVE',
            autoRenew: cdpDto.autoRenew || false,
        };
        mock_data_1.MOCK_CDPS.push(newCDP);
        return {
            success: true,
            data: newCDP,
            message: 'CDP creado exitosamente',
        };
    }
    async simulateCDP(simDto) {
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
};
exports.CdpController = CdpController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CdpController.prototype, "getCDPs", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CdpController.prototype, "getCDPById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CdpController.prototype, "createCDP", null);
__decorate([
    (0, common_1.Post)('simulate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CdpController.prototype, "simulateCDP", null);
exports.CdpController = CdpController = __decorate([
    (0, common_1.Controller)('cdp')
], CdpController);
//# sourceMappingURL=cdp.controller.js.map