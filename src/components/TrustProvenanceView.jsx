import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck, 
  Lock, 
  Hash, 
  Clock, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { ANALYTICS_DATA, BASELINE_ROUTES } from '../data/mockData';

export default function TrustProvenanceView({ requests, disruptionState }) {
  const isDisrupted = disruptionState.rainfall || disruptionState.roadBlocked;

  const trustChecklist = [
    { title: 'Service Centre Verified', desc: 'Consignor identity and emergency medical payload validated via DigiLocker / GatiShakti credentials.', done: true },
    { title: 'Transporter Verified', desc: 'NorthEast Express Logistics (AS-01-GC-4482) mountain permits, insurance, and cold chain certified.', done: true },
    { title: 'Route Safety Checked', desc: 'Geospatial slope stability engine analyzed NH-40 vs NH-106 bypass with 92% confidence.', done: true },
    { title: 'GPS Updated', desc: 'Continuous 4G telematics updates received every 30 seconds from vehicle PRV-117.', done: true },
    { title: 'Field Report Recorded', desc: 'Patrol officer landslide logs safely recorded in offline IndexedDB and synced to regional hazard matrix.', done: true },
    { title: 'Delivery Confirmed', desc: 'Shillong Civil Hospital receiving supervisor digital signature and temperature audit recorded.', done: true }
  ];

  const decisionRecords = [
    {
      requestId: 'PRV-2026-0147',
      cargo: 'Medical Supplies',
      recommendedRoute: 'Route B (East Khasi Bypass)',
      accessibility: '88% (4-Lane Expressway)',
      weatherSafety: isDisrupted ? '89% (Heavy Rain Mode)' : '92% (Normal)',
      traffic: 'Flowing (Convoy Safe)',
      landslideRisk: isDisrupted ? 'Low (Protected with Mesh)' : 'Low',
      transportAvailability: 'Confirmed (4x4 All-Terrain)',
      lastUpdated: '2026-09-05 00:08:15 IST',
      auditHash: '0x8F92A1B7E4C02D19'
    },
    {
      requestId: 'PRV-2026-0148',
      cargo: 'Emergency Relief Kits',
      recommendedRoute: 'Route B (Plateau Tunnel Road)',
      accessibility: '79% (Heavy Hauler Clear)',
      weatherSafety: '81%',
      traffic: 'Moderate',
      landslideRisk: 'Low to Moderate',
      transportAvailability: 'Confirmed (12-Wheeler)',
      lastUpdated: '2026-09-04 18:22:40 IST',
      auditHash: '0x4D33B91C80EA14F2'
    },
    {
      requestId: 'PRV-2026-0149',
      cargo: 'Essential Food Grains',
      recommendedRoute: 'Route C (Valley Detour Backup)',
      accessibility: '70%',
      weatherSafety: '74%',
      traffic: 'Light',
      landslideRisk: 'Moderate',
      transportAvailability: 'Queued in Dispatch',
      lastUpdated: '2026-09-04 22:15:02 IST',
      auditHash: '0x1C88E090FA77D305'
    }
  ];

  return (
    <div>
      <div className="card-header" style={{ marginBottom: '20px', paddingBottom: '12px' }}>
        <div className="card-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={22} color="var(--teal-600)" />
            <h2>Trust, Verification & Provenance Registry</h2>
          </div>
          <p>
            Cryptographically logged decision trails ensuring transparency and safety compliance
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-success">✓ End-to-End Audited</span>
          <span className="badge badge-info">DECISION LEDGER</span>
        </div>
      </div>

      {/* Trust Checklist 6-Point Chain */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div className="card-title-group">
            <h3>PRAVAHA 6-Point Verification Chain</h3>
            <p>Every mountain consignment undergoes rigorous multi-tier provenance logging</p>
          </div>
          <span className="badge badge-teal">100% VERIFIED</span>
        </div>

        <div className="grid-3" style={{ gap: '14px' }}>
          {trustChecklist.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--safe-green-bg)',
                border: '1px solid #a7f3d0',
                borderRadius: 'var(--radius-md)',
                padding: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <CheckCircle2 size={18} color="var(--safe-green)" />
                <strong style={{ fontSize: '14px', color: 'var(--navy-900)' }}>
                  ✓ {item.title}
                </strong>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ROUTE DECISION RECORD Table */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div className="card-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCheck size={18} color="var(--navy-900)" />
              <h3>ROUTE DECISION RECORD</h3>
            </div>
            <p>Transparent auditable ledger of routing engine inputs, hazard weights, and timestamped rationale</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <Lock size={14} color="var(--teal-600)" />
            <span>Immutable Hash Auditing</span>
          </div>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Cargo Details</th>
                <th>Recommended Route</th>
                <th>Road Accessibility</th>
                <th>Weather Safety</th>
                <th>Landslide Risk</th>
                <th>Transport Availability</th>
                <th>Audit Hash</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {decisionRecords.map((rec) => (
                <tr key={rec.requestId}>
                  <td>
                    <strong style={{ color: 'var(--teal-600)', fontFamily: 'monospace' }}>{rec.requestId}</strong>
                  </td>
                  <td>{rec.cargo}</td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--navy-900)' }}>{rec.recommendedRoute}</span>
                  </td>
                  <td>{rec.accessibility}</td>
                  <td>
                    <span className="badge badge-success" style={{ fontSize: '11px', padding: '2px 6px' }}>
                      {rec.weatherSafety}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-teal" style={{ fontSize: '11px', padding: '2px 6px' }}>
                      {rec.landslideRisk}
                    </span>
                  </td>
                  <td>{rec.transportAvailability}</td>
                  <td>
                    <code style={{ fontSize: '11px', backgroundColor: 'var(--bg-subtle)', padding: '2px 6px', borderRadius: '4px' }}>
                      {rec.auditHash}
                    </code>
                  </td>
                  <td style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{rec.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Integrity & Compliance Footer */}
      <div className="card" style={{ backgroundColor: 'var(--bg-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Sparkles size={16} color="var(--teal-600)" />
          <strong style={{ fontSize: '13.5px' }}>Transparency & Governance Standard</strong>
        </div>
        <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          All route recommendations and hazard assessments are reproducible. In production deployments, each decision is signed by the PRAVAHA Routing Engine private key to ensure non-repudiation and prevent unauthorized route tampering during regional emergencies.
        </p>
      </div>
    </div>
  );
}
