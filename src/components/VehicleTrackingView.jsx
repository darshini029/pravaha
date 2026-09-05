import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Truck, 
  MapPin, 
  Navigation, 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldCheck, 
  Radio, 
  Gauge, 
  Clock, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import InteractiveMap from './InteractiveMap';

export default function VehicleTrackingView({
  vehicleProgress,
  setVehicleProgress,
  isMoving,
  setIsMoving,
  disruptionState
}) {
  const [speedKmh, setSpeedKmh] = useState(44);
  const [altitudeM, setAltitudeM] = useState(620);
  const isDisrupted = disruptionState.rainfall || disruptionState.roadBlocked;

  // Move vehicle gradually when isMoving is true
  useEffect(() => {
    let interval;
    if (isMoving) {
      interval = setInterval(() => {
        setVehicleProgress((prev) => {
          if (prev >= 1) {
            setIsMoving(false);
            return 1;
          }
          const next = prev + 0.02;
          // Update dynamic altitude & speed
          setAltitudeM(Math.round(200 + next * 1250));
          setSpeedKmh(Math.round(40 + Math.sin(next * 10) * 8));
          return next;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isMoving, setVehicleProgress, setIsMoving]);

  const handleResetPosition = () => {
    setIsMoving(false);
    setVehicleProgress(0.05);
    setAltitudeM(220);
    setSpeedKmh(0);
  };

  const currentEtaMinutes = Math.max(10, Math.round(228 * (1 - vehicleProgress)));
  const etaHours = Math.floor(currentEtaMinutes / 60);
  const etaRemainingMins = currentEtaMinutes % 60;
  const etaDisplay = `${etaHours}h ${etaRemainingMins}m`;

  const isDelivered = vehicleProgress >= 0.98;

  return (
    <div>
      {/* Top Telematics Card */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy-900)' }}>
                Vehicle Telematics: PRV-117
              </span>
              <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Radio size={12} className="pulse-icon" />
                ✓ GPS Active
              </span>
              <span className="badge badge-teal">Cold Chain Active (4.2°C)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
              <span><strong>Consignment:</strong> Medical Supplies (Vaccines & ICU kits)</span>
              <span>&bull;</span>
              <span><strong>Corridor:</strong> Guwahati ➔ Shillong (via Route B)</span>
            </div>
          </div>

          {/* Simulation Movement Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className={`btn ${isMoving ? 'btn-warning' : 'btn-primary'}`}
              onClick={() => setIsMoving(!isMoving)}
            >
              {isMoving ? (
                <>
                  <Pause size={16} />
                  <span>Pause Tracking</span>
                </>
              ) : (
                <>
                  <Play size={16} />
                  <span>Simulate Vehicle Movement</span>
                </>
              )}
            </button>

            <button
              className="btn btn-secondary"
              onClick={handleResetPosition}
              title="Reset vehicle back to Guwahati depot"
            >
              <RotateCcw size={15} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tracking Grid */}
      <div className="grid-2">
        {/* Left: Map Tracking View */}
        <div>
          <InteractiveMap
            activeRouteId="Route B"
            vehicleProgress={vehicleProgress}
            isDisrupted={isDisrupted}
            showHazards={true}
          />
        </div>

        {/* Right: Live Telematics & Waypoint Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Key Vitals */}
          <div className="grid-3" style={{ gap: '12px' }}>
            <div className="stat-pill">
              <span className="stat-pill-label">Current Status</span>
              <span className="stat-pill-val" style={{ color: isDelivered ? 'var(--safe-green-dark)' : 'var(--teal-600)', fontSize: '14px' }}>
                {isDelivered ? '✓ Arrived at Shillong' : isMoving ? 'In Transit (Moving)' : 'Stationary / In Transit'}
              </span>
            </div>

            <div className="stat-pill">
              <span className="stat-pill-label">Est. Time Remaining</span>
              <span className="stat-pill-val" style={{ fontSize: '14px' }}>
                {isDelivered ? '0m (Arrived)' : etaDisplay}
              </span>
            </div>

            <div className="stat-pill">
              <span className="stat-pill-label">Current Speed</span>
              <span className="stat-pill-val" style={{ fontSize: '14px' }}>
                {isMoving ? `${speedKmh} km/h` : '0 km/h'}
              </span>
            </div>
          </div>

          {/* Elevation & Hill Grade Telematics */}
          <div className="card">
            <div className="card-header" style={{ marginBottom: '10px', paddingBottom: '8px' }}>
              <div className="card-title-group">
                <h3 style={{ fontSize: '15px' }}>Hill Corridor Telematics</h3>
                <p style={{ fontSize: '12px' }}>Vehicle telemetry & environmental sensor feed</p>
              </div>
              <span className="badge badge-simulated">TELEMATICS</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '13px' }}>
              <div style={{ padding: '8px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>ELEVATION</span>
                <strong>{altitudeM} meters ASL</strong>
              </div>
              <div style={{ padding: '8px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>BATTERY / FUEL</span>
                <strong>86% (Full Capacity)</strong>
              </div>
              <div style={{ padding: '8px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>ROAD SLOPE GRADIENT</span>
                <strong>+4.8% (Ascending)</strong>
              </div>
              <div style={{ padding: '8px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>DRIVER TELECOM</span>
                <strong style={{ color: 'var(--safe-green-dark)' }}>4G VoLTE Connected</strong>
              </div>
            </div>
          </div>

          {/* Route Waypoints Progression */}
          <div className="card">
            <div className="card-header" style={{ marginBottom: '10px', paddingBottom: '8px' }}>
              <div className="card-title-group">
                <h3 style={{ fontSize: '15px' }}>Route B Waypoints Progress</h3>
                <p style={{ fontSize: '12px' }}>Guwahati Central Hub ➔ Jorabat ➔ Umiam Lake ➔ Shillong</p>
              </div>
              <span className="badge badge-success">Safe Corridor</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div className={`check-item ${vehicleProgress >= 0.05 ? 'done' : ''}`}>
                <CheckCircle2 size={16} color={vehicleProgress >= 0.05 ? 'var(--safe-green)' : 'var(--slate-400)'} />
                <span>1. Guwahati Dispatch Depot (Elevation 55m)</span>
              </div>

              <div className={`check-item ${vehicleProgress >= 0.35 ? 'done' : vehicleProgress >= 0.1 ? 'active' : ''}`}>
                <CheckCircle2 size={16} color={vehicleProgress >= 0.35 ? 'var(--safe-green)' : 'var(--slate-400)'} />
                <span>2. Jorabat Expressway Junction (Elevation 160m)</span>
              </div>

              <div className={`check-item ${vehicleProgress >= 0.7 ? 'done' : vehicleProgress >= 0.35 ? 'active' : ''}`}>
                <CheckCircle2 size={16} color={vehicleProgress >= 0.7 ? 'var(--safe-green)' : 'var(--slate-400)'} />
                <span>3. Umiam Lake Viaduct & Drainage Zone (Elevation 980m)</span>
              </div>

              <div className={`check-item ${vehicleProgress >= 0.98 ? 'done' : vehicleProgress >= 0.7 ? 'active' : ''}`}>
                <CheckCircle2 size={16} color={vehicleProgress >= 0.98 ? 'var(--safe-green)' : 'var(--slate-400)'} />
                <span>4. Shillong Civil Hospital Depot (Elevation 1,525m)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
