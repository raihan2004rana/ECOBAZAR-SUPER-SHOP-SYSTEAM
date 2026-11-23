'use client';

import * as React from 'react';
import {
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldCheck,
  User,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Logo } from '@ecobazar/ui';

interface AdminSecurityGateProps {
  children: (props: {
    adminUser: { name: string; role: string; email: string };
    onLogout: () => void;
  }) => React.ReactNode;
}

const AUTHORIZED_ACCOUNTS = [
  {
    email: 'admin@ecobazar.com',
    password: 'admin123',
    pin: '2026',
    name: 'Super Administrator',
    role: 'Managing Director & Enterprise Owner',
  },
  {
    email: 'manager@ecobazar.com',
    password: 'manager123',
    pin: '1122',
    name: 'Gulshan Branch Manager',
    role: 'Store Operations Supervisor',
  },
];

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 Minutes
const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 Minutes auto-lock

export const AdminSecurityGate: React.FC<AdminSecurityGateProps> = ({ children }) => {
  // Authentication & session state
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [currentAdmin, setCurrentAdmin] = React.useState<{ name: string; role: string; email: string } | null>(null);
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Form inputs
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pin, setPin] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Brute force lockout state
  const [failedAttempts, setFailedAttempts] = React.useState(0);
  const [lockoutUntil, setLockoutUntil] = React.useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = React.useState(0);

  // Check existing session on mount
  React.useEffect(() => {
    setIsHydrated(true);

    try {
      // 1. Check existing lockout
      const storedLockout = localStorage.getItem('ecobazar_admin_lockout');
      if (storedLockout) {
        const lockoutTime = parseInt(storedLockout, 10);
        if (lockoutTime > Date.now()) {
          setLockoutUntil(lockoutTime);
        } else {
          localStorage.removeItem('ecobazar_admin_lockout');
          localStorage.removeItem('ecobazar_admin_attempts');
        }
      }

      const storedAttempts = localStorage.getItem('ecobazar_admin_attempts');
      if (storedAttempts) {
        setFailedAttempts(parseInt(storedAttempts, 10));
      }

      // 2. Check existing authenticated session
      const sessionRaw = sessionStorage.getItem('ecobazar_admin_session');
      if (sessionRaw) {
        const session = JSON.parse(sessionRaw);
        if (session.expiresAt && session.expiresAt > Date.now()) {
          setIsAuthenticated(true);
          setCurrentAdmin(session.user);
        } else {
          sessionStorage.removeItem('ecobazar_admin_session');
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  // Lockout countdown timer
  React.useEffect(() => {
    if (!lockoutUntil) return;

    const updateCountdown = () => {
      const now = Date.now();
      if (now >= lockoutUntil) {
        setLockoutUntil(null);
        setFailedAttempts(0);
        localStorage.removeItem('ecobazar_admin_lockout');
        localStorage.removeItem('ecobazar_admin_attempts');
        setRemainingSeconds(0);
      } else {
        setRemainingSeconds(Math.ceil((lockoutUntil - now) / 1000));
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  // Inactivity auto-lock (15 minutes of no activity)
  React.useEffect(() => {
    if (!isAuthenticated) return;

    let inactivityTimer: NodeJS.Timeout;

    const resetInactivity = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        handleLogout('Session auto-locked due to 15 minutes of inactivity for security.');
      }, INACTIVITY_TIMEOUT_MS);
    };

    window.addEventListener('mousemove', resetInactivity);
    window.addEventListener('keydown', resetInactivity);
    window.addEventListener('click', resetInactivity);
    window.addEventListener('scroll', resetInactivity);

    resetInactivity();

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', resetInactivity);
      window.removeEventListener('keydown', resetInactivity);
      window.removeEventListener('click', resetInactivity);
      window.removeEventListener('scroll', resetInactivity);
    };
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutUntil && Date.now() < lockoutUntil) return;

    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = password.trim();
      const cleanPin = pin.trim();

      const matchedAccount = AUTHORIZED_ACCOUNTS.find(
        (acc) =>
          acc.email.toLowerCase() === cleanEmail &&
          acc.password === cleanPass &&
          acc.pin === cleanPin
      );

      if (matchedAccount) {
        // Successful authentication
        const userData = {
          name: matchedAccount.name,
          role: matchedAccount.role,
          email: matchedAccount.email,
        };

        const sessionPayload = {
          token: `eco_sec_${Date.now().toString(36)}_${Math.random().toString(36).substring(2)}`,
          user: userData,
          expiresAt: Date.now() + 8 * 60 * 60 * 1000, // 8 Hours
        };

        sessionStorage.setItem('ecobazar_admin_session', JSON.stringify(sessionPayload));
        localStorage.removeItem('ecobazar_admin_attempts');
        localStorage.removeItem('ecobazar_admin_lockout');

        setFailedAttempts(0);
        setCurrentAdmin(userData);
        setIsAuthenticated(true);
      } else {
        // Failed attempt: increment and check lockout
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        localStorage.setItem('ecobazar_admin_attempts', nextAttempts.toString());

        if (nextAttempts >= MAX_FAILED_ATTEMPTS) {
          const lockTime = Date.now() + LOCKOUT_DURATION_MS;
          setLockoutUntil(lockTime);
          localStorage.setItem('ecobazar_admin_lockout', lockTime.toString());
          setErrorMessage(
            'Security Lockout: 5 consecutive invalid login attempts. Terminal access is temporarily suspended for 15 minutes.'
          );
        } else {
          setErrorMessage(
            `Access Denied: Invalid email, password, or security PIN. (${MAX_FAILED_ATTEMPTS - nextAttempts} attempt${MAX_FAILED_ATTEMPTS - nextAttempts === 1 ? '' : 's'} remaining)`
          );
        }
      }

      setIsSubmitting(false);
    }, 400);
  };

  const handleLogout = (message?: string) => {
    sessionStorage.removeItem('ecobazar_admin_session');
    setIsAuthenticated(false);
    setCurrentAdmin(null);
    setPassword('');
    setPin('');
    if (message) {
      setErrorMessage(message);
    }
  };

  // Quick fill helper for testing/administrators
  const handleQuickFill = (accIndex: number) => {
    const acc = AUTHORIZED_ACCOUNTS[accIndex];
    if (acc) {
      setEmail(acc.email);
      setPassword(acc.password);
      setPin(acc.pin);
      setErrorMessage('');
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-neutral-950 flex items-center justify-center text-neutral-600 dark:text-neutral-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-[#16A36A] border-t-transparent animate-spin" />
          <span className="text-xs font-semibold tracking-wide text-neutral-600 dark:text-neutral-400">
            Initializing ECOBAZAR Admin Portal...
          </span>
        </div>
      </div>
    );
  }

  // If already authenticated, render the dashboard
  if (isAuthenticated && currentAdmin) {
    return (
      <>
        {children({
          adminUser: currentAdmin,
          onLogout: () => handleLogout('Signed out successfully. Session ended.'),
        })}
      </>
    );
  }

  // Otherwise, render the Modern, Clean Enterprise Login Screen
  const isLocked = !!(lockoutUntil && Date.now() < lockoutUntil);
  const lockMinutes = Math.floor(remainingSeconds / 60);
  const lockSecs = remainingSeconds % 60;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-neutral-950 flex flex-col items-center justify-center p-4 sm:p-6 text-neutral-900 dark:text-neutral-100 relative overflow-hidden select-none transition-colors">
      {/* Soft Background Radial Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#16A36A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-100/40 dark:bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-100/40 dark:bg-teal-950/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Elevated Enterprise Login Card */}
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-3xl p-7 sm:p-9 shadow-xl shadow-neutral-900/5 relative z-10 transition-all">
        {/* Top Branding with Official Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="mb-4">
            <Logo size="lg" showTagline={true} />
          </div>
          <h1 className="text-2xl font-black text-[#124432] dark:text-white tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Sign in to your ECOBAZAR Admin Dashboard.
          </p>
        </div>

        {/* Lockout Warning Box */}
        {isLocked && (
          <div className="mb-5 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-3 animate-in fade-in">
            <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-rose-900 dark:text-white text-xs">Security Lockdown Active</p>
              <p className="text-[11px] text-rose-700 dark:text-rose-300 leading-relaxed">
                Too many incorrect login attempts detected. Terminal access is temporarily frozen.
              </p>
              <p className="font-mono font-bold text-xs text-rose-700 dark:text-rose-400 inline-flex items-center gap-1.5 pt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  Unlocks in {lockMinutes}:{lockSecs < 10 ? `0${lockSecs}` : lockSecs} min
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Error Alert Box */}
        {!isLocked && errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="font-medium leading-snug">{errorMessage}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email / Admin ID */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Administrator Email / ID
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                disabled={isLocked || isSubmitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ecobazar.com"
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 focus:border-[#16A36A] focus:ring-2 focus:ring-[#16A36A]/20 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 transition-all font-medium disabled:opacity-50 outline-hidden"
              />
            </div>
          </div>

          {/* Master Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setErrorMessage('Please contact your System Administrator to reset executive credentials.');
                }}
                className="text-[11px] font-semibold text-[#16A36A] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                disabled={isLocked || isSubmitting}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-2.5 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 focus:border-[#16A36A] focus:ring-2 focus:ring-[#16A36A]/20 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 transition-all disabled:opacity-50 outline-hidden"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Security Access PIN (4-Digits) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                Executive Security PIN
              </label>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                4-Digit Key
              </span>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                maxLength={6}
                required
                disabled={isLocked || isSubmitting}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 focus:border-[#16A36A] focus:ring-2 focus:ring-[#16A36A]/20 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 transition-all tracking-[0.4em] text-center font-mono font-bold disabled:opacity-50 outline-hidden"
              />
            </div>
          </div>

          {/* Quick Demo Credentials Pill Selector */}
          <div className="pt-1">
            <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1.5">
              <span className="flex items-center gap-1 font-medium">
                <Sparkles className="w-3 h-3 text-[#16A36A]" />
                Demo Credentials:
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill(0)}
                className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 hover:border-[#16A36A] hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 text-left transition text-[11px] text-neutral-700 dark:text-neutral-300 cursor-pointer"
              >
                <span className="font-bold text-neutral-900 dark:text-white block">Super Admin</span>
                <span className="text-[10px] text-neutral-400">admin@ecobazar.com</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill(1)}
                className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 hover:border-[#16A36A] hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 text-left transition text-[11px] text-neutral-700 dark:text-neutral-300 cursor-pointer"
              >
                <span className="font-bold text-neutral-900 dark:text-white block">Branch Manager</span>
                <span className="text-[10px] text-neutral-400">manager@ecobazar.com</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLocked || isSubmitting}
            className="w-full mt-2 bg-[#16A36A] hover:bg-[#128855] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : isLocked ? (
              <>
                <Lock className="w-4 h-4" />
                <span>Terminal Locked</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Secondary Security Information Footer */}
        <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800 text-center">
          <div className="flex items-center justify-center gap-3 text-[11px] text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A36A]" />
              TLS 1.3
            </span>
            <span>•</span>
            <span>Anti-Brute Protected</span>
            <span>•</span>
            <span>15m Session Security</span>
          </div>
          <p className="mt-3 text-[10px] text-neutral-400 dark:text-neutral-500">
            © 2026 ECOBAZAR Enterprise Supermarket Management. Authorized personnel only.
          </p>
        </div>
      </div>
    </div>
  );
};
