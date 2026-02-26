import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggleButton from '../components/ThemeToggleButton';

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-100">
      <header className="border-b border-slate-300 bg-white transition-colors dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-lg font-bold">SR Store</h1>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/catalogue" className="hover:underline">
              Catalogue
            </Link>
            <Link to="/customer/login" className="hover:underline">
              Customer Login
            </Link>
            <Link to="/admin/login" className="hover:underline">
              Admin Login
            </Link>
            <ThemeToggleButton />
          </nav>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6">
        <section className="text-center">
          <h2 className="text-5xl font-extrabold tracking-tight">SR Store</h2>
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
            20 years of trust.
          </p>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
