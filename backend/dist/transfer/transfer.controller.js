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
exports.TransferController = void 0;
const common_1 = require("@nestjs/common");
const mock_data_1 = require("../mock-data");
let TransferController = class TransferController {
    async getTransfers(query) {
        return {
            success: true,
            data: mock_data_1.MOCK_TRANSFERS,
        };
    }
    async createTransfer(transferDto) {
        const fromAccount = mock_data_1.MOCK_ACCOUNTS.find(acc => acc.id === transferDto.fromAccountId);
        const toAccount = mock_data_1.MOCK_ACCOUNTS.find(acc => acc.id === transferDto.toAccountId);
        if (!fromAccount || !toAccount) {
            return {
                success: false,
                message: 'Cuenta no encontrada',
            };
        }
        if (fromAccount.balance < transferDto.amount) {
            return {
                success: false,
                message: 'Saldo insuficiente',
            };
        }
        const newTransfer = {
            id: `trf-${Date.now()}`,
            fromAccountId: transferDto.fromAccountId,
            toAccountId: transferDto.toAccountId,
            amount: transferDto.amount,
            currency: transferDto.currency,
            description: transferDto.description,
            type: transferDto.type,
            status: 'COMPLETED',
            date: new Date().toISOString(),
            reference: `TRF-${new Date().getTime()}`,
        };
        mock_data_1.MOCK_TRANSFERS.push(newTransfer);
        return {
            success: true,
            data: newTransfer,
            message: 'Transferencia realizada exitosamente',
        };
    }
    async validateTransfer(transferDto) {
        const fromAccount = mock_data_1.MOCK_ACCOUNTS.find(acc => acc.id === transferDto.fromAccountId);
        if (!fromAccount) {
            return {
                valid: false,
                message: 'Cuenta origen no encontrada',
            };
        }
        if (fromAccount.balance < transferDto.amount) {
            return {
                valid: false,
                message: 'Saldo insuficiente',
            };
        }
        return {
            valid: true,
            message: 'Transferencia válida',
        };
    }
};
exports.TransferController = TransferController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "getTransfers", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "createTransfer", null);
__decorate([
    (0, common_1.Post)('validate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "validateTransfer", null);
exports.TransferController = TransferController = __decorate([
    (0, common_1.Controller)('transfers')
], TransferController);
//# sourceMappingURL=transfer.controller.js.map