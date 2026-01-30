'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/api';

export default function MFAPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    const customerData = localStorage.getItem('customer');
    
    if (!sessionId) {
      router.push('/login');
      return;
    }
    
    if (customerData) {
      setCustomer(JSON.parse(customerData));
    }
  }, [router]);

  const handleVerifyMFA = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        throw new Error('Sesión no encontrada');
      }

      const response = await authService.verifyMFA(sessionId, code);
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.removeItem('sessionId');
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Código inválido. En este prototipo cualquier código funciona (ejemplo: 123456)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            ※ multi money
          </h1>
          <p className="text-gray-400">Finanzas de estos tiempos</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-black mb-2">Verificación MFA</h2>
          {customer && (
            <p className="text-sm text-gray-600 mb-6">
              Hola {customer.firstName}, ingresa tu código de autenticación
            </p>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleVerifyMFA} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-600 mb-2">
                Código de verificación
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none text-center text-2xl tracking-widest"
                placeholder="123456"
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Verificar código'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/login')}
              className="text-sm text-blue-600 hover:underline"
            >
              Volver al inicio de sesión
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              En este prototipo cualquier código funciona (ejemplo: 123456)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
