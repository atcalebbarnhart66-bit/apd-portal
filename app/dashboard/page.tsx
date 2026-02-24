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
    <div style={{ display:'flex', flexDirection:'column', gap:'2rem', maxWidth:'1200px' }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div>
          <p style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'0.7rem', letterSpacing:'0.3em', color:'#c8972a', marginBottom:'0.3rem' }}>COMMAND CENTER</p>
          <h1 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'2.2rem', fontWeight:700, color:'#e8eef7', letterSpacing:'0.02em' }}>
            Welcome back, {displayName}
          </h1>
          <p style={{ fontSize:'0.85rem', color:'#4a6080', marginTop:'0.25rem' }}>
            {new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
          </p>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.5rem 1rem', border:'1px solid rgba(200,151,42,0.4)', borderRadius:'2px', fontFamily:"'Rajdhani',sans-serif", fontSize:'0.8rem', letterSpacing:'0.15em', color:'#e8b84b' }}>
          <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#c8972a', display:'inline-block' }} />
          {role.toUpperCase()}
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }}>
        {[
          { label:'Active Incidents', value:'—', color:'#e07060' },
          { label:'Officers On Duty', value:'—', color:'#a8c5e8' },
          { label:'Reports Today',    value:'—', color:'#c8972a' },
          { label:'Open Cases',       value:'—', color:'#5a8f6a' },
        ].map((stat) => (
          <div key={stat.label} style={{ padding:'1.5rem', background:'rgba(26,37,64,0.6)', border:'1px solid rgba(168,197,232,0.12)', borderRadius:'3px' }}>
            <p style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'0.7rem', letterSpacing:'0.15em', color:'#4a6080', marginBottom:'0.75rem' }}>{stat.label}</p>
            <p style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'2.2rem', fontWeight:700, color:stat.color }}>{stat.value}</p>
            <p style={{ fontSize:'0.72rem', color:'#4a6080', marginTop:'0.25rem' }}>Live data — connect modules</p>
          </div>
        ))}
      </div>

      {isAdmin && (
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'1rem 1.5rem', background:'rgba(200,151,42,0.05)', border:'1px solid rgba(200,151,42,0.3)', borderRadius:'3px' }}>
          <span style={{ fontSize:'1.5rem' }}>⚡</span>
          <div>
            <p style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'0.75rem', letterSpacing:'0.2em', color:'#c8972a' }}>ADMIN ACCESS ACTIVE</p>
            <p style={{ fontSize:'0.85rem', color:'#8fa3be', marginTop:'0.2rem' }}>You have full administrative privileges. Use responsibly.</p>
          </div>
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1rem' }}>
        {['Incident Management','Personnel Records','Case Files','Reports & Analytics'].map((mod) => (
          <div key={mod} style={{ padding:'2rem', minHeight:'120px', background:'rgba(26,37,64,0.3)', border:'1px dashed rgba(168,197,232,0.12)', borderRadius:'3px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'0.5rem', opacity:0.5 }}>
            <p style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'0.65rem', letterSpacing:'0.22em', color:'#4a6080' }}>COMING SOON</p>
            <p style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'1.1rem', fontWeight:600, color:'#8fa3be' }}>{mod}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
