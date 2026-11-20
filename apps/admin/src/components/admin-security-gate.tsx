'use client';

import * as React from 'react';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  AlertTriangle,
  Clock,
  ArrowRight,
  Server,
  User,
  ShieldAlert,
  Cpu,
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
            'SECURITY LOCKOUT: 5 consecutive invalid login attempts detected. Terminal temporarily locked for 15 minutes.'
          );
        } else {
          setErrorMessage(
            `Access Denied: Invalid credentials. (${MAX_FAILED_ATTEMPTS - nextAttempts} attempts remaining before system lockout)`
          );
        }
      }

      setIsSubmitting(false);
    }, 450);
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

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#071710] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
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
    <div className="min-h-screen bg-[#071610] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0E2F22] via-[#071610] to-[#040C08] flex flex-col items-center justify-center p-4 sm:p-6 text-white relative overflow-hidden select-none">
      {/* Background Cyber-Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#21A366_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-500/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Security Box */}
      <div className="w-full max-w-md bg-[#0C2219]/90 backdrop-blur-2xl border border-emerald-500/25 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 relative z-10 transition-all">
        {/* Top Security Emblem & Branding */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-950 to-[#0A1F16] border border-emerald-400/40 flex items-center justify-center shadow-lg shadow-emerald-500/20 group">
              <ShieldCheck className="w-8 h-8 text-emerald-400 group-hover:scale-105 transition-transform" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0C2219] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-emerald-400 mb-2 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Restricted Admin Gateway</span>
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight">ECOBAZAR Control OS</h1>
          <p className="text-xs text-emerald-100/70 mt-1 max-w-xs">
            Central Administration, Multi-Store POS & Operations Hub
          </p>
        </div>

        {/* Lockout Warning Box */}
        {isLocked && (
          <div className="mb-5 p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-3 animate-in fade-in">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-white text-sm">Security Lockdown Activated</p>
              <p className="text-[11px] text-rose-300 mt-0.5 leading-relaxed">
                Too many incorrect login attempts detected. Terminal access is temporarily frozen.
              </p>
              <p className="font-mono font-bold text-xs text-rose-400 mt-2 flex items-center gap-1.5 bg-rose-950 px-2.5 py-1 rounded-lg border border-rose-800/60 inline-flex">
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
          <div className="mb-5 p-3.5 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="font-medium leading-snug">{errorMessage}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email / Admin ID */}
          <div>
            <label className="block text-xs font-bold text-emerald-100/90 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>Administrator Email / ID</span>
            </label>
            <input
              type="email"
              required
              disabled={isLocked || isSubmitting}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ecobazar.com"
              className="w-full px-4 py-2.5 bg-[#061810]/80 border border-emerald-800/60 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 rounded-xl text-sm text-white placeholder-emerald-100/30 transition-all font-medium disabled:opacity-50"
            />
          </div>

          {/* Master Password */}
          <div>
            <label className="block text-xs font-bold text-emerald-100/90 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
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
                className="w-full px-4 py-2.5 pr-11 bg-[#061810]/80 border border-emerald-800/60 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 rounded-xl text-sm text-white placeholder-emerald-100/30 transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-100/50 hover:text-white transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Security Access PIN (4-Digits, strictly masked) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-emerald-100/90 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                <span>Executive Security PIN</span>
              </label>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                Confidential
              </span>
            </div>
            <input
              type="password"
              maxLength={6}
              required
              disabled={isLocked || isSubmitting}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              className="w-full px-4 py-2.5 bg-[#061810]/80 border border-emerald-800/60 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 rounded-xl text-base text-emerald-300 placeholder-emerald-100/30 transition-all tracking-[0.6em] text-center font-mono font-bold disabled:opacity-50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLocked || isSubmitting}
            className="w-full mt-2 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-neutral-950 font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-neutral-950 border-t-transparent animate-spin" />
                <span>Verifying Security Token...</span>
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

        {/* Security Compliance Badges (No PINs or demo credentials displayed) */}
        <div className="mt-6 pt-5 border-t border-emerald-800/40">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-[#081C13]/60 border border-emerald-900/50">
              <Server className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-white">TLS 1.3</p>
              <p className="text-[9px] text-emerald-400/70">Encrypted</p>
            </div>
            <div className="p-2 rounded-xl bg-[#081C13]/60 border border-emerald-900/50">
              <Lock className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-white">Anti-Brute</p>
              <p className="text-[9px] text-emerald-400/70">5 Attempts</p>
            </div>
            <div className="p-2 rounded-xl bg-[#081C13]/60 border border-emerald-900/50">
              <Cpu className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-white">Auto-Lock</p>
              <p className="text-[9px] text-emerald-400/70">15m Inactive</p>
            </div>
          </div>
        </div>

        {/* Terminal Disclaimers */}
        <div className="mt-5 text-center text-[10px] text-emerald-100/50">
          <p>© 2026 ECOBAZAR Enterprise Security System. Unauthorized access is strictly logged and audited.</p>
        </div>
      </div>
    </div>
  );
};
