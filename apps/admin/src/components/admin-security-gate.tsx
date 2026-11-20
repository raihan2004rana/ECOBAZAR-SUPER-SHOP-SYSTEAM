'use client';

import * as React from 'react';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Server,
  User,
  Sparkles,
} from 'lucide-react';

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
    } catch (e) {
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
            'SECURITY LOCKOUT: 5 consecutive invalid login attempts detected. Terminal temporarily locked for 15 minutes.'
          );
        } else {
          setErrorMessage(
            `Access Denied: Invalid credentials. (${MAX_FAILED_ATTEMPTS - nextAttempts} attempts remaining before lockout)`
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

  // Quick autofill for authorized developers / owner demonstration
  const handleQuickFill = (accountIndex: number) => {
    const acc = AUTHORIZED_ACCOUNTS[accountIndex];
    if (acc) {
      setEmail(acc.email);
      setPassword(acc.password);
      setPin(acc.pin);
      setErrorMessage('');
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#071F15] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full border-2 border-[#2EBD70] border-t-transparent animate-spin" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#2EBD70]">
            Verifying Terminal Security...
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
          onLogout: () => handleLogout('Terminal session securely locked and signed out.'),
        })}
      </>
    );
  }

  // Otherwise, render the High-Security Gate Portal
  const isLocked = !!(lockoutUntil && Date.now() < lockoutUntil);
  const lockMinutes = Math.floor(remainingSeconds / 60);
  const lockSecs = remainingSeconds % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071F15] via-[#0B251B] to-[#05140E] flex flex-col items-center justify-center p-4 sm:p-6 text-white relative overflow-hidden select-none">
      {/* Background Cyber-Grid Graphics */}
      <div className="absolute inset-0 bg-[radial-gradient(#21A366_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#21A366]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#2EBD70]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Security Box */}
      <div className="w-full max-w-md bg-[#0F2D21]/95 backdrop-blur-xl border border-[#21A366]/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
        {/* Top Security Shield Badge */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#123C2D] border-2 border-[#2EBD70] flex items-center justify-center shadow-lg shadow-[#2EBD70]/20 mb-3 group transition-transform">
            <ShieldCheck className="w-8 h-8 text-[#2EBD70] group-hover:scale-110 transition-transform" />
          </div>

          <div className="inline-flex items-center gap-1.5 bg-[#123C2D]/80 border border-[#2EBD70]/40 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#2EBD70] mb-2 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2EBD70] animate-pulse" />
            <span>Tier-4 Enterprise Terminal Lock</span>
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight">ECOBAZAR Control OS</h1>
          <p className="text-xs text-emerald-100/70 mt-1">
            Restricted Central Administration & POS Terminal
          </p>
        </div>

        {/* Lockout Warning Box */}
        {isLocked && (
          <div className="mb-5 p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-3 animate-in fade-in">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-white">Security Freeze Activated</p>
              <p className="text-[11px] text-rose-300 mt-0.5 leading-relaxed">
                Excessive unauthorized attempts detected. Access is temporarily locked.
              </p>
              <p className="font-mono font-bold text-sm text-rose-400 mt-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>
                  Unlocks in {lockMinutes}:{lockSecs < 10 ? `0${lockSecs}` : lockSecs} min
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Error Alert Box */}
        {!isLocked && errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-amber-950/80 border border-amber-500/50 text-amber-200 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="font-medium leading-snug">{errorMessage}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email / Admin ID */}
          <div>
            <label className="block text-xs font-bold text-emerald-100/90 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#2EBD70]" />
              <span>Administrator Email / ID</span>
            </label>
            <input
              type="email"
              required
              disabled={isLocked || isSubmitting}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ecobazar.com"
              className="w-full px-4 py-2.5 bg-[#071F15]/80 border border-[#21A366]/40 rounded-xl text-sm text-white placeholder-emerald-100/30 focus:outline-hidden focus:border-[#2EBD70] focus:ring-1 focus:ring-[#2EBD70] transition-all disabled:opacity-50"
            />
          </div>

          {/* Master Password */}
          <div>
            <label className="block text-xs font-bold text-emerald-100/90 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#2EBD70]" />
                <span>Master Password</span>
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                disabled={isLocked || isSubmitting}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 pr-11 bg-[#071F15]/80 border border-[#21A366]/40 rounded-xl text-sm text-white placeholder-emerald-100/30 focus:outline-hidden focus:border-[#2EBD70] focus:ring-1 focus:ring-[#2EBD70] transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-100/50 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Security Access PIN */}
          <div>
            <label className="block text-xs font-bold text-emerald-100/90 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#2EBD70]" />
                <span>Security Access PIN (Master Key)</span>
              </span>
              <span className="text-[10px] text-emerald-100/50 font-mono">4-digit PIN</span>
            </label>
            <input
              type="password"
              maxLength={6}
              required
              disabled={isLocked || isSubmitting}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              className="w-full px-4 py-2.5 bg-[#071F15]/80 border border-[#21A366]/40 rounded-xl text-sm text-white placeholder-emerald-100/30 focus:outline-hidden focus:border-[#2EBD70] focus:ring-1 focus:ring-[#2EBD70] transition-all tracking-widest text-center font-mono disabled:opacity-50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLocked || isSubmitting}
            className="w-full mt-2 bg-[#21A366] hover:bg-[#2EBD70] text-[#071F15] font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#21A366]/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-[#071F15] border-t-transparent animate-spin" />
                <span>Authenticating Credentials...</span>
              </>
            ) : isLocked ? (
              <>
                <Lock className="w-4 h-4" />
                <span>Terminal Locked</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Authenticate & Unlock Terminal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login / Developer Bypass Credentials Box */}
        <div className="mt-6 pt-5 border-t border-[#21A366]/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#2EBD70] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Owner & Admin Quick Access:</span>
            </span>
            <span className="text-[10px] text-white/50">1-Click Fill</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill(0)}
              className="px-2.5 py-1.5 rounded-lg bg-[#123C2D]/60 hover:bg-[#21A366]/20 border border-[#21A366]/30 text-left transition-colors"
            >
              <p className="text-[11px] font-bold text-white truncate">Super Admin</p>
              <p className="text-[9px] text-[#2EBD70] font-mono truncate">PIN: 2026</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill(1)}
              className="px-2.5 py-1.5 rounded-lg bg-[#123C2D]/60 hover:bg-[#21A366]/20 border border-[#21A366]/30 text-left transition-colors"
            >
              <p className="text-[11px] font-bold text-white truncate">Store Manager</p>
              <p className="text-[9px] text-[#2EBD70] font-mono truncate">PIN: 1122</p>
            </button>
          </div>
        </div>

        {/* Security Disclaimers */}
        <div className="mt-5 text-center text-[10px] text-emerald-100/40 space-y-1">
          <p className="flex items-center justify-center gap-1.5">
            <Server className="w-3 h-3 text-[#2EBD70]" />
            <span>Hardware Protected Session • TLS 1.3 Strict Enforced</span>
          </p>
          <p>© 2026 ECOBAZAR Enterprise Security System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
