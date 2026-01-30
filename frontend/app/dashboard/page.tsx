'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock data directo para el dashboard (sin depender del backend en esta vista)
const MOCK_ACCOUNTS = [
  {
    id: 'acc-1',
    accountNumber: '001-23456-78',
    accountType: 'SAVINGS',
    currency: 'CRC',
    balance: 5250000.50,
    availableBalance: 5250000.50,
    status: 'ACTIVE',
  },
  {
    id: 'acc-2',
    accountNumber: '001-23456-79',
    accountType: 'CHECKING',
    currency: 'USD',
    balance: 12500.75,
    availableBalance: 12500.75,
    status: 'ACTIVE',
  },
  {
    id: 'acc-3',
    accountNumber: '001-23456-80',
    accountType: 'SAVINGS',
    currency: 'USD',
    balance: 25000.00,
    availableBalance: 25000.00,
    status: 'ACTIVE',
  },
];

const MOCK_TRANSACTIONS = [
  {
    id: 'tx-1',
    type: 'DEPOSIT',
    amount: 500000,
    currency: 'CRC',
    description: 'Depósito en efectivo',
    date: '2026-01-28T10:30:00Z',
  },
  {
    id: 'tx-2',
    type: 'WITHDRAWAL',
    amount: 250000,
    currency: 'CRC',
    description: 'Retiro ATM',
    date: '2026-01-27T15:45:00Z',
  },
  {
    id: 'tx-3',
    type: 'TRANSFER',
    amount: 1500,
    currency: 'USD',
    description: 'Transferencia ACH recibida',
    date: '2026-01-25T14:20:00Z',
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
  });
}

export default function DashboardPage() {
  const [customer, setCustomer] = useState<any>(null);
  const [totalCRC, setTotalCRC] = useState(0);
  const [totalUSD, setTotalUSD] = useState(0);

  useEffect(() => {
    const customerData = localStorage.getItem('customer');
    if (customerData) {
      setCustomer(JSON.parse(customerData));
    }

    // Calcular totales
    const crc = MOCK_ACCOUNTS.filter(a => a.currency === 'CRC').reduce((sum, a) => sum + a.balance, 0);
    const usd = MOCK_ACCOUNTS.filter(a => a.currency === 'USD').reduce((sum, a) => sum + a.balance, 0);
    setTotalCRC(crc);
    setTotalUSD(usd);
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-black text-white rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-2">
          ¡Bienvenido{customer ? `, ${customer.firstName}` : ''}!
        </h1>
        <p className="text-gray-400">
          Resumen de tus finanzas al {new Date().toLocaleDateString('es-CR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total en Colones</p>
          <p className="text-3xl font-bold text-black">{formatCurrency(totalCRC, 'CRC')}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total en Dólares</p>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(totalUSD, 'USD')}</p>
        </div>
      </div>

      {/* Accounts Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-black">Mis Cuentas</h2>
          <Link href="/dashboard/accounts" className="text-sm text-blue-600 hover:underline">
            Ver todas
          </Link>
        </div>
        <div className="divide-y divide-gray-200">
          {MOCK_ACCOUNTS.map((account) => (
            <div key={account.id} className="p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-black">
                    {account.accountType === 'SAVINGS' ? 'Cuenta de Ahorro' : 'Cuenta Corriente'}
                  </p>
                  <p className="text-sm text-gray-600">{account.accountNumber}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-black">{formatCurrency(account.balance, account.currency)}</p>
                  <p className="text-xs text-gray-600">Disponible: {formatCurrency(account.availableBalance, account.currency)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-black">Últimos Movimientos</h2>
          <Link href="/dashboard/accounts" className="text-sm text-blue-600 hover:underline">
            Ver todos
          </Link>
        </div>
        <div className="divide-y divide-gray-200">
          {MOCK_TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'DEPOSIT' ? 'bg-green-100 text-green-600' :
                    tx.type === 'WITHDRAWAL' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {tx.type === 'DEPOSIT' ? '↓' : tx.type === 'WITHDRAWAL' ? '↑' : '↔'}
                  </div>
                  <div>
                    <p className="font-medium text-black">{tx.description}</p>
                    <p className="text-sm text-gray-600">{formatDate(tx.date)}</p>
                  </div>
                </div>
                <div className={`font-bold ${tx.type === 'DEPOSIT' ? 'text-green-600' : tx.type === 'WITHDRAWAL' ? 'text-red-600' : 'text-black'}`}>
                  {tx.type === 'DEPOSIT' ? '+' : '-'}{formatCurrency(tx.amount, tx.currency)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/dashboard/transfers" className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-green-600 transition-colors text-center">
          <div className="text-3xl mb-2">↔️</div>
          <p className="font-medium text-black">Transferir</p>
        </Link>
        <Link href="/dashboard/cdp" className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-green-600 transition-colors text-center">
          <div className="text-3xl mb-2">📈</div>
          <p className="font-medium text-black">Abrir CDP</p>
        </Link>
        <Link href="/dashboard/statements" className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-green-600 transition-colors text-center">
          <div className="text-3xl mb-2">📄</div>
          <p className="font-medium text-black">Estados de Cuenta</p>
        </Link>
        <Link href="/dashboard/accounts" className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-green-600 transition-colors text-center">
          <div className="text-3xl mb-2">💳</div>
          <p className="font-medium text-black">Mis Cuentas</p>
        </Link>
      </div>
    </div>
  );
}
