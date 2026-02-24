'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import APDBadge from '@/components/APDBadge'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="login-root">
      {/* Background grid */}
      <div className="bg-grid" aria-hidden="true" />

      {/* Left panel - Branding */}
      <div className="brand-panel animate-fade-up">
        <div className="brand-inner">
          <div className="shield-container animate-fade-up-delay-1">
            <APDBadge />
          </div>

          <div className="brand-text animate-fade-up-delay-2">
            <p className="dept-label">CITY OF ABILENE</p>
            <h1 className="dept-name">
              <span>ABILENE</span>
              <span className="badge-shimmer">POLICE</span>
              <span>DEPARTMENT</span>
            </h1>
            <div className="divider" />
            <p className="portal-subtitle">ADMINISTRATION PORTAL</p>
          </div>

          <div className="info-strip animate-fade-up-delay-3">
            <span className="status-dot" />
            <span>AUTHORIZED PERSONNEL ONLY</span>
          </div>
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="form-panel animate-fade-up-delay-2">
        <div className="glass-panel-bright form-card">
          <div className="form-header">
            <p className="form-eyebrow">SECURE ACCESS</p>
            <h2 className="form-title">Officer Sign In</h2>
            <p className="form-desc">
              Use your department credentials to access the administration portal.
            </p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="field-group">
              <label htmlFor="email" className="field-label">
                DEPARTMENT EMAIL
              </label>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 20 20" fill="none">
                  <path d="M2.5 5.5A1.5 1.5 0 014 4h12a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0116 16H4a1.5 1.5 0 01-1.5-1.5v-9z" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M2.5 6l7.5 5 7.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="badge@abilenepolice.gov"
                  required
                  autoComplete="username"
                  className="apd-input"
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="password" className="field-label">
                PASSWORD
              </label>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 20 20" fill="none">
                  <rect x="4" y="8.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M7 8.5V6a3 3 0 016 0v2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <circle cx="10" cy="13" r="1.2" fill="currentColor"/>
                </svg>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  className="apd-input"
                />
              </div>
            </div>

            {error && (
              <div className="error-banner" role="alert">
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16A8 8 0 0010 2zm-.75 4.5a.75.75 0 011.5 0v4a.75.75 0 01-1.5 0v-4zm.75 7a.875.875 0 110-1.75.875.875 0 010 1.75z" clipRule="evenodd"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner" />
                  AUTHENTICATING...
                </span>
              ) : (
                <span className="btn-content">
                  <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                    <path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  ACCESS PORTAL
                </span>
              )}
            </button>
          </form>

          <div className="form-footer">
            <p>Having access issues? Contact your department IT administrator.</p>
          </div>
        </div>

        <p className="legal-notice">
          This system is for authorized use only. All activity is monitored and logged.
          Unauthorized access is a violation of APD policy and applicable law.
        </p>
      </div>

      <style jsx>{`
        .login-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 900px) {
          .login-root { grid-template-columns: 1fr; }
          .brand-panel { display: none; }
        }

        /* Background */
        .bg-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(168,197,232,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,197,232,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          z-index: 0;
        }

        /* Brand Panel */
        .brand-panel {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            rgba(10, 15, 30, 0.98) 0%,
            rgba(17, 24, 39, 0.95) 50%,
            rgba(30, 58, 95, 0.3) 100%
          );
          border-right: 1px solid var(--border);
          padding: 3rem;
        }

        .brand-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
          max-width: 420px;
        }

        .shield-container {
          position: relative;
          filter: drop-shadow(0 0 40px rgba(200, 151, 42, 0.2));
        }

        .dept-label {
          font-family: var(--font-display), 'Rajdhani', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          color: var(--text-muted);
          text-align: center;
        }

        .dept-name {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: var(--font-display), 'Rajdhani', sans-serif;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          text-align: center;
        }

        .divider {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--badge-gold), transparent);
          margin: 0.5rem auto;
        }

        .portal-subtitle {
          font-family: var(--font-display), 'Rajdhani', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.35em;
          color: var(--text-secondary);
          text-align: center;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .info-strip {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 1.2rem;
          border: 1px solid rgba(200, 151, 42, 0.25);
          border-radius: 2px;
          font-family: var(--font-display), 'Rajdhani', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          color: var(--badge-gold);
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--badge-gold);
          animation: pulse-gold 2s ease-in-out infinite;
        }

        /* Form Panel */
        .form-panel {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
          gap: 1.5rem;
        }

        .form-card {
          width: 100%;
          max-width: 440px;
          border-radius: 4px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          box-shadow: 0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px var(--border);
        }

        .form-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-eyebrow {
          font-family: var(--font-display), 'Rajdhani', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          color: var(--badge-gold);
        }

        .form-title {
          font-family: var(--font-display), 'Rajdhani', sans-serif;
          font-size: 1.9rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.02em;
        }

        .form-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .field-label {
          font-family: var(--font-display), 'Rajdhani', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          color: var(--text-muted);
        }

        .input-wrap {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 0.875rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          width: 16px;
          height: 16px;
          pointer-events: none;
        }

        .apd-input {
          width: 100%;
          background: rgba(10, 15, 30, 0.8);
          border: 1px solid var(--border-bright);
          border-radius: 3px;
          padding: 0.75rem 0.875rem 0.75rem 2.6rem;
          color: var(--text-primary);
          font-family: var(--font-body), 'Roboto Condensed', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.02em;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }

        .apd-input::placeholder {
          color: var(--text-muted);
        }

        .apd-input:hover {
          border-color: rgba(168, 197, 232, 0.35);
        }

        .apd-input:focus {
          border-color: var(--badge-gold);
          box-shadow: 0 0 0 3px rgba(200, 151, 42, 0.12);
        }

        .error-banner {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1rem;
          background: rgba(192, 57, 43, 0.12);
          border: 1px solid rgba(192, 57, 43, 0.3);
          border-radius: 3px;
          color: #e07060;
          font-size: 0.85rem;
        }

        .submit-btn {
          margin-top: 0.25rem;
          width: 100%;
          padding: 0.875rem;
          background: linear-gradient(135deg, #1e3a5f 0%, #0a1628 100%);
          border: 1px solid var(--badge-gold);
          border-radius: 3px;
          color: var(--badge-gold-light);
          font-family: var(--font-display), 'Rajdhani', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(200,151,42,0.15) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .submit-btn:hover::before { opacity: 1; }

        .submit-btn:hover {
          box-shadow: 0 0 20px rgba(200, 151, 42, 0.25);
          transform: translateY(-1px);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .btn-content, .btn-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
        }

        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(200,151,42,0.3);
          border-top-color: var(--badge-gold);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .form-footer {
          padding-top: 1rem;
          border-top: 1px solid var(--border);
          text-align: center;
        }

        .form-footer p {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .legal-notice {
          max-width: 440px;
          text-align: center;
          font-size: 0.7rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
      `}</style>
    </div>
  )
}
