'use client';

import { useState } from 'react';

const MOCK_CDPS = [
  {
    id: 'cdp-1',
    cdpNumber: 'CDP-001-2024',
    amount: 10000,
    currency: 'USD',
    interestRate: 5.5,
    termMonths: 12,
    startDate: '2024-01-15',
    maturityDate: '2025-01-15',
    status: 'ACTIVE',
    autoRenew: true,
  },
  {
    id: 'cdp-2',
    cdpNumber: 'CDP-002-2025',
    amount: 5000000,
    currency: 'CRC',
    interestRate: 6.0,
    termMonths: 6,
    startDate: '2025-08-01',
    maturityDate: '2026-02-01',
    status: 'ACTIVE',
    autoRenew: false,
  },
];

const CDP_RATES = [
  { months: 3, rateUSD: 4.0, rateCRC: 4.5 },
  { months: 6, rateUSD: 4.5, rateCRC: 5.0 },
  { months: 12, rateUSD: 5.5, rateCRC: 6.0 },
  { months: 24, rateUSD: 6.0, rateCRC: 6.5 },
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
    month: 'long',
    year: 'numeric',
  });
}

export default function CDPPage() {
  const [showSimulator, setShowSimulator] = useState(false);
  const [showNewCDP, setShowNewCDP] = useState(false);
  const [cdps, setCdps] = useState(MOCK_CDPS);
  
  // Simulator state
  const [simAmount, setSimAmount] = useState('');
  const [simCurrency, setSimCurrency] = useState<'USD' | 'CRC'>('USD');
  const [simTerm, setSimTerm] = useState(12);
  const [simResult, setSimResult] = useState<any>(null);

  // New CDP state
  const [newAmount, setNewAmount] = useState('');
  const [newCurrency, setNewCurrency] = useState<'USD' | 'CRC'>('USD');
  const [newTerm, setNewTerm] = useState(12);
  const [newAutoRenew, setNewAutoRenew] = useState(false);
  const [success, setSuccess] = useState(false);

  const getRate = (term: number, currency: string): number => {
    const rateInfo = CDP_RATES.find(r => r.months === term);
    return currency === 'USD' ? rateInfo?.rateUSD || 5.0 : rateInfo?.rateCRC || 5.5;
  };

  const handleSimulate = () => {
    if (!simAmount || parseFloat(simAmount) <= 0) return;

    const amount = parseFloat(simAmount);
    const rate = getRate(simTerm, simCurrency);
    const monthlyRate = rate / 100 / 12;
    const totalInterest = amount * monthlyRate * simTerm;
    const finalAmount = amount + totalInterest;

    setSimResult({
      principal: amount,
      interestRate: rate,
      termMonths: simTerm,
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      finalAmount: parseFloat(finalAmount.toFixed(2)),
      monthlyInterest: parseFloat((totalInterest / simTerm).toFixed(2)),
    });
  };

  const handleCreateCDP = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAmount || parseFloat(newAmount) <= 0) return;

    const newCDP = {
      id: `cdp-${Date.now()}`,
      cdpNumber: `CDP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      amount: parseFloat(newAmount),
      currency: newCurrency,
      interestRate: getRate(newTerm, newCurrency),
      termMonths: newTerm,
      startDate: new Date().toISOString().split('T')[0],
      maturityDate: new Date(Date.now() + newTerm * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'ACTIVE',
      autoRenew: newAutoRenew,
    };

    setCdps([...cdps, newCDP]);
    setSuccess(true);
    
    setTimeout(() => {
      setShowNewCDP(false);
      setSuccess(false);
      setNewAmount('');
      setNewCurrency('USD');
      setNewTerm(12);
      setNewAutoRenew(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black mb-2">Certificados de Depósito</h1>
          <p className="text-gray-600">Gestiona tus inversiones a plazo fijo</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setShowSimulator(true); setShowNewCDP(false); }}
            className="bg-gray-100 text-gray-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
          >
            📊 Simulador
          </button>
          <button
            onClick={() => { setShowNewCDP(true); setShowSimulator(false); }}
            className="bg-green-600 text-white font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            + Nuevo CDP
          </button>
        </div>
      </div>

      {/* Current Rates */}
      <div className="bg-black text-white rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4">Tasas Vigentes</h3>
        <div className="grid grid-cols-4 gap-4">
          {CDP_RATES.map((rate) => (
            <div key={rate.months} className="text-center">
              <p className="text-2xl font-bold text-green-600">{rate.rateUSD}%</p>
              <p className="text-sm text-gray-400">{rate.months} meses</p>
              <p className="text-xs text-gray-400">USD</p>
            </div>
          ))}
        </div>
      </div>

      {/* Simulator Modal */}
      {showSimulator && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Simulador de CDP</h2>
            <button onClick={() => setShowSimulator(false)} className="text-gray-600 hover:text-black">✕</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Monto a invertir</label>
              <input
                type="number"
                value={simAmount}
                onChange={(e) => setSimAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                placeholder="10000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Moneda</label>
              <select
                value={simCurrency}
                onChange={(e) => setSimCurrency(e.target.value as 'USD' | 'CRC')}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              >
                <option value="USD">Dólares (USD)</option>
                <option value="CRC">Colones (CRC)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Plazo</label>
              <select
                value={simTerm}
                onChange={(e) => setSimTerm(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              >
                {CDP_RATES.map(r => (
                  <option key={r.months} value={r.months}>{r.months} meses</option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            onClick={handleSimulate}
            className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity mb-4"
          >
            Simular
          </button>
          
          {simResult && (
            <div className="bg-green-100 rounded-lg p-4">
              <h3 className="font-bold text-black mb-2">Resultado de la Simulación</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-gray-600">Capital:</span> <strong>{formatCurrency(simResult.principal, simCurrency)}</strong></div>
                <div><span className="text-gray-600">Tasa:</span> <strong>{simResult.interestRate}% anual</strong></div>
                <div><span className="text-gray-600">Interés total:</span> <strong className="text-green-600">{formatCurrency(simResult.totalInterest, simCurrency)}</strong></div>
                <div><span className="text-gray-600">Monto final:</span> <strong className="text-green-600">{formatCurrency(simResult.finalAmount, simCurrency)}</strong></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* New CDP Form */}
      {showNewCDP && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Abrir Nuevo CDP</h2>
            <button onClick={() => setShowNewCDP(false)} className="text-gray-600 hover:text-black">✕</button>
          </div>
          
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-white">✓</span>
              </div>
              <h3 className="text-xl font-bold text-black">¡CDP Creado Exitosamente!</h3>
            </div>
          ) : (
            <form onSubmit={handleCreateCDP} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Monto</label>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                    placeholder="10000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Moneda</label>
                  <select
                    value={newCurrency}
                    onChange={(e) => setNewCurrency(e.target.value as 'USD' | 'CRC')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                  >
                    <option value="USD">Dólares (USD)</option>
                    <option value="CRC">Colones (CRC)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Plazo</label>
                  <select
                    value={newTerm}
                    onChange={(e) => setNewTerm(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                  >
                    {CDP_RATES.map(r => (
                      <option key={r.months} value={r.months}>{r.months} meses - {newCurrency === 'USD' ? r.rateUSD : r.rateCRC}%</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newAutoRenew}
                      onChange={(e) => setNewAutoRenew(e.target.checked)}
                      className="w-5 h-5 text-green-600 rounded"
                    />
                    <span className="text-sm text-gray-600">Renovación automática</span>
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Crear CDP
              </button>
            </form>
          )}
        </div>
      )}

      {/* CDPs List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-black">Mis CDPs</h2>
        </div>
        
        {cdps.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {cdps.map((cdp) => (
              <div key={cdp.id} className="p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-black">{cdp.cdpNumber}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        cdp.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {cdp.status === 'ACTIVE' ? 'Activo' : cdp.status}
                      </span>
                      {cdp.autoRenew && (
                        <span className="text-xs text-blue-600">🔄 Auto-renovar</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {cdp.termMonths} meses • {cdp.interestRate}% anual
                    </p>
                    <p className="text-xs text-gray-600">
                      Vence: {formatDate(cdp.maturityDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-black">
                      {formatCurrency(cdp.amount, cdp.currency)}
                    </p>
                    <p className="text-sm text-green-600">
                      +{formatCurrency(cdp.amount * (cdp.interestRate / 100) * (cdp.termMonths / 12), cdp.currency)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-600">
            No tienes CDPs activos. ¡Abre uno nuevo!
          </div>
        )}
      </div>
    </div>
  );
}
