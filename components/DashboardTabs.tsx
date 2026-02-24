'use client'

import { useState } from 'react'

const TABS = [
  {
    id: 'vehicle-records',
    label: 'Vehicle Records',
    icon: '🚗',
    description: 'Store and manage department vehicle records including registration, maintenance history, and assignment logs.',
  },
  {
    id: 'vehicle-inspections',
    label: 'Vehicle Inspections',
    icon: '🔧',
    description: 'Log and track scheduled vehicle inspections, safety checks, and mechanical condition reports.',
  },
  {
    id: 'personnel-inspections',
    label: 'Personnel Inspections',
    icon: '👤',
    description: 'Record personnel readiness inspections, uniform compliance checks, and duty fitness assessments.',
  },
  {
    id: 'weapons-inspections',
    label: 'Weapons Inspections',
    icon: '🔫',
    description: 'Track weapons qualification records, inspection logs, and armory inventory for all assigned personnel.',
  },
]

export default function DashboardTabs() {
  const [active, setActive] = useState('vehicle-records')
  const tab = TABS.find(t => t.id === active)!

  return (
    <div style={{ background:'rgba(26,37,64,0.6)', border:'1px solid rgba(168,197,232,0.12)', borderRadius:'4px', overflow:'hidden' }}>

      {/* Tab headers */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderBottom:'1px solid rgba(168,197,232,0.12)' }}>
        {TABS.map((t) => {
          const isActive = active === t.id
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              style={{
                padding:'1rem 0.5rem',
                background: isActive ? 'rgba(30,58,95,0.8)' : 'transparent',
                border:'none',
                borderBottom: isActive ? '2px solid #c8972a' : '2px solid transparent',
                borderRight:'1px solid rgba(168,197,232,0.08)',
                color: isActive ? '#e8eef7' : '#4a6080',
                fontFamily:"'Rajdhani',sans-serif",
                fontSize:'0.7rem',
                fontWeight: isActive ? 700 : 500,
                letterSpacing:'0.06em',
                cursor:'pointer',
                transition:'all 0.15s',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                gap:'0.4rem',
                lineHeight:1.3,
                textAlign:'center',
              }}
            >
              <span style={{ fontSize:'1.2rem' }}>{t.icon}</span>
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Coming soon panel */}
      <div style={{ padding:'3rem 2rem', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'360px', textAlign:'center', gap:'1.25rem' }}>

        {/* Icon circle */}
        <div style={{
          width:'72px', height:'72px', borderRadius:'50%',
          background:'rgba(30,58,95,0.5)',
          border:'1px solid rgba(168,197,232,0.15)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'2rem',
        }}>
          {tab.icon}
        </div>

        {/* Coming soon label */}
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.3rem 1rem', background:'rgba(200,151,42,0.08)', border:'1px solid rgba(200,151,42,0.2)', borderRadius:'20px' }}>
          <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#c8972a', display:'inline-block' }} />
          <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'0.65rem', letterSpacing:'0.25em', color:'#c8972a' }}>COMING SOON</span>
        </div>

        <div>
          <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'1.75rem', fontWeight:700, color:'#e8eef7', letterSpacing:'0.03em', marginBottom:'0.75rem' }}>
            {tab.label}
          </h2>
          <p style={{ fontSize:'0.9rem', color:'#4a6080', maxWidth:'380px', lineHeight:1.7 }}>
            {tab.description}
          </p>
        </div>

        {/* Placeholder progress bar */}
        <div style={{ width:'100%', maxWidth:'300px', marginTop:'0.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.4rem' }}>
            <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'0.62rem', letterSpacing:'0.15em', color:'#4a6080' }}>MODULE PROGRESS</span>
            <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'0.62rem', color:'#4a6080' }}>IN DEVELOPMENT</span>
          </div>
          <div style={{ height:'3px', background:'rgba(168,197,232,0.08)', borderRadius:'2px', overflow:'hidden' }}>
            <div style={{ height:'100%', width:'15%', background:'linear-gradient(90deg,#1e3a5f,#c8972a)', borderRadius:'2px' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
