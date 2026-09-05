import React from 'react';
import { 
  CloudRain, 
  AlertTriangle, 
  Waves, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';

export default function DynamicDisruptionPanel({
  disruptionState, // { rainfall: bool, roadBlocked: bool, flood: bool }
  onToggleDisruption,
  onResetDisruptions
}) {
  const isAnyDisrupted = disruptionState.rainfall || disruptionState.roadBlocked || disruptionState.flood;

  return (
    <div className="card" style={{ marginBottom: '24px', borderLeft: isAnyDisrupted ? '4px solid var(--risk-red)' : '4px solid var(--safe-green)' }}>
      <div className="card-header" style={{ marginBottom: '14px' }}>
        <div className="card-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} color={isAnyDisrupted ? 'var(--risk-red)' : 'var(--safe-green)'} />
            <h3 style={{ fontSize: '16px' }}>Dynamic Terrain Disruption Simulation</h3>
          </div>
          <p style={{ fontSize: '12px' }}>
            Trigger real-time mountain environmental hazards to observe dynamic route recalculation
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className="badge badge-simulated">LIVE ENGINE</span>
          {isAnyDisrupted ? (
            <span className="badge badge-danger">⚠ DISRUPTION ACTIVE</span>
          ) : (
            <span className="badge badge-success">✓ NORMAL CONDITIONS</span>
          )}
        </div>
      </div>

      {/* Action Simulation Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
        <button
          className={`btn btn-sm ${disruptionState.rainfall ? 'btn-warning' : 'btn-secondary'}`}
          onClick={() => onToggleDisruption('rainfall')}
        >
          <CloudRain size={16} />
          <span>{disruptionState.rainfall ? '✓ Heavy Rainfall Active' : 'Simulate Heavy Rainfall'}</span>
        </button>

        <button
          className={`btn btn-sm ${disruptionState.roadBlocked ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => onToggleDisruption('roadBlocked')}
        >
          <AlertTriangle size={16} />
          <span>{disruptionState.roadBlocked ? '✓ Landslide Active (Mile 42)' : 'Simulate Road Disruption'}</span>
        </button>

        <button
          className={`btn btn-sm ${disruptionState.flood ? 'btn-warning' : 'btn-secondary'}`}
          onClick={() => onToggleDisruption('flood')}
        >
          <Waves size={16} />
          <span>{disruptionState.flood ? '✓ River Surge Active' : 'Simulate Flood Level Alert'}</span>
        </button>

        {isAnyDisrupted && (
          <button
            className="btn btn-outline btn-sm"
            onClick={onResetDisruptions}
            style={{ marginLeft: 'auto' }}
          >
            <RefreshCw size={14} />
            <span>Clear All Hazards</span>
          </button>
        )}
      </div>

      {/* Dynamic Explanation Alert Box */}
      {isAnyDisrupted ? (
        <div
          style={{
            backgroundColor: 'var(--risk-red-bg)',
            border: '1px solid #fecaca',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            color: 'var(--risk-red-dark)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <AlertTriangle size={20} color="var(--risk-red)" />
            <strong style={{ fontSize: '15px' }}>⚠ ROAD DISRUPTION DETECTED ON NORTHERN CORRIDOR</strong>
          </div>
          <p style={{ fontSize: '13.5px', marginBottom: '10px' }}>
            <strong>Route A is currently unsafe.</strong> Heavy soil saturation and landslide debris have escalated route risk.
          </p>
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid #fed7aa',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 14px',
              color: 'var(--navy-900)',
              fontSize: '13px'
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--teal-600)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="var(--teal-600)" />
              PRAVAHA recommends Route B (East Khasi Bypass) because:
            </div>
            <ul style={{ paddingLeft: '20px', lineHeight: 1.6, fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              <li><strong>Lower landslide risk:</strong> Protected with reinforced hillside retaining wire mesh</li>
              <li><strong>Better accessibility:</strong> 4-lane graded highway with dedicated heavy drainage culverts</li>
              <li><strong>Safer road conditions:</strong> Continuous 4G telematics coverage and active emergency towing</li>
            </ul>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: 'var(--safe-green-bg)',
            border: '1px solid #a7f3d0',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            color: 'var(--safe-green-dark)',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <CheckCircle2 size={18} color="var(--safe-green)" />
          <div>
            <strong>Baseline Conditions Normal:</strong> Route B remains the primary recommended corridor with <strong>92% Safety</strong> and <strong>88% Accessibility</strong> index.
          </div>
        </div>
      )}
    </div>
  );
}
