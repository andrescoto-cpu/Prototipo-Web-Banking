'use client';

import { useState } from 'react';

const MOCK_STATEMENTS = [
  {
    id: 'stmt-1',
    accountNumber: '001-23456-78',
    accountType: 'SAVINGS',
    period: '2026-01',
    periodLabel: 'Enero 2026',
    openingBalance: 4750000.50,
    closingBalance: 5250000.50,
    transactions: 12,
    currency: 'CRC',
  },
  {
    id: 'stmt-2',
    accountNumber: '001-23456-78',
    accountType: 'SAVINGS',
    period: '2025-12',
    periodLabel: 'Diciembre 2025',
    openingBalance: 4500000.00,
    closingBalance: 4750000.50,
    transactions: 8,
    currency: 'CRC',
  },
  {
    id: 'stmt-3',
    accountNumber: '001-23456-78',
    accountType: 'SAVINGS',
    period: '2025-11',
    periodLabel: 'Noviembre 2025',
    openingBalance: 4200000.00,
    closingBalance: 4500000.00,
    transactions: 15,
    currency: 'CRC',
  },
  {
    id: 'stmt-4',
    accountNumber: '001-23456-79',
    accountType: 'CHECKING',
    period: '2026-01',
    periodLabel: 'Enero 2026',
    openingBalance: 11000.75,
    closingBalance: 12500.75,
    transactions: 6,
    currency: 'USD',
  },
  {
    id: 'stmt-5',
    accountNumber: '001-23456-79',
    accountType: 'CHECKING',
    period: '2025-12',
    periodLabel: 'Diciembre 2025',
    openingBalance: 10500.00,
    closingBalance: 11000.75,
    transactions: 4,
    currency: 'USD',
  },
];

const MOCK_ACCOUNTS = [
  { accountNumber: '001-23456-78', accountType: 'SAVINGS', currency: 'CRC' },
  { accountNumber: '001-23456-79', accountType: 'CHECKING', currency: 'USD' },
  { accountNumber: '001-23456-80', accountType: 'SAVINGS', currency: 'USD' },
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

export default function StatementsPage() {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [downloading, setDownloading] = useState<string | null>(null);

  const filteredStatements = selectedAccount
    ? MOCK_STATEMENTS.filter(s => s.accountNumber === selectedAccount)
    : MOCK_STATEMENTS;

  const handleDownload = (statementId: string) => {
    setDownloading(statementId);
    
    // Simular descarga
    setTimeout(() => {
      setDownloading(null);
      alert('Estado de cuenta descargado (simulado). En producción se generaría un PDF real.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black mb-2">Estados de Cuenta</h1>
        <p className="text-gray-600">Consulta y descarga tus estados de cuenta mensuales</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-600">Filtrar por cuenta:</label>
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
          >
            <option value="">Todas las cuentas</option>
            {MOCK_ACCOUNTS.map((acc) => (
              <option key={acc.accountNumber} value={acc.accountNumber}>
                {acc.accountNumber} - {acc.accountType === 'SAVINGS' ? 'Ahorro' : 'Corriente'} ({acc.currency})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Statements List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-black">Histórico de Estados</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredStatements.map((statement) => (
            <div key={statement.id} className="p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📄</span>
                  </div>
                  <div>
                    <p className="font-medium text-black">{statement.periodLabel}</p>
                    <p className="text-sm text-gray-600">
                      Cuenta: {statement.accountNumber} • {statement.accountType === 'SAVINGS' ? 'Ahorro' : 'Corriente'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {statement.transactions} transacciones
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Saldo Inicial</p>
                    <p className="font-medium text-black">{formatCurrency(statement.openingBalance, statement.currency)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Saldo Final</p>
                    <p className="font-bold text-green-600">{formatCurrency(statement.closingBalance, statement.currency)}</p>
                  </div>
                  <button
                    onClick={() => handleDownload(statement.id)}
                    disabled={downloading === statement.id}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {downloading === statement.id ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        <span>Descargando...</span>
                      </>
                    ) : (
                      <>
                        <span>⬇️</span>
                        <span>PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-green-100 rounded-xl p-6">
        <h3 className="font-bold text-black mb-2">📌 Información</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Los estados de cuenta se generan automáticamente cada mes</li>
          <li>• Disponibles para descarga dentro de los 5 primeros días del mes siguiente</li>
          <li>• Se conservan por un período de 2 años</li>
          <li>• Para estados anteriores, contacta a servicio al cliente</li>
        </ul>
      </div>
    </div>
  );
}
