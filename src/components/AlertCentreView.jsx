import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Info, 
  CheckCircle2, 
  Globe, 
  Clock, 
  MapPin, 
  ArrowRight,
  Volume2
} from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

export default function AlertCentreView({
  language,
  setLanguage,
  disruptionState,
  onNavigateToRoute
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const isDisrupted = disruptionState.rainfall || disruptionState.roadBlocked;

  const alerts = [
    {
      id: 'ALT-901',
      severity: 'HIGH',
      badgeClass: 'badge-danger',
      title: t.highAlertTitle,
      location: 'NH-40 Nongpoh Pass & Umiam Ridge Corridor',
      time: '12 mins ago (Live Broadcast)',
      action: t.highAlertAction,
      icon: ShieldAlert,
      color: 'var(--risk-red)'
    },
    {
      id: 'ALT-902',
      severity: 'MEDIUM',
      badgeClass: 'badge-warning',
      title: t.medAlertTitle,
      location: 'Guwahati - Jorabat Low-Lying Culvert Zone',
      time: '28 mins ago',
      action: t.medAlertAction,
      icon: AlertTriangle,
      color: 'var(--warn-amber-dark)'
    },
    {
      id: 'ALT-903',
      severity: 'SAFE',
      badgeClass: 'badge-success',
      title: t.safeAlertTitle,
      location: 'NH-106 East Khasi Highway Bypass',
      time: '35 mins ago (Verified by Road Patrol)',
      action: t.safeAlertAction,
      icon: CheckCircle2,
      color: 'var(--safe-green-dark)'
    }
  ];

  return (
    <div>
      <div className="card-header" style={{ marginBottom: '20px', paddingBottom: '12px' }}>
        <div className="card-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={22} color="var(--risk-red)" />
            <h2>Regional Alert & Multilingual Hazard Warning Centre</h2>
          </div>
          <p>Real-time emergency bulletins for transport drivers, consignors, and emergency patrols</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className="badge badge-teal">{t.bhashiniBadge}</span>
          <span className="badge badge-simulated">{t.simulatedBadge}</span>
        </div>
      </div>

      {/* Language Switcher Bar - Light Steel-Blue Card */}
      <div 
        className="card" 
        style={{ 
          marginBottom: '24px', 
          backgroundColor: '#f1f7fc', 
          border: '1px solid #cbd5e1',
          color: 'var(--navy-900)',
          padding: '16px 20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe size={22} color="var(--teal-600)" />
            <div>
              <strong style={{ fontSize: '14.5px', color: 'var(--navy-900)' }}>Regional Language Broadcast (Bhashini Engine Ready)</strong>
              <div style={{ fontSize: '12px', color: 'var(--slate-600)' }}>
                Select regional language to translate emergency bulletins and transit advisories
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {Object.entries(TRANSLATIONS).map(([key, item]) => (
              <button
                key={key}
                className={`btn btn-sm ${language === key ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setLanguage(key)}
                style={{
                  backgroundColor: language === key ? 'var(--teal-600)' : '#ffffff',
                  color: language === key ? '#ffffff' : 'var(--navy-900)',
                  borderColor: language === key ? 'var(--teal-600)' : '#cbd5e1',
                  fontWeight: 600
                }}
              >
                <span>{item.nativeName}</span>
                <span style={{ fontSize: '11px', opacity: 0.85 }}>({item.name})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Cards Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {alerts.map((alert) => {
          const Icon = alert.icon;

          return (
            <div
              key={alert.id}
              className="card"
              style={{
                borderLeft: `5px solid ${alert.color}`,
                backgroundColor: alert.severity === 'HIGH' ? '#fef2f2' : alert.severity === 'MEDIUM' ? '#fffbeb' : '#f0fdf4'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={22} color={alert.color} />
                  <h3 style={{ fontSize: '16px', color: 'var(--navy-900)' }}>
                    {alert.title}
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span className={`badge ${alert.badgeClass}`}>
                    {alert.severity} PRIORITY
                  </span>
                  <span className="badge badge-simulated">
                    {alert.id}
                  </span>
                </div>
              </div>

              {/* Location and Timestamp */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} color="var(--blue-600)" />
                  <strong>Corridor:</strong> {alert.location}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} color="var(--slate-400)" />
                  {alert.time}
                </span>
              </div>

              {/* Recommended Action Box */}
              <div
                style={{
                  backgroundColor: 'white',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <strong style={{ fontSize: '12.5px', color: 'var(--navy-900)', display: 'block', marginBottom: '2px' }}>
                    RECOMMENDED LOGISTICS ACTION:
                  </strong>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {alert.action}
                  </span>
                </div>

                {alert.severity === 'HIGH' && (
                  <button
                    className="btn btn-navy btn-sm"
                    onClick={() => onNavigateToRoute && onNavigateToRoute()}
                  >
                    <span>View Route B Bypass</span>
                    <ArrowRight size={14} />
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
