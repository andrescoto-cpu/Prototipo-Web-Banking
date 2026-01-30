'use client';

import { useState } from 'react';

const MOCK_ACCOUNTS = [
  {
    id: 'acc-1',
    accountNumber: '001-23456-78',
    accountType: 'SAVINGS',
    currency: 'CRC',
    balance: 5250000.50,
  },
  {
    id: 'acc-2',
    accountNumber: '001-23456-79',
    accountType: 'CHECKING',
    currency: 'USD',
    balance: 12500.75,
  },
  {
    id: 'acc-3',
    accountNumber: '001-23456-80',
    accountType: 'SAVINGS',
    currency: 'USD',
    balance: 25000.00,
  },
];

const MOCK_BENEFICIARIES = [
  { id: 'ben-1', name: 'María Rodríguez', accountNumber: '002-98765-43', bank: 'Multimoney' },
  { id: 'ben-2', name: 'Carlos Jiménez', accountNumber: '003-11111-22', bank: 'Banco Nacional' },
  { id: 'ben-3', name: 'Ana Vargas', accountNumber: '004-55555-66', bank: 'BAC' },
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

export default function TransfersPage() {
  const [step, setStep] = useState(1);
  const [transferType, setTransferType] = useState<'OWN' | 'THIRD_PARTY' | 'ACH'>('OWN');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const selectedFromAccount = MOCK_ACCOUNTS.find(a => a.id === fromAccount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validar datos
      if (!fromAccount || !amount || parseFloat(amount) <= 0) {
        setError('Por favor completa todos los campos requeridos');
        return;
      }
      
      if (transferType === 'OWN' && !toAccount) {
        setError('Selecciona una cuenta destino');
        return;
      }
      
      if ((transferType === 'THIRD_PARTY' || transferType === 'ACH') && !beneficiary) {
        setError('Selecciona un beneficiario');
        return;
      }
      
      const accountBalance = selectedFromAccount?.balance || 0;
      if (parseFloat(amount) > accountBalance) {
        setError('Saldo insuficiente');
        return;
      }
      
      setError('');
      setStep(2);
    } else if (step === 2) {
      // Verificar OTP (cualquier código funciona en prototipo)
      if (!otpCode || otpCode.length < 4) {
        setError('Ingresa un código válido');
        return;
      }
      
      setError('');
      setSuccess(true);
      setStep(3);
    }
  };

  const resetForm = () => {
    setStep(1);
    setTransferType('OWN');
    setFromAccount('');
    setToAccount('');
    setBeneficiary('');
    setAmount('');
    setDescription('');
    setOtpCode('');
    setSuccess(false);
    setError('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black mb-2">Transferencias</h1>
        <p className="text-gray-600">Realiza transferencias entre cuentas propias, a terceros o interbancarias</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
              step >= s ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              {step > s ? '✓' : s}
            </div>
            <span className={step >= s ? 'text-black font-medium' : 'text-gray-600'}>
              {s === 1 ? 'Datos' : s === 2 ? 'Verificación' : 'Confirmación'}
            </span>
            {s < 3 && <div className="w-8 h-0.5 bg-gray-100" />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transfer Type */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Tipo de Transferencia
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'OWN', label: 'Entre mis cuentas' },
                  { value: 'THIRD_PARTY', label: 'A terceros' },
                  { value: 'ACH', label: 'Interbancaria' },
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setTransferType(type.value as any)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      transferType === type.value
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-100'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* From Account */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Cuenta Origen
              </label>
              <select
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                required
              >
                <option value="">Selecciona una cuenta</option>
                {MOCK_ACCOUNTS.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.accountNumber} - {formatCurrency(account.balance, account.currency)}
                  </option>
                ))}
              </select>
            </div>

            {/* To Account (Own) */}
            {transferType === 'OWN' && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Cuenta Destino
                </label>
                <select
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                  required
                >
                  <option value="">Selecciona una cuenta</option>
                  {MOCK_ACCOUNTS.filter(a => a.id !== fromAccount).map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.accountNumber} - {account.currency}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Beneficiary (Third Party / ACH) */}
            {(transferType === 'THIRD_PARTY' || transferType === 'ACH') && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Beneficiario
                </label>
                <select
                  value={beneficiary}
                  onChange={(e) => setBeneficiary(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                  required
                >
                  <option value="">Selecciona un beneficiario</option>
                  {MOCK_BENEFICIARIES.map((ben) => (
                    <option key={ben.id} value={ben.id}>
                      {ben.name} - {ben.accountNumber} ({ben.bank})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Monto
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                  {selectedFromAccount?.currency === 'CRC' ? '₡' : '$'}
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Descripción (opcional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                placeholder="Ej: Pago mensual"
                maxLength={50}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Continuar
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔐</span>
              </div>
              <h2 className="text-xl font-bold text-black mb-2">Verificación de Seguridad</h2>
              <p className="text-gray-600 mb-6">
                Ingresa el código de verificación para confirmar la transferencia
              </p>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tipo:</span>
                <span className="font-medium text-black">
                  {transferType === 'OWN' ? 'Entre mis cuentas' : transferType === 'THIRD_PARTY' ? 'A terceros' : 'Interbancaria'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Monto:</span>
                <span className="font-medium text-black">
                  {formatCurrency(parseFloat(amount), selectedFromAccount?.currency || 'USD')}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Código OTP
              </label>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none text-center text-2xl tracking-widest"
                placeholder="123456"
                maxLength={6}
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 text-gray-600 font-medium py-3 rounded-lg hover:bg-opacity-80 transition-opacity"
              >
                Volver
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Confirmar
              </button>
            </div>

            <p className="text-xs text-center text-gray-600">
              En este prototipo cualquier código funciona
            </p>
          </form>
        )}

        {step === 3 && success && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-white">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">¡Transferencia Exitosa!</h2>
            <p className="text-gray-600 mb-6">
              Tu transferencia de {formatCurrency(parseFloat(amount), selectedFromAccount?.currency || 'USD')} ha sido procesada correctamente.
            </p>
            <p className="text-sm text-gray-600 mb-8">
              Referencia: TRF-{Date.now().toString().slice(-8)}
            </p>
            <button
              onClick={resetForm}
              className="bg-green-600 text-white font-medium px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Nueva Transferencia
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
