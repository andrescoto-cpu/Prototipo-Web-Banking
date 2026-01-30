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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const mock_data_1 = require("../mock-data");
let AccountController = class AccountController {
    async getAccounts(customerId) {
        const accounts = mock_data_1.MOCK_ACCOUNTS.filter(acc => acc.customerId === customerId || customerId === '1');
        return {
            success: true,
            data: accounts,
        };
    }
    async getAccountById(id) {
        const account = mock_data_1.MOCK_ACCOUNTS.find(acc => acc.id === id);
        return {
            success: true,
            data: account,
        };
    }
    async getTransactions(id, limit = '10') {
        const transactions = mock_data_1.MOCK_TRANSACTIONS.filter(tx => tx.accountId === id)
            .slice(0, parseInt(limit));
        return {
            success: true,
            data: transactions,
        };
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccounts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountById", null);
__decorate([
    (0, common_1.Get)(':id/transactions'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getTransactions", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.Controller)('accounts')
], AccountController);
//# sourceMappingURL=account.controller.js.map