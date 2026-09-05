import React, { useState } from 'react';
import { 
  Compass, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  TrendingDown, 
  TrendingUp, 
  Mountain, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { BASELINE_ROUTES } from '../data/mockData';
import DynamicDisruptionPanel from './DynamicDisruptionPanel';
import InteractiveMap from './InteractiveMap';

export default function RouteIntelligenceView({
  disruptionState,
  onToggleDisruption,
  onResetDisruptions,
  selectedRouteId,
  setSelectedRouteId
}) {
  const isDisrupted = disruptionState.rainfall || disruptionState.roadBlocked || disruptionState.flood;

  return (
    <div>
      {/* Top Disruption Simulator Panel */}
      <DynamicDisruptionPanel
        disruptionState={disruptionState}
        onToggleDisruption={onToggleDisruption}
        onResetDisruptions={onResetDisruptions}
      />

      {/* Main Grid: Route Comparison on Left, Interactive Map on Right */}
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        {/* Left Column: 3 Route Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px' }}>Corridor Route Comparison: Guwahati ➔ Shillong</h3>
            <span className="badge badge-simulated">TERRAIN INTELLIGENCE</span>
          </div>

          {BASELINE_ROUTES.map((route) => {
            const isRec = route.id === 'Route B';
            const isA = route.id === 'Route A';
            const safety = isDisrupted ? route.disruptedSafety : route.normalSafety;
            const accessibility = isDisrupted ? route.disruptedAccessibility : route.normalAccessibility;
            const eta = isDisrupted ? route.disruptedEta : route.normalEta;
            const risk = isDisrupted ? route.disruptedRisk : route.normalRisk;
            const isSelected = selectedRouteId === route.id;

            return (
              <div
                key={route.id}
                className={`route-card ${isRec ? 'recommended' : isA && isDisrupted ? 'critical' : ''}`}
                style={{
                  borderWidth: isSelected ? '3px' : '2px',
                  boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedRouteId(route.id)}
              >
                <div className="route-header">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="route-name">{route.id}: {route.name}</span>
                      {isRec && (
                        <span className="badge badge-success">
                          ★ PRAVAHA RECOMMENDED
                        </span>
                      )}
                      {isA && isDisrupted && (
                        <span className="badge badge-danger">
                          ⚠ UNSAFE CORRIDOR
                        </span>
                      )}
                    </div>
                    <div className="route-via">{route.via} • {route.distanceKm} km</div>
                  </div>

                  {/* Risk Badge */}
                  <span
                    className={`badge ${
                      risk === 'LOW'
                        ? 'badge-success'
                        : risk === 'MEDIUM'
                        ? 'badge-warning'
                        : 'badge-danger'
                    }`}
                  >
                    Risk: {risk}
                  </span>
                </div>

                {/* Performance Metric Grid */}
                <div className="grid-3" style={{ gap: '10px', marginBottom: '12px' }}>
                  <div className="stat-pill">
                    <span className="stat-pill-label">Est. Transit Time</span>
                    <span className="stat-pill-val" style={{ fontSize: '14px' }}>{eta}</span>
                  </div>

                  <div 
                    className="stat-pill" 
                    style={{ 
                      borderColor: safety > 80 ? '#a7f3d0' : safety < 50 ? '#fecaca' : '#fde68a',
                      background: safety > 80 ? 'var(--safe-green-bg)' : safety < 50 ? 'var(--risk-red-bg)' : 'var(--warn-amber-bg)'
                    }}
                  >
                    <span className="stat-pill-label">Safety Index</span>
                    <span className="stat-pill-val" style={{ color: safety > 80 ? 'var(--safe-green-dark)' : safety < 50 ? 'var(--risk-red-dark)' : 'var(--warn-amber-dark)' }}>
                      {safety}%
                    </span>
                  </div>

                  <div className="stat-pill">
                    <span className="stat-pill-label">Accessibility</span>
                    <span className="stat-pill-val" style={{ fontSize: '14px' }}>{accessibility}%</span>
                  </div>
                </div>

                {/* Specific Mountain Engineering Specs */}
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid var(--border-light)', paddingTop: '8px' }}>
                  <div><strong>Slope Landslide Risk:</strong> {route.landslideRisk}</div>
                  <div><strong>Road Surface & Grade:</strong> {route.roadQuality} (Gain: {route.elevationGain})</div>
                  <div><strong>Culverts / Bridges:</strong> {route.bridgeStatus}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Interactive Map */}
        <div>
          <InteractiveMap
            activeRouteId={selectedRouteId}
            onSelectRoute={(id) => setSelectedRouteId(id)}
            isDisrupted={isDisrupted}
            vehicleProgress={0.4}
            showHazards={true}
          />

          {/* Primary Recommendation Reason Callout Banner */}
          <div 
            className="card" 
            style={{ 
              marginTop: '16px', 
              borderLeft: '5px solid var(--teal-600)',
              backgroundColor: 'var(--teal-50)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <ShieldCheck size={24} color="var(--teal-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '14.5px', color: 'var(--navy-900)', display: 'block', marginBottom: '4px' }}>
                  PRAVAHA Intelligence Recommendation Justification:
                </strong>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  “The shortest route (Route A: 98 km) is currently not recommended because heavy rainfall and terrain saturation have significantly increased road and landslide risk. Route B (121 km) provides better safety ({isDisrupted ? '89%' : '92%'}) and accessibility ({isDisrupted ? '85%' : '88%'}) with reinforced retaining structures and active drainage.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
