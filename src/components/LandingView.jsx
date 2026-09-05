import React from 'react';
import { 
  Building2, 
  Truck, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  PlayCircle, 
  MapPin, 
  Layers, 
  CloudRain, 
  Database,
  CheckCircle2
} from 'lucide-react';

export default function LandingView({ onSelectRole, onStartDemo }) {
  return (
    <div>
      {/* Hero Presentation Header - Professional Light Blue Treatment */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #e1effa 0%, #ebf4fb 50%, #d6ebf8 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '44px 36px',
          color: 'var(--navy-900)',
          marginBottom: '36px',
          border: '1px solid #bfdbfe',
          boxShadow: '0 4px 15px rgba(15, 23, 42, 0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '820px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span className="badge badge-teal" style={{ fontSize: '11px', padding: '4px 10px', backgroundColor: '#ccfbf1', color: '#0f766e', borderColor: '#99f6e4' }}>
              NATIONAL LOGISTICS MISSION
            </span>
            <span className="badge badge-info" style={{ fontSize: '11px', padding: '4px 10px' }}>
              REGIONAL ACCESSIBILITY NETWORK
            </span>
          </div>

          <h1 style={{ fontSize: '32px', color: 'var(--navy-900)', fontWeight: 800, marginBottom: '14px', lineHeight: 1.25 }}>
            PRAVAHA: Trusted Logistics & Accessibility Intelligence Platform
          </h1>

          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.6, marginBottom: '28px', maxWidth: '720px' }}>
            PRAVAHA connects service centres with transport providers and uses logistics intelligence to recommend safer and more accessible transportation routes across the North Eastern Region.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            <button className="btn btn-primary btn-lg" onClick={onStartDemo}>
              <PlayCircle size={20} />
              <span>Run Guided 16-Step Demo</span>
            </button>
            <button 
              className="btn btn-secondary btn-lg" 
              onClick={() => onSelectRole('route_intelligence')}
              style={{ backgroundColor: '#ffffff', borderColor: '#94a3b8', color: 'var(--navy-900)', fontWeight: 600 }}
            >
              <span>Explore Hazard Engine</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Subtle Decorative Background Graphic */}
        <div 
          style={{
            position: 'absolute',
            right: '-40px',
            top: '-20px',
            opacity: 0.07,
            pointerEvents: 'none'
          }}
        >
          <ShieldCheck size={360} color="#0369a1" />
        </div>
      </div>

      {/* 3 Large Role Cards Section */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '6px' }}>Select Your Operational Role</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14.5px' }}>
            Experience PRAVAHA from the perspective of consignors, fleet transporters, or regional command
          </p>
        </div>

        <div className="grid-3">
          {/* Card 1: Service Centre */}
          <div className="role-card" onClick={() => onSelectRole('service_centre')}>
            <div>
              <div className="role-card-icon role-service">
                <Building2 size={36} />
              </div>
              <div className="role-card-intent">“I need to transport something”</div>
              <h3 className="role-card-title">Service Centre</h3>
              <p className="role-card-desc">
                Hospitals, disaster management depots, and supply hubs creating critical delivery consignments.
              </p>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }}>
              <span>Enter as Service Centre</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Card 2: Transport Provider */}
          <div className="role-card" onClick={() => onSelectRole('transport_provider')}>
            <div>
              <div className="role-card-icon role-transport">
                <Truck size={36} />
              </div>
              <div className="role-card-intent">“I provide transportation”</div>
              <h3 className="role-card-title">Transport Provider</h3>
              <p className="role-card-desc">
                Commercial fleet operators and 4x4 mountain drivers viewing verified loads and safety ratings.
              </p>
            </div>
            <button className="btn btn-navy" style={{ width: '100%' }}>
              <span>Enter as Transport Provider</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Card 3: Regional Operations */}
          <div className="role-card" onClick={() => onSelectRole('route_intelligence')}>
            <div>
              <div className="role-card-icon role-operations">
                <Activity size={36} />
              </div>
              <div className="role-card-intent">“Monitor regional operations”</div>
              <h3 className="role-card-title">Regional Operations</h3>
              <p className="role-card-desc">
                Command center evaluating road closures, landslides, weather alerts, and multimodal routes.
              </p>
            </div>
            <button className="btn btn-secondary" style={{ width: '100%' }}>
              <span>Open Corridor Command</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Supply Chain Journey Flow diagram */}
      <div className="card" style={{ marginBottom: '36px' }}>
        <div className="card-header">
          <div className="card-title-group">
            <h3>Intermediary Logistics Intelligence Flow</h3>
            <p>How PRAVAHA orchestrates trust and safety from pickup to delivery</p>
          </div>
          <span className="badge badge-teal">END-TO-END WORKFLOW</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div className="stat-pill" style={{ flex: 1, minWidth: '150px' }}>
            <span className="stat-pill-label">Origin</span>
            <span className="stat-pill-val" style={{ color: 'var(--blue-600)' }}>SERVICE CENTRE</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Files Delivery Need</span>
          </div>
          <ArrowRight size={18} color="var(--slate-400)" />

          <div className="stat-pill" style={{ flex: 1, minWidth: '150px', borderColor: 'var(--teal-600)', background: 'var(--teal-50)' }}>
            <span className="stat-pill-label" style={{ color: 'var(--teal-600)' }}>Intelligence Engine</span>
            <span className="stat-pill-val" style={{ color: 'var(--teal-600)' }}>PRAVAHA</span>
            <span style={{ fontSize: '11px', color: 'var(--teal-600)' }}>Calculates Safest Path</span>
          </div>
          <ArrowRight size={18} color="var(--slate-400)" />

          <div className="stat-pill" style={{ flex: 1, minWidth: '150px' }}>
            <span className="stat-pill-label">Dispatch</span>
            <span className="stat-pill-val" style={{ color: 'var(--navy-900)' }}>TRANSPORT PROVIDER</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Accepts Safe Load</span>
          </div>
          <ArrowRight size={18} color="var(--slate-400)" />

          <div className="stat-pill" style={{ flex: 1, minWidth: '150px' }}>
            <span className="stat-pill-label">Corridor Guard</span>
            <span className="stat-pill-val" style={{ color: 'var(--warn-amber-dark)' }}>FIELD OPERATIONS</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Offline Hazard Patrol</span>
          </div>
          <ArrowRight size={18} color="var(--slate-400)" />

          <div className="stat-pill" style={{ flex: 1, minWidth: '150px', borderColor: 'var(--safe-green)', background: 'var(--safe-green-bg)' }}>
            <span className="stat-pill-label" style={{ color: 'var(--safe-green-dark)' }}>Destination</span>
            <span className="stat-pill-val" style={{ color: 'var(--safe-green-dark)' }}>DELIVERY CONFIRMED</span>
            <span style={{ fontSize: '11px', color: 'var(--safe-green-dark)' }}>Audit Hash Recorded</span>
          </div>
        </div>
      </div>

      {/* Architecture & Integration Readiness Pillars */}
      <div className="grid-4">
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--teal-600)' }}>
            <ShieldCheck size={20} />
            <strong style={{ fontSize: '14px' }}>Trust & Provenance</strong>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Auditable Route Decision Records with complete transparency on terrain hazard weights.
          </p>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--blue-600)' }}>
            <Layers size={20} />
            <strong style={{ fontSize: '14px' }}>ULIP / GatiShakti</strong>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Unified Logistics Interface Platform integration ready for Road, Rail, and Inland Waterways.
          </p>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--warn-amber-dark)' }}>
            <Database size={20} />
            <strong style={{ fontSize: '14px' }}>Offline IndexedDB</strong>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Field incident reports are cached locally during cellular blackout and sync seamlessly when online.
          </p>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#8b5cf6' }}>
            <CheckCircle2 size={20} />
            <strong style={{ fontSize: '14px' }}>Bhashini Ready</strong>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Multilingual alerts for Assamese, Bengali, Hindi, Nepali, and English logistics personnel.
          </p>
        </div>
      </div>
    </div>
  );
}
