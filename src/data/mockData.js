// PRAVAHA Simulated Data & Regional Logistics Knowledge Base

export const LOCATIONS = [
  { id: 'GUW', name: 'Guwahati', state: 'Assam', lat: 26.1445, lng: 91.7362, hubType: 'Central Hub', x: 220, y: 130 },
  { id: 'SHL', name: 'Shillong', state: 'Meghalaya', lat: 25.5788, lng: 91.8933, hubType: 'Hill Depot', x: 250, y: 220 },
  { id: 'SIL', name: 'Silchar', state: 'Assam (Barak)', lat: 24.8333, lng: 92.7789, hubType: 'Valley Hub', x: 340, y: 310 },
  { id: 'IMP', name: 'Imphal', state: 'Manipur', lat: 24.8170, lng: 93.9368, hubType: 'Border Depot', x: 440, y: 280 },
  { id: 'KOH', name: 'Kohima', state: 'Nagaland', lat: 25.6751, lng: 94.1086, hubType: 'High Altitude', x: 430, y: 200 },
  { id: 'AIZ', name: 'Aizawl', state: 'Mizoram', lat: 23.7271, lng: 92.7176, hubType: 'Ridge Hub', x: 330, y: 390 },
  { id: 'AGT', name: 'Agartala', state: 'Tripura', lat: 23.8315, lng: 91.2868, hubType: 'Border Terminal', x: 190, y: 370 },
  { id: 'ITA', name: 'Itanagar', state: 'Arunachal Pradesh', lat: 27.0844, lng: 93.6053, hubType: 'Foothills Depot', x: 370, y: 80 }
];

export const INITIAL_REQUESTS = [
  {
    id: 'PRV-2026-0147',
    pickup: 'Guwahati',
    destination: 'Shillong',
    cargo: 'Medical Supplies',
    cargoCategory: 'Critical Healthcare',
    weightKg: 850,
    priority: 'High',
    requiredDate: '2026-09-05',
    specialRequirements: 'Temperature Controlled (2°C - 8°C), 4x4 Mountain Fleet Required',
    status: 'Ready for Dispatch', // 'Pending', 'Matched', 'Accepted', 'In Transit', 'Delivered'
    matchedTransporter: {
      id: 'TRP-884',
      name: 'NorthEast Express Logistics',
      fleetType: 'Refrigerated 4x4 All-Terrain',
      rating: 4.9,
      verified: true,
      vehicleNumber: 'AS-01-GC-4482',
      driverName: 'Biren Gogoi',
      driverContact: '+91 98640 XXXXX'
    },
    distanceKm: 121,
    estimatedTime: '4h 20m',
    routeSafety: 92,
    accessibility: 88,
    selectedRoute: 'Route B (East Khasi Bypass)',
    createdAt: '2026-09-05T00:05:00Z'
  },
  {
    id: 'PRV-2026-0148',
    pickup: 'Guwahati',
    destination: 'Silchar',
    cargo: 'Emergency Relief Kits',
    cargoCategory: 'Disaster Relief',
    weightKg: 2400,
    priority: 'High',
    requiredDate: '2026-09-06',
    specialRequirements: 'Heavy Payload, Tarpaulin Covered',
    status: 'Matched',
    matchedTransporter: {
      id: 'TRP-502',
      name: 'Brahmaputra Heavy Freight',
      fleetType: 'Heavy 12-Wheeler Hauler',
      rating: 4.7,
      verified: true,
      vehicleNumber: 'AS-01-JC-8912',
      driverName: 'Tarun Kalita',
      driverContact: '+91 94350 XXXXX'
    },
    distanceKm: 310,
    estimatedTime: '8h 45m',
    routeSafety: 81,
    accessibility: 79,
    selectedRoute: 'Route B (Meghalaya Plateau Tunnel Road)',
    createdAt: '2026-09-04T18:20:00Z'
  },
  {
    id: 'PRV-2026-0149',
    pickup: 'Shillong',
    destination: 'Imphal',
    cargo: 'Essential Commodities & Grains',
    cargoCategory: 'General Freight',
    weightKg: 3500,
    priority: 'Medium',
    requiredDate: '2026-09-07',
    specialRequirements: 'Standard Cargo',
    status: 'Pending',
    matchedTransporter: null,
    distanceKm: 420,
    estimatedTime: '12h 15m',
    routeSafety: 74,
    accessibility: 70,
    selectedRoute: 'Evaluating...',
    createdAt: '2026-09-04T22:10:00Z'
  }
];

export const BASELINE_ROUTES = [
  {
    id: 'Route A',
    name: 'NH-40 Direct Ridge Corridor',
    via: 'Direct Mountain Ascent via Nongpoh Old Pass',
    distanceKm: 98,
    normalEta: '3h 40m',
    normalSafety: 54,
    normalAccessibility: 61,
    normalRisk: 'HIGH',
    disruptedEta: '5h 30m (Delayed)',
    disruptedSafety: 28,
    disruptedAccessibility: 35,
    disruptedRisk: 'CRITICAL',
    landslideRisk: 'High (Active Mudslide Zone at km 42)',
    roadQuality: 'Steep Inclines, Unpaved Shoulders',
    elevationGain: '1,450m',
    bridgeStatus: 'Caution (Single Lane Bailey Bridge)',
    pathCoords: [
      { x: 220, y: 130 },
      { x: 232, y: 165 },
      { x: 240, y: 195 },
      { x: 250, y: 220 }
    ],
    explanationDefault: 'Direct highway segment is currently prone to rockfalls due to seasonal slope saturation. Not recommended for critical transit.',
    explanationDisrupted: 'Active mudslide confirmed at Mile 38. Highway completely restricted to single-file convoy. High probability of vehicle entrapment.'
  },
  {
    id: 'Route B',
    name: 'NH-106 East Khasi Bypass (Recommended)',
    via: 'Reinforced 4-Lane Hill Expressway via Jorabat & Umiam Viaduct',
    distanceKm: 121,
    normalEta: '4h 20m',
    normalSafety: 92,
    normalAccessibility: 88,
    normalRisk: 'LOW',
    disruptedEta: '4h 30m',
    disruptedSafety: 89,
    disruptedAccessibility: 85,
    disruptedRisk: 'LOW',
    landslideRisk: 'Low (Concrete Retaining Mesh & Catch Fences)',
    roadQuality: 'Paved Asphalt with Drainage Culverts',
    elevationGain: '1,200m (Gradual Grade)',
    bridgeStatus: 'Clear (Dual-Span Reinforced Concrete Bridge)',
    pathCoords: [
      { x: 220, y: 130 },
      { x: 270, y: 155 },
      { x: 280, y: 190 },
      { x: 250, y: 220 }
    ],
    explanationDefault: 'PRAVAHA recommends Route B because it features reinforced hillside retaining walls, continuous 4G telematics coverage, and wide 4-lane mountain safety standards.',
    explanationDisrupted: 'During heavy rainfall and road disruptions, Route B remains resilient. The modern drainage culverts and slope nets prevent blockages, ensuring safe passage.'
  },
  {
    id: 'Route C',
    name: 'Western Jaintia Valley Detour',
    via: 'Lower Valley Highway & Secondary Arterial Road',
    distanceKm: 156,
    normalEta: '5h 10m',
    normalSafety: 76,
    normalAccessibility: 72,
    normalRisk: 'MEDIUM',
    disruptedEta: '5h 45m',
    disruptedSafety: 70,
    disruptedAccessibility: 68,
    disruptedRisk: 'MEDIUM',
    landslideRisk: 'Moderate (River Basin Siltation)',
    roadQuality: 'Dual Lane State Highway',
    elevationGain: '950m',
    bridgeStatus: 'Operational (Weight Restriction 20 Tons)',
    pathCoords: [
      { x: 220, y: 130 },
      { x: 185, y: 170 },
      { x: 200, y: 215 },
      { x: 250, y: 220 }
    ],
    explanationDefault: 'Secondary valley route with gentle gradient, but adds 35km extra distance and slower speeds.',
    explanationDisrupted: 'Usable backup if Route B encounters unforeseen local traffic bottlenecks.'
  }
];

export const INITIAL_FIELD_REPORTS = [
  {
    id: 1,
    incidentType: 'Landslide',
    roadCondition: 'Partially Blocked',
    location: 'NH-40 Mile 42, Nongpoh Corridor',
    severity: 'High',
    description: 'Fresh debris and mudfall on northbound lane. Single lane traffic moving slowly. PWD earthmover deployed.',
    reporterRole: 'Border Road Patrol Officer',
    createdAt: '2026-09-04T23:15:00Z',
    syncStatus: 'synced',
    storedIn: 'IndexedDB (Offline Verified)'
  },
  {
    id: 2,
    incidentType: 'Waterlogging',
    roadCondition: 'Passable with Caution',
    location: 'Jorabat Low-Lying Culvert Crossing',
    severity: 'Medium',
    description: 'Water accumulation of approx 15cm due to pre-monsoon storm runoff. High clearance vehicles safe.',
    reporterRole: 'Regional Transport Inspector',
    createdAt: '2026-09-04T21:40:00Z',
    syncStatus: 'synced',
    storedIn: 'IndexedDB (Offline Verified)'
  }
];

export const MULTIMODAL_NETWORK = [
  {
    mode: 'ROAD',
    title: 'National Highway Corridor (NH-6 / NH-27)',
    status: 'Available',
    disruptedStatus: 'Partially Disrupted',
    capacity: '8,500 Tons/day',
    transitTime: '4 - 10 Hours',
    resilienceScore: '78%',
    integrationBadge: 'ULIP Verified'
  },
  {
    mode: 'RAIL',
    title: 'Northeast Frontier Railway (Guwahati - Lumding - Silchar Hill Section)',
    status: 'Available',
    disruptedStatus: 'Available (Priority Freight Activated)',
    capacity: '14,000 Tons/day',
    transitTime: '6 - 12 Hours',
    resilienceScore: '94%',
    integrationBadge: 'PM GatiShakti Ready'
  },
  {
    mode: 'WATERWAY',
    title: 'National Waterway 2 (Brahmaputra River - Pandu Multi-Modal Port)',
    status: 'Alternative',
    disruptedStatus: 'Active Alternative for Bulk Supply',
    capacity: '20,000 Tons/barge fleet',
    transitTime: '18 - 24 Hours',
    resilienceScore: '91%',
    integrationBadge: 'Inland Waterways Ready'
  }
];

export const ANALYTICS_DATA = {
  dailyRequests: [
    { day: 'Mon', count: 12, completed: 11 },
    { day: 'Tue', count: 18, completed: 17 },
    { day: 'Wed', count: 15, completed: 15 },
    { day: 'Thu', count: 24, completed: 23 },
    { day: 'Fri', count: 21, completed: 20 },
    { day: 'Sat', count: 16, completed: 16 },
    { day: 'Sun', count: 9, completed: 9 }
  ],
  routeRiskEvents: [
    { type: 'Landslide', count: 8, color: '#ef4444' },
    { type: 'Flood', count: 5, color: '#38bdf8' },
    { type: 'Road Blockage', count: 11, color: '#f59e0b' },
    { type: 'Heavy Rain', count: 14, color: '#6366f1' }
  ],
  regionalAccessibility: [
    { state: 'Assam', score: 86, color: '#10b981', status: 'High Connectivity' },
    { state: 'Meghalaya', score: 72, color: '#f59e0b', status: 'Moderate Hill Risk' },
    { state: 'Mizoram', score: 68, color: '#f59e0b', status: 'Slope Caution' },
    { state: 'Manipur', score: 75, color: '#10b981', status: 'Good Transit' },
    { state: 'Tripura', score: 88, color: '#10b981', status: 'Stable Flat Corridor' },
    { state: 'Nagaland', score: 69, color: '#f59e0b', status: 'High Gradient' },
    { state: 'Arunachal Pradesh', score: 64, color: '#ef4444', status: 'Extreme Mountain Slopes' }
  ],
  historicalIncidents: [
    { category: 'Road Accidents', count: 18, color: '#ef4444', impact: 'High Impact on Corridor Safety' },
    { category: 'Transportation Losses', count: 11, color: '#f97316', impact: 'Cargo Damage in Mountain Passes' },
    { category: 'Road Blockages', count: 24, color: '#f59e0b', impact: 'Severe Bottlenecks & Gridlock' },
    { category: 'Landslide Incidents', count: 14, color: '#dc2626', impact: 'Slope Failures on NH-40/NH-6' },
    { category: 'Flood Disruptions', count: 9, color: '#0284c7', impact: 'River Basin Runoff & Siltation' },
    { category: 'Delivery Delays', count: 21, color: '#8b5cf6', impact: 'Transit Schedule Slippage' }
  ],
  safetyAuditHash: '0x8F92A1B7E4C02D19'
};

// 16-Step Guided Scenario Workflow for live presentation
export const DEMO_SCENARIO_STEPS = [
  {
    step: 1,
    title: '1. Service Centre creates delivery request',
    role: 'service_centre',
    summary: 'Consignor files medical supply delivery request for Shillong Civil Hospital.',
    actionDescription: 'Review the delivery form with Guwahati → Shillong details and click "Create Delivery Request".'
  },
  {
    step: 2,
    title: '2. PRAVAHA searches & matches transporter',
    role: 'service_centre',
    summary: 'PRAVAHA scans the mountain fleet network for verified 4x4 vehicles with temperature control.',
    actionDescription: 'System verifies Transporter "NorthEast Express Logistics" (AS-01-GC-4482).'
  },
  {
    step: 3,
    title: '3. Transporter accepts delivery',
    role: 'transport_provider',
    summary: 'Transporter checks cargo weight, route safety rating, and accepts consignment dispatch.',
    actionDescription: 'Click "Accept Delivery" on request PRV-2026-0147.'
  },
  {
    step: 4,
    title: '4. Hazard engine evaluates terrain',
    role: 'route_intelligence',
    summary: 'Multi-corridor safety analyzer assesses slope stability, rainfall, and bridge load limits.',
    actionDescription: 'Comparing Route A (54% safety) vs Route B (92% safety) vs Route C (76% safety).'
  },
  {
    step: 5,
    title: '5. Route B recommended as safest route',
    role: 'route_intelligence',
    summary: 'PRAVAHA selects Route B due to reinforced retaining walls and low landslide vulnerability.',
    actionDescription: 'Justification badge highlights safety score of 92%.'
  },
  {
    step: 6,
    title: '6. Vehicle PRV-117 begins journey',
    role: 'vehicle_tracking',
    summary: 'Vehicle departs Guwahati Central Hub along the recommended Route B corridor.',
    actionDescription: 'GPS telematics activated. Vehicle marker moves along the live map.'
  },
  {
    step: 7,
    title: '7. Heavy rainfall storm simulated',
    role: 'route_intelligence',
    summary: 'Sudden high-intensity cloudburst hits the Meghalaya escarpment.',
    actionDescription: 'Trigger "Simulate Heavy Rainfall" disruption event.'
  },
  {
    step: 8,
    title: '8. Route conditions change dynamically',
    role: 'route_intelligence',
    summary: 'Route A risk escalates to CRITICAL (28% safety) while Route B maintains 89% safety.',
    actionDescription: 'Visual hazard matrix highlights increased mudslide probability.'
  },
  {
    step: 9,
    title: '9. PRAVAHA recalculates safest path',
    role: 'route_intelligence',
    summary: 'Intelligence engine updates route instructions and alerts convoy driver in real time.',
    actionDescription: 'Driver advised to maintain speed on Route B expressway bypass.'
  },
  {
    step: 10,
    title: '10. High-priority corridor alert broadcast',
    role: 'alert_centre',
    summary: 'Automated hazard bulletin generated across regional control centers and Bhashini languages.',
    actionDescription: 'View multilingual alerts in Assamese, Bengali, Hindi, and Nepali.'
  },
  {
    step: 11,
    title: '11. Field patrol encounters road hazard',
    role: 'field_operations',
    summary: 'Highway inspection officer spots rockfall near mile 42 during heavy rain.',
    actionDescription: 'Field worker prepares incident report.'
  },
  {
    step: 12,
    title: '12. Report saved offline in IndexedDB',
    role: 'field_operations',
    summary: 'Cellular connectivity drops in the mountain valley. Report is stored locally in IndexedDB.',
    actionDescription: 'Notice the red 🔴 OFFLINE badge and local storage confirmation.'
  },
  {
    step: 13,
    title: '13. Network connectivity restored',
    role: 'field_operations',
    summary: 'Field vehicle moves back into cell tower range.',
    actionDescription: 'Click "Restore Network" to reconnect.'
  },
  {
    step: 14,
    title: '14. Offline report syncs to PRAVAHA cloud',
    role: 'field_operations',
    summary: 'Cached report in IndexedDB immediately uploads and confirms: "✓ Report Synced".',
    actionDescription: 'Regional hazard engine registers incident.'
  },
  {
    step: 15,
    title: '15. Vehicle PRV-117 nears Shillong',
    role: 'vehicle_tracking',
    summary: 'Medical cargo vehicle navigates the safe bypass safely and enters Shillong city limits.',
    actionDescription: 'Vehicle marker completes final waypoint.'
  },
  {
    step: 16,
    title: '16. Delivery confirmed & provenance logged',
    role: 'trust_provenance',
    summary: 'Shillong Civil Hospital receives intact medical cargo. End-to-end trust audit is logged.',
    actionDescription: 'View verified audit record with cryptographic hash.'
  }
];
