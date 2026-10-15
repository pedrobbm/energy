'use client'

import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  BatteryCharging,
  Bell,
  CarFront,
  ChevronDown,
  Gauge,
  Menu,
  Sparkles,
  Thermometer,
  TrendingDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// Import the Sidebar and devices
import { Sidebar } from './ui/Sidebar'
import { devices } from './devices-page'

type Device = {
  name: string
  detail: string
  icon: typeof CarFront
  color: string
  status: string
  power: string
  active: boolean
}

const bars = [22, 18, 28, 24, 34, 30, 42, 37, 48, 44, 58, 51, 46, 55, 67, 62, 72, 57, 49, 42, 35, 30, 25, 20]
const prices = [24, 22, 21, 23, 25, 28, 34, 40, 42, 38, 34, 31, 29, 33, 38, 48, 60, 57, 50, 44, 37, 32, 28, 26]

function IconTile({ children, tone = 'green' }: { children: React.ReactNode; tone?: string }) {
  return (
    <div className={`icon-tile icon-tile-${tone}`}>
      {children}
    </div>
  )
}

function EnergyChart() {
  return (
    <div className="chart-wrap" aria-label="Energy use and hourly tariff chart">
      <div className="chart-legend">
        <span>
          <i className="legend-dot use" /> Your usage
        </span>
        <span>
          <i className="legend-dot price" /> Energy price
        </span>
        <span className="chart-note">
          <span className="current-line" /> Now
        </span>
      </div>
      
      <div className="chart-grid">
        <div className="chart-y-labels">
          <span>€0.50</span>
          <span>€0.35</span>
          <span>€0.20</span>
          <span>€0.05</span>
        </div>
        <div className="chart-area">
          <div className="now-line" />
          <div className="chart-bars">
            {bars.map((height, i) => (
              <div className="bar-column" key={i}>
                <div className="usage-bar" style={{ height: `${height}%` }} />
                <div className="price-line" style={{ height: `${prices[i]}%` }} />
              </div>
            ))}
          </div>
          <div className="chart-x-labels">
            {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'].map(label => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DeviceCard({ device, onToggle }: { device: Device; onToggle: () => void }) {
  const Icon = device.icon
  
  return (
    <article className="device-card">
      <div className="device-heading">
        <IconTile tone={device.color}>
          <Icon />
        </IconTile>
        <div className="device-copy">
          <strong>{device.name}</strong>
          <span>{device.detail}</span>
        </div>
        <button 
          className={`toggle ${device.active ? 'toggle-on' : ''}`} 
          onClick={onToggle} 
          aria-label={`Toggle ${device.name}`}
        >
          <span />
        </button>
      </div>
      <div className="device-footer">
        <span className={`status status-${device.color}`}>
          <i />
          {device.status}
        </span>
        <strong>{device.power}</strong>
      </div>
    </article>
  )
}

export default function DashboardShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [smartMode, setSmartMode] = useState(true);
  const [activeDevices, setActiveDevices] = useState([false, true, false]);

  return (
    <div className="dashboard-app" id="overview">
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
            <strong>Overview</strong>
          </div>
          
          <div className="topbar-actions">
            <div className="live-pill">
              <i /> Live data <span>Updated just now</span>
            </div>
            <button className="icon-button" aria-label="Notifications">
              <Bell />
              <i />
            </button>
            <div className="top-avatar">JD</div>
          </div>
        </header>

        <div className="content-inner">
          <section className="page-heading">
            <div>
              <p className="eyebrow">Tuesday, October 14, 2026</p>
              <h1>
                Good morning, Jordan <span>✦</span>
              </h1>
              <p className="subheading">
                Here&apos;s how your home is using energy today.
              </p>
            </div>
            <Button variant="outline" className="date-button">
              <span>Today</span>
              <ChevronDown />
            </Button>
          </section>

          <section className="metric-grid" aria-label="Energy summary">
            <article className="metric-card metric-primary">
              <div className="metric-top">
                <span>Current power draw</span>
                <IconTile tone="lime">
                  <Gauge />
                </IconTile>
              </div>
              <div className="metric-value">
                1.2 <small>kW</small>
              </div>
              <div className="metric-meta">
                <span className="positive">
                  <ArrowDownRight /> 18% vs. average
                </span>
                <span>Limit 6.9 kW</span>
              </div>
              <div className="capacity-track">
                <span style={{ width: '18%' }} />
              </div>
              <div className="capacity-label">
                <span>Using 18% of capacity</span>
                <span>5.7 kW available</span>
              </div>
            </article>

            <article className="metric-card">
              <div className="metric-top">
                <span>Saved this month</span>
                <IconTile tone="yellow">
                  <TrendingDown />
                </IconTile>
              </div>
              <div className="metric-value">
                €142<small>.50</small>
              </div>
              <div className="metric-meta">
                <span className="positive">
                  <ArrowUpRight /> 28% vs. unmanaged
                </span>
                <span>€5.10 today</span>
              </div>
              <div className="mini-bars">
                {[28, 39, 34, 52, 46, 67, 57, 78, 61, 88, 74, 96].map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
            </article>

            <article className="metric-card">
              <div className="metric-top">
                <span>Energy shifted</span>
                <IconTile tone="purple">
                  <BatteryCharging />
                </IconTile>
              </div>
              <div className="metric-value">
                315 <small>kWh</small>
              </div>
              <div className="metric-meta">
                <span className="positive">
                  <ArrowUpRight /> 12% this month
                </span>
                <span>Peak hours avoided</span>
              </div>
              <div className="shift-progress">
                <span style={{ width: '72%' }} />
              </div>
              <div className="capacity-label">
                <span>Monthly goal</span>
                <span>72%</span>
              </div>
            </article>
          </section>

          <section className="main-grid">
            <div className="primary-column">
              <article className="panel chart-panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Today&apos;s overview</p>
                    <h2>Consumption &amp; tariff</h2>
                  </div>
                  <div className="chart-actions">
                    <Button variant="secondary" size="sm">
                      24 hours
                    </Button>
                    <Button variant="ghost" size="sm">
                      7 days
                    </Button>
                  </div>
                </div>
                <EnergyChart />
              </article>

              <article className="panel interventions-panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Working for you</p>
                    <h2>Active interventions</h2>
                  </div>
                  <a href="#insights" className="text-link">
                    View insights <ArrowUpRight />
                  </a>
                </div>
                <div className="intervention-list">
                  <div className="intervention">
                    <IconTile tone="blue">
                      <CarFront />
                    </IconTile>
                    <div>
                      <strong>EV charging paused</strong>
                      <span>Waiting for off-peak tariff at 00:00</span>
                    </div>
                    <b>~€2.10/day</b>
                    <span className="active-badge">Active</span>
                  </div>
                  <div className="intervention">
                    <IconTile tone="orange">
                      <Thermometer />
                    </IconTile>
                    <div>
                      <strong>HVAC thermal coasting</strong>
                      <span>
                        Compressor throttled to 20% to avoid a demand spike
                      </span>
                    </div>
                    <b>~€1.45/day</b>
                    <span className="active-badge">Active</span>
                  </div>
                </div>
              </article>
            </div>

            <aside className="devices-column" id="devices">
              <div className="devices-heading">
                <div>
                  <p className="eyebrow">Connected devices</p>
                  <h2>Device status</h2>
                </div>
                <a href="#devices" className="text-link">
                  Manage <ArrowUpRight />
                </a>
              </div>
              
              <div className="device-list">
                {devices.map((device: any, i: number) => (
                  <DeviceCard
                    key={device.name}
                    device={{ ...device, active: activeDevices[i] }}
                    onToggle={() =>
                      setActiveDevices((current) =>
                        current.map((value, index) =>
                          index === i ? !value : value
                        )
                      )
                    }
                  />
                ))}
              </div>

              <div className="smart-mode">
                <div className="smart-mode-copy">
                  <div className="smart-icon">
                    <Sparkles />
                  </div>
                  <div>
                    <strong>Smart mode</strong>
                    <span>Automatically optimize your home</span>
                  </div>
                </div>
                <button
                  className={`toggle ${smartMode ? 'toggle-on' : ''}`}
                  onClick={() => setSmartMode(!smartMode)}
                  aria-label="Toggle smart mode"
                >
                  <span />
                </button>
              </div>

              <div className="tariff-card">
                <div className="tariff-top">
                  <div>
                    <span>Current tariff</span>
                    <strong>Peak hour</strong>
                  </div>
                  <span className="tariff-live">
                    <i /> Live
                  </span>
                </div>
                <div className="tariff-price">
                  <strong>€0.40</strong>
                  <span>/ kWh</span>
                  <small>High demand period</small>
                </div>
                <div className="tariff-footer">
                  <span>Off-peak starts in</span>
                  <strong>3h 42m</strong>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}

export { EnergyChart, DeviceCard }
