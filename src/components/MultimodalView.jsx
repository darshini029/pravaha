import React from 'react';
import { 
  Layers, 
  Truck, 
  Train, 
  Ship, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { MULTIMODAL_NETWORK } from '../data/mockData';

export default function MultimodalView({ disruptionState }) {
  const isDisrupted = disruptionState.rainfall || disruptionState.roadBlocked;

  return (
    <div>
      <div className="card-header" style={{ marginBottom: '20px', paddingBottom: '12px' }}>
        <div className="card-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={22} color="var(--teal-600)" />
            <h2>Multimodal Logistics & Corridor Resiliency Advisor</h2>
          </div>
          <p>
            Dynamic evaluation across Road, Rail (Northeast Frontier Railway), and Inland Waterways (NW-2)
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-teal">ULIP / PM GatiShakti Ready</span>
          <span className="badge badge-info">MULTI-CARRIER NETWORK</span>
        </div>
      </div>

      {/* Multimodal Dynamic Advisory Banner */}
      {isDisrupted ? (
        <div 
          className="card" 
          style={{ 
            marginBottom: '24px', 
            backgroundColor: 'var(--warn-amber-bg)', 
            borderColor: '#fde68a',
            borderLeft: '5px solid var(--warn-amber)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <AlertTriangle size={24} color="var(--warn-amber-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '15px', color: 'var(--warn-amber-dark)' }}>
                Highway Restriction Active &bull; PRAVAHA Multimodal Alternate Activation
              </strong>
              <p style={{ fontSize: '13.5px', color: '#78350f', marginTop: '4px', lineHeight: 1.5 }}>
                Due to mudslides on the direct mountain road corridor, PRAVAHA evaluates multimodal fallback options: <strong>Northeast Frontier Railway (Guwahati–Badarpur freight corridor)</strong> and <strong>Inland Waterway 2 (Pandu Port barges)</strong> are ready for bulk diversion.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div 
          className="card" 
          style={{ 
            marginBottom: '24px', 
            backgroundColor: 'var(--safe-green-bg)', 
            borderColor: '#a7f3d0',
            borderLeft: '5px solid var(--safe-green)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={20} color="var(--safe-green)" />
            <span style={{ fontSize: '13.5px', color: 'var(--safe-green-dark)', fontWeight: 600 }}>
              All 3 multimodal regional transport channels operating under optimal baseline parameters.
            </span>
          </div>
        </div>
      )}

      {/* 3 Multimodal Transport Cards */}
      <div className="grid-3" style={{ marginBottom: '28px' }}>
        {/* Card 1: Road */}
        <div 
          className="card"
          style={{
            borderTop: isDisrupted ? '4px solid var(--risk-red)' : '4px solid var(--safe-green)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={20} color="var(--blue-600)" />
              </div>
              <h3 style={{ fontSize: '16px' }}>ROAD TRANSPORT</h3>
            </div>
            <span className={`badge ${isDisrupted ? 'badge-danger' : 'badge-success'}`}>
              {isDisrupted ? '⚠ Partially Disrupted' : '✓ Available'}
            </span>
          </div>

          <h4 style={{ fontSize: '14px', color: 'var(--navy-900)', marginBottom: '8px' }}>
            NH-6 & NH-27 Mountain Corridor
          </h4>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Direct highway connection between Assam plains and Meghalaya/Barak Valley hill ranges.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
            <div><strong>Capacity:</strong> 8,500 Tons/day</div>
            <div><strong>Transit Time:</strong> 4 - 10 Hours</div>
            <div><strong>ULIP Status:</strong> {isDisrupted ? 'Rerouting Recommended' : 'Verified Available'}</div>
          </div>
        </div>

        {/* Card 2: Rail */}
        <div 
          className="card"
          style={{ borderTop: '4px solid var(--safe-green)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--teal-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Train size={20} color="var(--teal-600)" />
              </div>
              <h3 style={{ fontSize: '16px' }}>RAIL FREIGHT</h3>
            </div>
            <span className="badge badge-success">✓ Available</span>
          </div>

          <h4 style={{ fontSize: '14px', color: 'var(--navy-900)', marginBottom: '8px' }}>
            NF Railway (Lumding - Badarpur)
          </h4>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Heavy mountain rail freight with reinforced tunnels and zero mudslide downtime.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
            <div><strong>Capacity:</strong> 14,000 Tons/day</div>
            <div><strong>Transit Time:</strong> 6 - 12 Hours</div>
            <div><strong>Resilience Index:</strong> 94% (High Weather Resistance)</div>
          </div>
        </div>

        {/* Card 3: Waterway */}
        <div 
          className="card"
          style={{ borderTop: '4px solid var(--blue-600)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ship size={20} color="var(--blue-600)" />
              </div>
              <h3 style={{ fontSize: '16px' }}>INLAND WATERWAY</h3>
            </div>
            <span className="badge badge-info">✓ Alternative</span>
          </div>

          <h4 style={{ fontSize: '14px', color: 'var(--navy-900)', marginBottom: '8px' }}>
            National Waterway 2 (Pandu Port)
          </h4>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Brahmaputra river barge cargo system for bulk commodities and relief materials.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
            <div><strong>Capacity:</strong> 20,000 Tons/barge fleet</div>
            <div><strong>Transit Time:</strong> 18 - 24 Hours</div>
            <div><strong>Port Readiness:</strong> Pandu Multimodal Terminal Active</div>
          </div>
        </div>
      </div>

      {/* Institutional Integration Readiness Note */}
      <div className="card" style={{ backgroundColor: 'var(--bg-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sparkles size={18} color="var(--teal-600)" />
          <strong style={{ fontSize: '14px' }}>National Logistics Integration Note (PM GatiShakti & ULIP Ready)</strong>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          PRAVAHA is designed with standardized data schemas compliant with India’s <strong>Unified Logistics Interface Platform (ULIP)</strong> and <strong>PM GatiShakti National Master Plan</strong>. In this prototype, data is simulated to demonstrate how multimodal failover logic automatically switches loads to rail or waterway terminals when mountain road corridors are compromised.
        </p>
      </div>
    </div>
  );
}
