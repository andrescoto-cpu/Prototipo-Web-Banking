'use client';

import { useState } from 'react';

const MOCK_ACCOUNTS = [
  {
    id: 'acc-1',
    accountNumber: '001-23456-78',
    accountType: 'SAVINGS',
    currency: 'CRC',
    balance: 5250000.50,
    availableBalance: 5250000.50,
    status: 'ACTIVE',
    openDate: '2020-01-15',
    interestRate: 3.5,
  },
  {
    id: 'acc-2',
    accountNumber: '001-23456-79',
    accountType: 'CHECKING',
    currency: 'USD',
    balance: 12500.75,
    availableBalance: 12500.75,
    status: 'ACTIVE',
    openDate: '2020-01-15',
  },
  {
    id: 'acc-3',
    accountNumber: '001-23456-80',
    accountType: 'SAVINGS',
    currency: 'USD',
    balance: 25000.00,
    availableBalance: 25000.00,
    status: 'ACTIVE',
    openDate: '2021-06-10',
    interestRate: 2.5,
  },
];

const MOCK_TRANSACTIONS = [
  {
    id: 'tx-1',
    accountId: 'acc-1',
    type: 'DEPOSIT',
    amount: 500000,
    currency: 'CRC',
    description: 'Depósito en efectivo',
    date: '2026-01-28T10:30:00Z',
    balance: 5250000.50,
    reference: 'DEP-20260128-001',
  },
  {
    id: 'tx-2',
    accountId: 'acc-1',
    type: 'WITHDRAWAL',
    amount: 250000,
    currency: 'CRC',
    description: 'Retiro ATM',
    date: '2026-01-27T15:45:00Z',
    balance: 4750000.50,
    reference: 'ATM-20260127-523',
  },
  {
    id: 'tx-3',
    accountId: 'acc-1',
    type: 'TRANSFER',
    amount: 100000,
    currency: 'CRC',
    description: 'Transferencia a cuenta propia',
    date: '2026-01-26T09:15:00Z',
    balance: 5000000.50,
    reference: 'TRF-20260126-789',
  },
  {
    id: 'tx-4',
    accountId: 'acc-2',
    type: 'DEPOSIT',
    amount: 1500,
    currency: 'USD',
    description: 'Transferencia ACH',
    date: '2026-01-25T14:20:00Z',
    balance: 12500.75,
    reference: 'ACH-20260125-456',
  },
  {
    id: 'tx-5',
    accountId: 'acc-2',
    type: 'FEE',
    amount: 5,
    currency: 'USD',
    description: 'Comisión mantenimiento',
    date: '2026-01-01T00:00:00Z',
    balance: 11000.75,
    reference: 'FEE-20260101-MAINT',
  },
];

function formatCurrency(amount: number, currency: string): string {
  if (currency === 'CRC') {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 2,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-CR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const transactions = selectedAccount
    ? MOCK_TRANSACTIONS.filter(tx => tx.accountId === selectedAccount)
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black mb-2">Mis Cuentas</h1>
        <p className="text-gray-600">Consulta y gestiona tus cuentas bancarias</p>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_ACCOUNTS.map((account) => (
          <div
            key={account.id}
            onClick={() => setSelectedAccount(account.id)}
            className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all cursor-pointer ${
              selectedAccount === account.id
                ? 'border-green-600 shadow-md'
                : 'border-gray-200 hover:border-green-500'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                account.accountType === 'SAVINGS'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {account.accountType === 'SAVINGS' ? 'Ahorro' : 'Corriente'}
              </span>
              <span className="text-xs text-gray-600">{account.currency}</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-1">{account.accountNumber}</p>
            <p className="text-2xl font-bold text-black mb-2">
              {formatCurrency(account.balance, account.currency)}
            </p>
            <p className="text-xs text-gray-600">
              Disponible: {formatCurrency(account.availableBalance, account.currency)}
            </p>
            
            {account.interestRate && (
              <p className="text-xs text-green-600 mt-2">
                Tasa de interés: {account.interestRate}%
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Transactions */}
      {selectedAccount && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-black">
              Movimientos de la cuenta {MOCK_ACCOUNTS.find(a => a.id === selectedAccount)?.accountNumber}
            </h2>
          </div>
          
          {transactions.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'DEPOSIT' ? 'bg-green-100 text-green-600' :
                        tx.type === 'WITHDRAWAL' ? 'bg-red-100 text-red-600' :
                        tx.type === 'FEE' ? 'bg-orange-100 text-orange-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {tx.type === 'DEPOSIT' ? '↓' : tx.type === 'WITHDRAWAL' ? '↑' : tx.type === 'FEE' ? '!' : '↔'}
                      </div>
                      <div>
                        <p className="font-medium text-black">{tx.description}</p>
                        <p className="text-xs text-gray-600">{formatDate(tx.date)}</p>
                        <p className="text-xs text-gray-600">Ref: {tx.reference}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        tx.type === 'DEPOSIT' ? 'text-green-600' : 
                        tx.type === 'WITHDRAWAL' || tx.type === 'FEE' ? 'text-red-600' : 
                        'text-black'
                      }`}>
                        {tx.type === 'DEPOSIT' ? '+' : '-'}{formatCurrency(tx.amount, tx.currency)}
                      </p>
                      <p className="text-xs text-gray-600">
                        Saldo: {formatCurrency(tx.balance, tx.currency)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-600">
              No hay movimientos para esta cuenta
            </div>
          )}
        </div>
      )}

      {!selectedAccount && (
        <div className="bg-gray-100 rounded-xl p-8 text-center">
          <p className="text-gray-600">Selecciona una cuenta para ver sus movimientos</p>
        </div>
      )}
    </div>
  );
}
