'use client'

import { useState } from 'react'
import { 
  ArrowRight, 
  BatteryCharging, 
  Check, 
  ChevronDown, 
  Clock3, 
  Cpu, 
  Gauge, 
  Lightbulb, 
  Menu, 
  MoreHorizontal, 
  Pause, 
  Play, 
  Plus, 
  Sparkles, 
  TrendingDown, 
  Zap 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sidebar } from './ui/Sidebar'

export const devices = [
  { 
    name: 'Tesla Wall Connector', 
    type: 'Electric vehicle charger', 
    icon: Zap, 
    tone: 'blue', 
    status: 'Paused', 
    usage: '0.0 kW', 
    schedule: 'Charges after 23:00' 
  },
  { 
    name: 'Daikin Heat Pump', 
    type: 'Heating and cooling', 
    icon: Gauge, 
    tone: 'orange', 
    status: 'Running', 
    usage: '1.2 kW', 
    schedule: 'Throttled during peak tariff' 
  },
  { 
    name: 'Smart Water Heater', 
    type: 'Hot water reserve', 
    icon: BatteryCharging, 
    tone: 'purple', 
    status: 'Standby', 
    usage: '0.0 kW', 
    schedule: 'Ready for next low-price window' 
  },
]


function Shell({ 
  title, 
  eyebrow, 
  description, 
  children 
}: { 
  title: string; 
  eyebrow: string; 
  description: string; 
  children: React.ReactNode 
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dashboard-app">
      {/* Imported Sidebar Component */}
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      
      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
          
          <div className="breadcrumb">
            <span>Workspace</span>
            <span>/</span>
            <strong>{title}</strong>
          </div>
          
          <div className="topbar-actions">
            <div className="live-pill">
              <i /> Live data <span>Updated just now</span>
            </div>
            <div className="top-avatar">JD</div>
          </div>
        </header>
        
        <div className="content-inner">
          <section className="page-heading">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h1>{title}</h1>
              <p className="subheading">{description}</p>
            </div>
            <Button variant="outline" className="date-button">
              Today <ChevronDown />
            </Button>
          </section>
          
          {children}
        </div>
      </main>
    </div>
  )
}

function DeviceRow({ device }: { device: typeof devices[number] }) {
  const Icon = device.icon
  const [active, setActive] = useState(device.status === 'Running')
  
  return (
    <article className="workspace-row">
      <div className={`icon-tile icon-tile-${device.tone}`}>
        <Icon />
      </div>
      <div className="workspace-row-copy">
        <strong>{device.name}</strong>
        <span>{device.type}</span>
      </div>
      <div className="workspace-row-stat">
        <span className={`status status-${device.tone}`}> 
          <i /> {active ? 'Running' : device.status}
        </span>
        <strong>{device.usage}</strong>
      </div>
      <div className="workspace-row-detail">{device.schedule}</div>
      <button 
        className={`toggle ${active ? 'toggle-on' : ''}`} 
        onClick={() => setActive(!active)} 
        aria-label={`Toggle ${device.name}`}
      >
        <span />
      </button>
    </article>
  )
}


export function DevicesPage() { 
  return (
    <Shell 
      title="Devices" 
      eyebrow="Connected equipment" 
      description="Monitor every flexible load in your home and keep control in one place."
    >
      <div className="workspace-toolbar">
        <div>
          <strong>3 connected devices</strong>
          <span>Last synced a few seconds ago</span>
        </div>
        <Button>
          <Plus /> Add device
        </Button>
      </div>
      <section className="workspace-list">
        {devices.map(device => (
          <DeviceRow key={device.name} device={device} />
        ))}
      </section>
      <section className="workspace-callout">
        <Cpu />
        <div>
          <strong>Connect more of your home</strong>
          <span>Add compatible devices to unlock more flexible savings and smarter automation.</span>
        </div>
        <ArrowRight />
      </section>
    </Shell> 
  ) 
}

export function SchedulePage() { 
  const [smart, setSmart] = useState(true); 
  
  return (
    <Shell 
      title="Smart schedule" 
      eyebrow="Automatic energy shifting" 
      description="Set your preferences once. Gridwise finds the best time to run flexible devices."
    >
      <section className="schedule-hero">
        <div className="schedule-hero-copy">
          <div className="smart-icon">
            <Sparkles />
          </div>
          <div>
            <strong>Smart mode</strong>
            <p>
              {smart 
                ? 'Optimizing your home around cleaner, lower-cost energy.' 
                : 'Automation is paused. Your devices will follow their normal schedules.'}
            </p>
          </div>
        </div>
        <button 
          className={`toggle toggle-large ${smart ? 'toggle-on' : ''}`} 
          onClick={() => setSmart(!smart)} 
          aria-label="Toggle smart mode"
        >
          <span />
        </button>
      </section>
      <div className="schedule-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Today&apos;s plan</h2>
              <p className="panel-subtitle">Your automated energy windows</p>
            </div>
            <span className="status status-green">
              <i /> {smart ? 'Active' : 'Paused'}
            </span>
          </div>
          <div className="timeline">
            <div className="timeline-row">
              <span>23:00</span>
              <div>
                <strong>Charge Tesla Wall Connector</strong>
                <small>Lowest price window · estimated €0.42</small>
              </div>
              <span className="timeline-badge">Scheduled</span>
            </div>
            <div className="timeline-row">
              <span>02:00</span>
              <div>
                <strong>Heat water reserve</strong>
                <small>Clean energy window · 3.5 kWh planned</small>
              </div>
              <span className="timeline-badge">Scheduled</span>
            </div>
            <div className="timeline-row">
              <span>06:30</span>
              <div>
                <strong>Pre-heat home</strong>
                <small>Comfort target reached before breakfast</small>
              </div>
              <span className="timeline-badge timeline-badge-muted">Flexible</span>
            </div>
          </div>
        </section>
        <section className="panel preference-panel">
          <h2>Automation preferences</h2>
          <p className="panel-subtitle">These rules guide every schedule.</p>
          <label>
            <span>Prioritize savings</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label>
            <span>Prefer cleaner energy</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label>
            <span>Protect comfort automatically</span>
            <input type="checkbox" defaultChecked />
          </label>
        </section>
      </div>
    </Shell> 
  ) 
}

export function InsightsPage() { 
  return (
    <Shell 
      title="Insights" 
      eyebrow="Your energy intelligence" 
      description="Understand what is driving your bill and where Gridwise is making a difference."
    >
      <div className="insight-metrics">
        <article className="metric-card">
          <span className="metric-label">Savings this month</span>
          <div className="metric-value">
            €142<small>.50</small>
          </div>
          <span className="positive">
            <TrendingDown /> 28% vs. unmanaged
          </span>
        </article>
        <article className="metric-card">
          <span className="metric-label">Energy shifted</span>
          <div className="metric-value">
            38<small>.4 kWh</small>
          </div>
          <span className="positive">
            <ArrowRight /> Into lower-price windows
          </span>
        </article>
        <article className="metric-card">
          <span className="metric-label">Cleaner energy</span>
          <div className="metric-value">
            64<small>%</small>
          </div>
          <span className="positive">
            <Sparkles /> Better than last month
          </span>
        </article>
      </div>
      <div className="schedule-grid insights-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Where your savings came from</h2>
              <p className="panel-subtitle">October 1–14, 2026</p>
            </div>
          </div>
          <div className="insight-bars">
            <div>
              <span>Smart scheduling</span>
              <b style={{ width: '82%' }} />
              <strong>€86.20</strong>
            </div>
            <div>
              <span>Peak load reduction</span>
              <b style={{ width: '58%' }} />
              <strong>€39.80</strong>
            </div>
            <div>
              <span>Cleaner energy windows</span>
              <b style={{ width: '38%' }} />
              <strong>€16.50</strong>
            </div>
          </div>
        </section>
        <section className="panel">
          <div className="insight-card-icon">
            <Lightbulb />
          </div>
          <h2>A little shift goes a long way</h2>
          <p className="panel-subtitle">
            Your biggest opportunity is charging the car overnight. Gridwise has already shifted 11 sessions this month.
          </p>
          <Button variant="outline">
            View schedule <ArrowRight />
          </Button>
        </section>
      </div>
    </Shell> 
  ) 
}
