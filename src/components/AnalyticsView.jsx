import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Layers,
  Calendar,
  History,
  ShieldAlert,
  Info
} from 'lucide-react';
import { ANALYTICS_DATA } from '../data/mockData';

export default function AnalyticsView() {
  const { dailyRequests, routeRiskEvents, regionalAccessibility, historicalIncidents } = ANALYTICS_DATA;

  // Max value for scaling bar heights
  const maxReq = Math.max(...dailyRequests.map((d) => d.count));
  const maxHistorical = Math.max(...(historicalIncidents || []).map((h) => h.count), 25);

  return (
    <div>
      <div className="card-header" style={{ marginBottom: '20px', paddingBottom: '12px' }}>
        <div className="card-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={22} color="var(--teal-600)" />
            <h2>Regional Logistics & Corridor Accessibility Analytics</h2>
          </div>
          <p>
            Macro-level intelligence metrics across North Eastern states, corridor disruptions, and delivery volume
          </p>
        </div>
        <span className="badge badge-teal">LOGISTICS INTELLIGENCE</span>
      </div>

      {/* Top Level Summary Cards */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Weekly Deliveries
          </span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--navy-900)', margin: '4px 0' }}>
            115 Consignments
          </div>
          <div style={{ fontSize: '12px', color: 'var(--safe-green-dark)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} />
            <span>98.2% on-time delivery rate</span>
          </div>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Avg Regional Accessibility
          </span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--teal-600)', margin: '4px 0' }}>
            74.8%
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Across 7 North-Eastern States
          </div>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Active Fleet Coverage
          </span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--blue-600)', margin: '4px 0' }}>
            342 Vehicles
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            4x4 All-Terrain & Reefer Spec
          </div>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Corridor Risk Alerts (30d)
          </span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--warn-amber-dark)', margin: '4px 0' }}>
            38 Incidents
          </div>
          <div style={{ fontSize: '12px', color: 'var(--safe-green-dark)' }}>
            0 Lost Cargo Events
          </div>
        </div>
      </div>

      {/* NEW: HISTORICAL INCIDENTS BAR GRAPH CARD */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div className="card-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <History size={20} color="var(--teal-600)" />
              <h3>Historical Logistics & Safety Incidents</h3>
            </div>
            <p>Annual historical incident log used by PRAVAHA to calibrate corridor risk models and slope hazards</p>
          </div>
          <span className="badge badge-teal">RISK INTELLIGENCE</span>
        </div>

        {/* Vertical & Horizontal Bar Visualizations */}
        <div style={{ marginBottom: '20px' }}>
          {/* Vertical Bar Graph Column Grid */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'flex-end', 
              justifyContent: 'space-between', 
              height: '210px', 
              padding: '16px 20px 0', 
              backgroundColor: '#f8fafc',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              marginBottom: '16px',
              gap: '12px'
            }}
          >
            {(historicalIncidents || []).map((item) => {
              const barHeight = Math.round((item.count / maxHistorical) * 145);
              return (
                <div key={item.category} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '70px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 800, color: item.color, marginBottom: '6px' }}>
                    {item.count}
                  </span>
                  <div
                    style={{
                      width: '42px',
                      height: `${barHeight}px`,
                      backgroundColor: item.color,
                      borderRadius: '6px 6px 0 0',
                      transition: 'height 0.4s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
                    }}
                  />
                  <span 
                    style={{ 
                      fontSize: '11px', 
                      color: 'var(--navy-900)', 
                      marginTop: '10px', 
                      fontWeight: 600,
                      textAlign: 'center',
                      lineHeight: 1.2
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Detailed Metric Pills Breakdown */}
          <div className="grid-3" style={{ gap: '10px', marginBottom: '14px' }}>
            {(historicalIncidents || []).map((item) => (
              <div 
                key={item.category}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'white',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <strong style={{ fontSize: '12.5px', color: 'var(--navy-900)' }}>{item.category}</strong>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.impact}</div>
                </div>
                <span style={{ fontSize: '16px', fontWeight: 800, color: item.color }}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes and Strategic Purpose */}
        <div 
          style={{ 
            backgroundColor: 'var(--blue-50)', 
            border: '1px solid var(--blue-100)', 
            borderRadius: 'var(--radius-sm)', 
            padding: '12px 16px',
            color: 'var(--navy-900)',
            fontSize: '12.5px',
            lineHeight: 1.55
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <Info size={16} color="var(--blue-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <span style={{ color: 'var(--blue-600)', fontWeight: 700 }}>Note: </span>
              <em>Simulated historical data for prototype analysis.</em>
              <div style={{ marginTop: '3px', color: 'var(--text-secondary)' }}>
                The purpose of this graph is to demonstrate how PRAVAHA can use previous transportation incidents and losses to support future route-risk and accessibility decisions.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analytics Grids */}
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        {/* Chart 1: Daily Delivery Requests */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} color="var(--blue-600)" />
                <h3>Daily Delivery Requests</h3>
              </div>
              <p>Weekly volume of processed mountain cargo consignments</p>
            </div>
            <span className="badge badge-teal">Weekly Feed</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', padding: '10px 10px 0', borderBottom: '1px solid var(--border-light)', marginBottom: '14px' }}>
            {dailyRequests.map((item) => {
              const barHeight = Math.round((item.count / maxReq) * 140);
              return (
                <div key={item.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '4px' }}>
                    {item.count}
                  </span>
                  <div
                    style={{
                      width: '36px',
                      height: `${barHeight}px`,
                      background: 'linear-gradient(180deg, var(--teal-500) 0%, var(--teal-600) 100%)',
                      borderRadius: '6px 6px 0 0',
                      transition: 'height 0.4s ease'
                    }}
                  />
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', fontWeight: 600 }}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
            <span>Mon: 12 &bull; Tue: 18 &bull; Wed: 15</span>
            <span>Thu: 24 &bull; Fri: 21</span>
          </div>
        </div>

        {/* Chart 2: Route Risk Events Breakdown */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} color="var(--risk-red)" />
                <h3>Route Risk Events (Monthly)</h3>
              </div>
              <p>Environmental disruptions registered by highway patrol & sensors</p>
            </div>
            <span className="badge badge-danger">38 Total Events</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {routeRiskEvents.map((event) => {
              const maxCount = 20;
              const barPercent = Math.round((event.count / maxCount) * 100);

              return (
                <div key={event.type}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <strong>{event.type}</strong>
                    <span style={{ fontWeight: 700, color: event.color }}>{event.count} incidents</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-subtle)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${barPercent}%`,
                        height: '100%',
                        backgroundColor: event.color,
                        borderRadius: '9999px'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
            Landslide: 8 &bull; Flood: 5 &bull; Road Blockage: 11 &bull; Heavy Rain: 14
          </div>
        </div>
      </div>

      {/* Regional Accessibility Indices */}
      <div className="card">
        <div className="card-header">
          <div className="card-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="var(--navy-900)" />
              <h3>Regional Accessibility Index (NER States)</h3>
            </div>
            <p>Composite index combining road quality, landslide vulnerability, bridge clearance, and telematics coverage</p>
          </div>
          <span className="badge badge-teal">State Scores</span>
        </div>

        <div className="grid-2" style={{ gap: '16px' }}>
          {regionalAccessibility.map((st) => (
            <div
              key={st.state}
              style={{
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <strong style={{ fontSize: '15px', color: 'var(--navy-900)' }}>{st.state}</strong>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{st.status}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '100px', height: '8px', backgroundColor: 'var(--bg-subtle)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${st.score}%`,
                      height: '100%',
                      backgroundColor: st.color,
                      borderRadius: '9999px'
                    }}
                  />
                </div>
                <span style={{ fontSize: '16px', fontWeight: 800, color: st.color, minWidth: '42px', textAlign: 'right' }}>
                  {st.score}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
