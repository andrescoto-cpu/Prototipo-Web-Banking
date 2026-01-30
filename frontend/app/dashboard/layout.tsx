'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const customerData = localStorage.getItem('customer');
    
    if (!token) {
      router.push('/login');
      return;
    }
    
    if (customerData) {
      setCustomer(JSON.parse(customerData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('customer');
    localStorage.removeItem('sessionId');
    router.push('/login');
  };

  const navItems = [
    { href: '/dashboard', label: 'Inicio', icon: '🏠' },
    { href: '/dashboard/accounts', label: 'Cuentas', icon: '💳' },
    { href: '/dashboard/transfers', label: 'Transferencias', icon: '↔️' },
    { href: '/dashboard/cdp', label: 'CDPs', icon: '📈' },
    { href: '/dashboard/statements', label: 'Estados de Cuenta', icon: '📄' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold">
            ※ multi money
          </Link>
          
          <div className="flex items-center gap-4">
            {customer && (
              <span className="text-sm text-gray-400">
                {customer.firstName} {customer.lastName}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-opacity text-sm"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white min-h-[calc(100vh-72px)] p-4 border-r border-gray-200">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
