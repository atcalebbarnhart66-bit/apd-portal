import { createServerSupabaseClient } from '@/lib/supabase-server'

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Officer'
  const role = profile?.role || 'officer'
  const isAdmin = role === 'admin'

  return (
    <div className="dashboard-page">
      <div className="page-header animate-fade-up">
        <div>
          <p className="page-eyebrow">COMMAND CENTER</p>
          <h1 className="page-title">Welcome back, {displayName}</h1>
          <p className="page-sub">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            })}
          </p>
        </div>
        <div className="role-badge" data-admin={String(isAdmin)}>
          <span className="role-indicator" />
          <span>{role.toUpperCase()}</span>
        </div>
      </div>

      <div className="stats-row animate-fade-up-delay-1">
        {[
          { label: 'Active Incidents', value: '—', icon: '⚠', color: '#e07060' },
          { label: 'Officers On Duty', value: '—', icon: '👮', color: '#a8c5e8' },
          { label: 'Reports Today',    value: '—', icon: '📋', color: '#c8972a' },
          { label: 'Open Cases',       value: '—', icon: '🔍', color: '#5a8f6a' },
        ].map((stat) => (
          <div key={stat.label} className="stat-card glass-panel">
            <div className="stat-header">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-icon">{stat.icon}</span>
            </div>
            <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
            <div className="stat-note">Live data — connect modules</div>
          </div>
        ))}
      </div>

      {isAdmin && (
        <div className="admin-notice glass-panel animate-fade-up-delay-2">
          <div className="admin-notice-icon">⚡</div>
          <div>
            <p className="admin-notice-title">ADMIN ACCESS ACTIVE</p>
            <p className="admin-notice-desc">You have full administrative privileges. Use responsibly.</p>
          </div>
        </div>
      )}

      <div className="placeholder-modules animate-fade-up-delay-3">
        {['Incident Management', 'Personnel Records', 'Case Files', 'Reports & Analytics'].map((mod) => (
          <div key={mod} className="module-placeholder glass-panel">
            <div className="module-soon">COMING SOON</div>
            <p className="module-name">{mod}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .dashboard-page { display:flex; flex-direction:column; gap:2rem; max-width:1200px; }
        .page-header { display:flex; align-items:flex-start; justify-content:space-between; }
        .page-eyebrow { font-family:var(--font-display),'Rajdhani',sans-serif; font-size:0.7rem; letter-spacing:0.3em; color:var(--badge-gold); margin-bottom:0.3rem; }
        .page-title { font-family:var(--font-display),'Rajdhani',sans-serif; font-size:2.2rem; font-weight:700; color:var(--text-primary); letter-spacing:0.02em; }
        .page-sub { font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem; }
        .role-badge { display:flex; align-items:center; gap:0.5rem; padding:0.5rem 1rem; border:1px solid rgba(200,151,42,0.4); border-radius:2px; font-family:var(--font-display),'Rajdhani',sans-serif; font-size:0.8rem; letter-spacing:0.15em; color:var(--badge-gold-light); }
        .role-indicator { width:6px; height:6px; border-radius:50%; background:var(--badge-gold); animation:pulse-gold 2s ease-in-out infinite; }
        .stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; }
        .stat-card { padding:1.5rem; border-radius:3px; }
        .stat-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; }
        .stat-label { font-family:var(--font-display),'Rajdhani',sans-serif; font-size:0.7rem; letter-spacing:0.15em; color:var(--text-muted); }
        .stat-icon { font-size:1.1rem; }
        .stat-value { font-family:var(--font-display),'Rajdhani',sans-serif; font-size:2.2rem; font-weight:700; }
        .stat-note { font-size:0.72rem; color:var(--text-muted); margin-top:0.25rem; }
        .admin-notice { display:flex; align-items:center; gap:1rem; padding:1rem 1.5rem; border-radius:3px; border-color:rgba(200,151,42,0.3)!important; background:rgba(200,151,42,0.05)!important; }
        .admin-notice-icon { font-size:1.5rem; }
        .admin-notice-title { font-family:var(--font-display),'Rajdhani',sans-serif; font-size:0.75rem; letter-spacing:0.2em; color:var(--badge-gold); }
        .admin-notice-desc { font-size:0.85rem; color:var(--text-secondary); margin-top:0.2rem; }
        .placeholder-modules { display:grid; grid-template-columns:repeat(2,1fr); gap:1rem; }
        .module-placeholder { padding:2rem; border-radius:3px; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:120px; border-style:dashed!important; opacity:0.5; transition:opacity 0.2s; }
        .module-placeholder:hover { opacity:0.8; }
        .module-soon { font-family:var(--font-display),'Rajdhani',sans-serif; font-size:0.65rem; letter-spacing:0.22em; color:var(--text-muted); }
        .module-name { font-family:var(--font-display),'Rajdhani',sans-serif; font-size:1.1rem; font-weight:600; color:var(--text-secondary); }
      `}</style>
    </div>
  )
}
