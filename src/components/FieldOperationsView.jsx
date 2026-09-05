import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  Wifi, 
  WifiOff, 
  Database, 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Sparkles,
  Layers
} from 'lucide-react';
import { 
  saveFieldReportToIndexedDB, 
  getAllFieldReportsFromIndexedDB, 
  syncAllPendingReportsInIndexedDB 
} from '../utils/indexedDB';
import { INITIAL_FIELD_REPORTS } from '../data/mockData';

export default function FieldOperationsView({
  isOnline,
  setIsOnline,
  onNewIncidentReported
}) {
  const [reports, setReports] = useState([]);
  const [incidentType, setIncidentType] = useState('Landslide');
  const [roadCondition, setRoadCondition] = useState('Partially Blocked');
  const [location, setLocation] = useState('NH-40 Mile 42, Nongpoh Corridor');
  const [severity, setSeverity] = useState('High');
  const [description, setDescription] = useState('Fresh rock and mudfall on northbound lane. PWD earthmover clearing single-file lane.');
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load existing reports from IndexedDB on component mount
  const loadReports = async () => {
    try {
      const dbReports = await getAllFieldReportsFromIndexedDB();
      if (dbReports && dbReports.length > 0) {
        setReports(dbReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } else {
        // Seed initial reports to IndexedDB
        for (const r of INITIAL_FIELD_REPORTS) {
          await saveFieldReportToIndexedDB(r);
        }
        const seeded = await getAllFieldReportsFromIndexedDB();
        setReports(seeded.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (err) {
      console.error('Failed to load from IndexedDB, using fallback state:', err);
      setReports(INITIAL_FIELD_REPORTS);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  // Save report action (Online or Offline)
  const handleSaveReport = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const newReport = {
      incidentType,
      roadCondition,
      location,
      severity,
      description,
      reporterRole: 'Field Road Safety Inspector',
      createdAt: new Date().toISOString(),
      syncStatus: isOnline ? 'synced' : 'local_only',
      syncedAt: isOnline ? new Date().toISOString() : null
    };

    try {
      const saved = await saveFieldReportToIndexedDB(newReport);
      await loadReports();
      setIsSaving(false);

      if (isOnline) {
        setSaveMessage({
          type: 'online',
          text: '✓ Report saved & synced immediately to PRAVAHA Regional Hazard Engine.'
        });
        if (onNewIncidentReported) onNewIncidentReported(saved);
      } else {
        setSaveMessage({
          type: 'offline',
          text: 'Report saved locally in IndexedDB. It will sync when connection is restored.'
        });
      }

      // Auto-clear message after 5 seconds
      setTimeout(() => setSaveMessage(null), 5000);
    } catch (err) {
      console.error('IndexedDB save error:', err);
      setIsSaving(false);
    }
  };

  // Sync offline reports when network restores
  const handleRestoreNetworkAndSync = async () => {
    setIsSyncing(true);
    setIsOnline(true);

    try {
      const res = await syncAllPendingReportsInIndexedDB();
      await loadReports();
      setIsSyncing(false);
      setSaveMessage({
        type: 'synced',
        text: `✓ Report Synced! (${res.count} pending offline reports uploaded from IndexedDB).`
      });
      if (onNewIncidentReported) onNewIncidentReported(null);
      setTimeout(() => setSaveMessage(null), 5000);
    } catch (err) {
      console.error('Sync error:', err);
      setIsSyncing(false);
    }
  };

  const pendingOfflineCount = reports.filter((r) => r.syncStatus !== 'synced').length;

  return (
    <div>
      {/* Network Status Header Banner */}
      <div 
        className="card"
        style={{
          marginBottom: '24px',
          borderLeft: isOnline ? '5px solid var(--safe-green)' : '5px solid var(--risk-red)',
          backgroundColor: isOnline ? '#f0fdf4' : '#fef2f2'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isOnline ? (
              <div style={{ width: '40px', height: '40px', background: 'var(--safe-green-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wifi size={22} color="var(--safe-green)" />
              </div>
            ) : (
              <div style={{ width: '40px', height: '40px', background: 'var(--risk-red-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <WifiOff size={22} color="var(--risk-red)" />
              </div>
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong style={{ fontSize: '16px', color: isOnline ? 'var(--safe-green-dark)' : 'var(--risk-red-dark)' }}>
                  {isOnline ? '🟢 ONLINE (Field Connected)' : '🔴 OFFLINE MODE (No Cellular Coverage)'}
                </strong>
                <span className="badge badge-simulated">INDEXEDDB ENABLED</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {isOnline 
                  ? 'Reports are saved to local IndexedDB and instantly synced with the central hazard matrix.' 
                  : 'Cellular network disconnected. Field reports will be preserved in browser IndexedDB.'}
              </p>
            </div>
          </div>

          {/* Network Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {isOnline ? (
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setIsOnline(false)}
                style={{ color: 'var(--risk-red)', borderColor: '#fca5a5' }}
              >
                <WifiOff size={14} />
                <span>Simulate Offline Mode</span>
              </button>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={handleRestoreNetworkAndSync}
                disabled={isSyncing}
              >
                <RefreshCw size={14} className={isSyncing ? 'pulse-icon' : ''} />
                <span>Restore Network & Sync</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Feedback Banner */}
      {saveMessage && (
        <div 
          style={{ 
            marginBottom: '20px', 
            padding: '14px 18px', 
            borderRadius: 'var(--radius-md)', 
            backgroundColor: saveMessage.type === 'offline' ? 'var(--warn-amber-bg)' : 'var(--safe-green-bg)',
            border: `1px solid ${saveMessage.type === 'offline' ? '#fde68a' : '#a7f3d0'}`,
            color: saveMessage.type === 'offline' ? 'var(--warn-amber-dark)' : 'var(--safe-green-dark)',
            fontSize: '13.5px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {saveMessage.type === 'offline' ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
          <span>{saveMessage.text}</span>
        </div>
      )}

      {/* Main Content Grid: Report Form on Left, Synced Feed on Right */}
      <div className="grid-2">
        {/* Left: Report Road Condition Form */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileSpreadsheet size={20} color="var(--teal-600)" />
                <h2>Report Road Condition</h2>
              </div>
              <p>Submit ground hazard reports from mountain patrols</p>
            </div>
            <span className="badge badge-teal">Field Ops Form</span>
          </div>

          <form onSubmit={handleSaveReport}>
            {/* Road Condition & Incident Type */}
            <div className="grid-2" style={{ gap: '14px', marginBottom: '14px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Road Condition</label>
                <select
                  className="form-select"
                  value={roadCondition}
                  onChange={(e) => setRoadCondition(e.target.value)}
                >
                  <option value="Partially Blocked">Partially Blocked (Single Lane)</option>
                  <option value="Impassable / Blocked">Impassable / Blocked (Severe Hazard)</option>
                  <option value="Passable with Caution">Passable with Caution</option>
                  <option value="Clear / Repaired">Clear / Repaired</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Incident Type</label>
                <select
                  className="form-select"
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                >
                  <option value="Landslide">Landslide / Mudslide</option>
                  <option value="Waterlogging">Waterlogging / Flash Runoff</option>
                  <option value="Bridge Damage">Bridge Damage / Culvert Structural Risk</option>
                  <option value="Tree Fall">Tree Fall / Power Line Obstruction</option>
                  <option value="Rockfall Danger">Rockfall Danger</option>
                </select>
              </div>
            </div>

            {/* Location & Severity */}
            <div className="grid-2" style={{ gap: '14px', marginBottom: '14px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Corridor Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. NH-40 Mile 42 Nongpoh Pass"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Severity Level</label>
                <select
                  className="form-select"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                >
                  <option value="High">High (Immediate Danger / Heavy Delay)</option>
                  <option value="Medium">Medium (Caution Required)</option>
                  <option value="Low">Low (Informational)</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Incident Description & Field Notes</label>
              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide specific notes on debris, equipment deployed, or alternate detours..."
                required
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              disabled={isSaving}
            >
              <Save size={18} />
              <span>{isOnline ? 'Save Field Report (Online Sync)' : 'Save Field Report (Store in IndexedDB)'}</span>
            </button>
          </form>
        </div>

        {/* Right: IndexedDB Field Reports Feed */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Database size={18} color="var(--navy-900)" />
                <h3>Recorded Field Reports</h3>
              </div>
              <p>Stored in browser IndexedDB with provenance timestamps</p>
            </div>
            {pendingOfflineCount > 0 && (
              <span className="badge badge-warning">
                {pendingOfflineCount} Pending Sync
              </span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '440px', overflowY: 'auto' }}>
            {reports.map((item) => (
              <div
                key={item.id || item.createdAt}
                style={{
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 14px',
                  backgroundColor: item.syncStatus === 'synced' ? 'white' : 'var(--warn-amber-bg)',
                  borderLeft: item.syncStatus === 'synced' ? '4px solid var(--safe-green)' : '4px solid var(--warn-amber)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--navy-900)' }}>
                    {item.incidentType} &bull; {item.roadCondition}
                  </strong>
                  <span className={`badge ${item.severity === 'High' ? 'badge-danger' : 'badge-warning'}`}>
                    {item.severity} Severity
                  </span>
                </div>

                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  {item.location}
                </div>

                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: 1.4 }}>
                  {item.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <span>Recorded: {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span style={{ fontWeight: 600, color: item.syncStatus === 'synced' ? 'var(--safe-green-dark)' : 'var(--warn-amber-dark)' }}>
                    {item.syncStatus === 'synced' ? '✓ Synced to Central Engine' : '⏳ Stored Locally in IndexedDB'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
