import React from 'react';
import { 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  AlertTriangle,
  Compass,
  CheckCircle
} from 'lucide-react';

export default function TransportProviderView({
  requests,
  onAcceptDelivery,
  onTrackVehicle
}) {
  return (
    <div>
      <div className="card-header" style={{ marginBottom: '20px', paddingBottom: '12px' }}>
        <div className="card-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Truck size={22} color="var(--teal-600)" />
            <h2>Transport Provider Dispatch Board</h2>
          </div>
          <p>Review verified delivery consignments, check safety scores, and accept regional dispatches</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-teal">ULIP Connected (Ready)</span>
          <span className="badge badge-info">LIVE FLEET FEED</span>
        </div>
      </div>

      {/* Available Requests Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {requests.map((req) => {
          const isAccepted = req.status === 'Accepted' || req.status === 'In Transit' || req.status === 'Delivered';

          return (
            <div 
              key={req.id} 
              className="card"
              style={{
                borderLeft: isAccepted ? '5px solid var(--safe-green)' : '5px solid var(--teal-600)',
                backgroundColor: isAccepted ? '#fcfdfd' : 'white'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy-900)' }}>
                      {req.cargo}
                    </span>
                    <span className="badge badge-simulated" style={{ fontSize: '11px' }}>
                      ID: {req.id}
                    </span>
                    <span className={`badge ${req.priority === 'High' ? 'badge-danger' : 'badge-warning'}`}>
                      Priority: {req.priority}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    <MapPin size={15} color="var(--blue-600)" />
                    <span>{req.pickup}</span>
                    <ArrowRight size={14} color="var(--slate-400)" />
                    <span>{req.destination}</span>
                    <span style={{ color: 'var(--slate-400)', fontWeight: 400, marginLeft: '8px' }}>
                      ({req.selectedRoute})
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div>
                  {isAccepted ? (
                    <span className="badge badge-success" style={{ fontSize: '13px', padding: '6px 12px' }}>
                      ✓ Delivery Accepted & Assigned
                    </span>
                  ) : (
                    <span className="badge badge-teal" style={{ fontSize: '12px', padding: '5px 10px' }}>
                      Awaiting Transporter Acceptance
                    </span>
                  )}
                </div>
              </div>

              {/* Key Logistics & Safety Metric Pills */}
              <div className="grid-4" style={{ marginBottom: '16px' }}>
                <div className="stat-pill">
                  <span className="stat-pill-label">Corridor Distance</span>
                  <span className="stat-pill-val">{req.distanceKm} km</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-pill-label">Estimated Transit</span>
                  <span className="stat-pill-val">{req.estimatedTime}</span>
                </div>
                <div className="stat-pill" style={{ borderColor: '#a7f3d0', background: 'var(--safe-green-bg)' }}>
                  <span className="stat-pill-label" style={{ color: 'var(--safe-green-dark)' }}>Route Safety</span>
                  <span className="stat-pill-val" style={{ color: 'var(--safe-green-dark)' }}>{req.routeSafety}%</span>
                </div>
                <div className="stat-pill" style={{ borderColor: 'var(--blue-100)', background: 'var(--blue-50)' }}>
                  <span className="stat-pill-label" style={{ color: 'var(--blue-600)' }}>Accessibility</span>
                  <span className="stat-pill-val" style={{ color: 'var(--blue-600)' }}>{req.accessibility}%</span>
                </div>
              </div>

              {/* Verification Badges Section */}
              <div 
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '12px', 
                  backgroundColor: 'var(--bg-subtle)', 
                  padding: '10px 14px', 
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '16px',
                  alignItems: 'center'
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12.5px', color: 'var(--safe-green-dark)', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="var(--safe-green)" />
                  ✓ Verified Transporter (NorthEast Express Logistics)
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12.5px', color: 'var(--safe-green-dark)', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="var(--safe-green)" />
                  ✓ Vehicle Available (AS-01-GC-4482 - 4x4 Mountain Spec)
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12.5px', color: 'var(--safe-green-dark)', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="var(--safe-green)" />
                  ✓ Route Checked (East Khasi Bypass Low Hazard)
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', alignItems: 'center' }}>
                {!isAccepted ? (
                  <button 
                    className="btn btn-primary"
                    onClick={() => onAcceptDelivery(req.id)}
                  >
                    <CheckCircle size={16} />
                    <span>Accept Delivery</span>
                  </button>
                ) : (
                  <button 
                    className="btn btn-navy"
                    onClick={() => onTrackVehicle && onTrackVehicle()}
                  >
                    <span>Track Vehicle Movement (PRV-117)</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
