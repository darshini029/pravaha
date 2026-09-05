import React from 'react';
import { 
  ShieldCheck, 
  Wifi, 
  WifiOff, 
  Globe, 
  PlayCircle, 
  RefreshCw, 
  HelpCircle,
  Truck,
  Building2,
  Activity,
  Compass,
  FileSpreadsheet,
  AlertTriangle,
  Layers,
  BarChart3
} from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

export default function Header({
  activeTab,
  setActiveTab,
  isOnline,
  setIsOnline,
  language,
  setLanguage,
  demoStep,
  onResetData,
  onStartDemo
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const tabs = [
    { id: 'landing', label: 'Overview', icon: Building2 },
    { id: 'service_centre', label: t.serviceCentre, icon: Building2 },
    { id: 'transport_provider', label: t.transportProvider, icon: Truck },
    { id: 'route_intelligence', label: t.routeIntelligence, icon: Compass },
    { id: 'vehicle_tracking', label: t.vehicleTracking, icon: Activity },
    { id: 'field_operations', label: t.fieldOperations, icon: FileSpreadsheet },
    { id: 'multimodal', label: t.multimodal, icon: Layers },
    { id: 'alert_centre', label: t.alertCentre, icon: AlertTriangle },
    { id: 'trust_provenance', label: t.trustAudit, icon: ShieldCheck },
    { id: 'analytics', label: t.analytics, icon: BarChart3 }
  ];

  return (
    <header>
      <div className="header-top">
        <div className="header-inner">
          {/* Logo and Brand */}
          <div className="brand-logo-area" onClick={() => setActiveTab('landing')}>
            <div className="logo-badge">
              <ShieldCheck size={28} />
            </div>
            <div>
              <div className="brand-title">
                PRAVAHA
                <span className="badge badge-teal" style={{ fontSize: '10px', padding: '3px 8px' }}>
                  INTELLIGENCE PLATFORM
                </span>
              </div>
              <div className="brand-subtitle">{t.tagline}</div>
            </div>
          </div>

          {/* Quick Header Controls */}
          <div className="header-controls">
            {/* Run Demo Scenario CTA */}
            <button 
              className="btn btn-primary btn-sm" 
              onClick={onStartDemo}
              title="Launch 16-Step Guided Walkthrough"
            >
              <PlayCircle size={16} />
              <span>{t.runDemoScenario}</span>
            </button>

            {/* Online / Offline Simulator Toggle */}
            <button
              className={`btn btn-sm ${isOnline ? 'btn-outline' : 'btn-danger'}`}
              onClick={() => setIsOnline(!isOnline)}
              title={isOnline ? 'Simulate losing cellular connectivity' : 'Restore internet connection'}
              style={{
                backgroundColor: isOnline ? '#ecfdf5' : 'var(--risk-red)',
                color: isOnline ? '#047857' : 'white',
                borderColor: isOnline ? '#a7f3d0' : 'var(--risk-red)',
                fontWeight: 600
              }}
            >
              {isOnline ? (
                <>
                  <Wifi size={15} color="#059669" />
                  <span style={{ color: '#047857', fontWeight: 700 }}>ONLINE</span>
                </>
              ) : (
                <>
                  <WifiOff size={15} color="#ffffff" />
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>OFFLINE MODE</span>
                </>
              )}
            </button>

            {/* Language Switcher (Bhashini-Ready) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={15} color="var(--slate-600)" />
              <select
                className="form-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  padding: '5px 10px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  backgroundColor: '#ffffff',
                  color: 'var(--navy-900)',
                  borderColor: '#cbd5e1',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                }}
                title="Bhashini Regional Language Selector"
              >
                {Object.entries(TRANSLATIONS).map(([key, lang]) => (
                  <option key={key} value={key}>
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Reset State Button */}
            <button
              className="btn btn-outline btn-sm"
              onClick={onResetData}
              title="Reset all demo data to initial defaults"
              style={{
                backgroundColor: '#ffffff',
                color: 'var(--slate-600)',
                borderColor: '#cbd5e1',
                padding: '6px 12px',
                fontWeight: 600,
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
              }}
            >
              <RefreshCw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="nav-tab-bar">
        <div className="nav-tabs-list">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
