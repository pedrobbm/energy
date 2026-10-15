'use client'

// 1. Import Link from next/link
import Link from 'next/link'
import {
  Bolt,
  ChevronDown,
  CircleHelp,
  LayoutDashboard,
  MoreHorizontal,
  PlugZap,
  Settings,
  SlidersHorizontal,
  Sparkles,
  TrendingDown,
  X,
} from 'lucide-react'

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-mark">
          <Bolt />
        </div>
        <div>
          <strong>gridwise</strong>
          <span>ENERGY OS</span>
        </div>
        <button className="mobile-close" onClick={onClose} aria-label="Close menu">
          <X />
        </button>
      </div>
      
      <div className="workspace-switcher">
        <div className="workspace-avatar">M</div>
        <div>
          <span>My household</span>
          <strong>Home 01</strong>
        </div>
        <ChevronDown />
      </div>
      
      <nav className="sidebar-nav" aria-label="Primary navigation">
        <p className="nav-label">Workspace</p>
        
        {/* 2. Change <a> to <Link> and update the href paths */}
        <Link className="nav-item" href="/">
          <LayoutDashboard /> Overview
        </Link>
        <Link className="nav-item" href="/devices">
          <PlugZap /> Devices <span className="nav-count">3</span>
        </Link>
        <Link className="nav-item" href="/schedule">
          <SlidersHorizontal /> Smart schedule
        </Link>
        <Link className="nav-item" href="/insights">
          <TrendingDown /> Insights
        </Link>
        
        <p className="nav-label nav-label-spaced">Manage</p>
        <Link className="nav-item" href="/settings">
          <Settings /> Settings
        </Link>
        <Link className="nav-item" href="/help">
          <CircleHelp /> Help center
        </Link>
      </nav>
      
      <div className="sidebar-bottom">
        <div className="support-card">
          <Sparkles />
          <div>
            <strong>Smart mode is on</strong>
            <span>Saving you money automatically.</span>
          </div>
        </div>
        <div className="user-row">
          <div className="user-avatar">JD</div>
          <div>
            <strong>Jordan Davis</strong>
            <span>Home owner</span>
          </div>
          <MoreHorizontal />
        </div>
      </div>
    </aside>
  )
}
