import React from 'react';
import { HelpCircle, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

const TAB_GUIDES = {
  landing: {
    where: 'PRAVAHA Portal Overview & Role Selection',
    happening: 'Explore how PRAVAHA connects Service Centres, Transporters, and Regional Command.',
    next: 'Choose a role card below or click "Run Demo Scenario" to experience the end-to-end flow.'
  },
  service_centre: {
    where: 'Service Centre Console (Consignor / Hospital / Relief Depot)',
    happening: 'Create and dispatch essential delivery requests across high-risk mountain terrain.',
    next: 'Fill the form (or use demo pre-fill) and click "Create Delivery Request" to watch the 5-step safety check.'
  },
  transport_provider: {
    where: 'Transport Provider & Fleet Operator Dashboard',
    happening: 'Review available consignments with pre-verified safety indices and accessibility ratings.',
    next: 'Click "Accept Delivery" on request PRV-2026-0147 to mobilize vehicle AS-01-GC-4482.'
  },
  route_intelligence: {
    where: 'Route & Hazard Intelligence Engine',
    happening: 'Comparing Route A (direct/steep), Route B (reinforced bypass), and Route C (valley detour).',
    next: 'Try clicking "Simulate Heavy Rainfall" or "Simulate Road Disruption" to see dynamic recalculation.'
  },
  vehicle_tracking: {
    where: 'Vehicle Tracking & Real-time Corridor Map',
    happening: 'Tracking vehicle PRV-117 in transit between Guwahati and Shillong.',
    next: 'Click "Simulate Vehicle Movement" to watch the GPS position advance along Route B.'
  },
  field_operations: {
    where: 'Offline Field Operations & Incident Reporter',
    happening: 'Field patrol reporting road hazards in low-connectivity mountain passes.',
    next: 'Toggle "Simulate Offline Mode", submit a report to IndexedDB, then click "Restore Network" to sync.'
  },
  multimodal: {
    where: 'Multimodal Transport Advisor (ULIP / PM GatiShakti Ready)',
    happening: 'Evaluating Road vs Rail vs Inland Waterway (Brahmaputra NW-2) resilience.',
    next: 'Check how alternate modes activate when mountain highway corridors are restricted.'
  },
  alert_centre: {
    where: 'Regional Alert & Multilingual Warning Centre (Bhashini Ready)',
    happening: 'Broadcasting categorized hazard alerts across North-Eastern regional languages.',
    next: 'Switch languages at the top right to view localized hazard advisories.'
  },
  trust_provenance: {
    where: 'Trust Verification & Auditable Decision Records',
    happening: 'Every step from request creation to delivery confirmation is verified.',
    next: 'Examine the cryptographic-style Route Decision Record table for complete transparency.'
  },
  analytics: {
    where: 'Regional Accessibility & Corridor Analytics',
    happening: 'Visualizing delivery completion rates, incident breakdowns, and state accessibility scores.',
    next: 'Review connectivity indices across Assam, Meghalaya, Mizoram, Manipur, and Tripura.'
  }
};

export default function RoleGuideModal({ activeTab }) {
  const guide = TAB_GUIDES[activeTab] || TAB_GUIDES.landing;

  return (
    <div className="orientation-banner">
      <div className="orientation-content">
        <div className="orientation-icon-box">
          <HelpCircle size={20} />
        </div>
        <div>
          <div className="orientation-title">
            <span style={{ color: 'var(--teal-600)', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
              Where am I? &bull;{' '}
            </span>
            {guide.where}
          </div>
          <div className="orientation-desc">
            <strong>What is happening?</strong> {guide.happening}
          </div>
        </div>
      </div>
      <div className="orientation-action">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <strong>Next Step:</strong> {guide.next}
        </span>
      </div>
    </div>
  );
}
