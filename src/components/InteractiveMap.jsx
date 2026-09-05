import React, { useState } from 'react';
import { 
  MapPin, 
  Truck, 
  AlertTriangle, 
  ShieldCheck, 
  CloudRain, 
  Navigation, 
  Info,
  Layers,
  Compass
} from 'lucide-react';
import { LOCATIONS, BASELINE_ROUTES } from '../data/mockData';

export default function InteractiveMap({
  activeRouteId = 'Route B',
  onSelectRoute,
  isDisrupted = false,
  vehicleProgress = 0.45, // 0 to 1
  showHazards = true
}) {
  const [hoveredRoute, setHoveredRoute] = useState(null);
  const [selectedHub, setSelectedHub] = useState(null);

  // Map coordinates & dimensions
  const mapWidth = 620;
  const mapHeight = 470;

  // Compute animated vehicle position along Route B
  // Route B coordinates: [220,130] -> [275,155] -> [285,190] -> [250,230]
  const p = Math.min(Math.max(vehicleProgress, 0), 1);
  let vehicleX = 220;
  let vehicleY = 130;

  if (p <= 0.33) {
    const t = p / 0.33;
    vehicleX = 220 + (275 - 220) * t;
    vehicleY = 130 + (155 - 130) * t;
  } else if (p <= 0.66) {
    const t = (p - 0.33) / 0.33;
    vehicleX = 275 + (285 - 275) * t;
    vehicleY = 155 + (190 - 155) * t;
  } else {
    const t = (p - 0.66) / 0.34;
    vehicleX = 285 + (250 - 285) * t;
    vehicleY = 190 + (230 - 190) * t;
  }

  return (
    <div className="card" style={{ padding: '16px', position: 'relative', overflow: 'hidden' }}>
      <div className="card-header" style={{ marginBottom: '10px', paddingBottom: '8px' }}>
        <div className="card-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={20} color="var(--teal-600)" />
            <h3 style={{ fontSize: '16.5px' }}>Geographical Logistics & Corridor Intelligence Map</h3>
          </div>
          <p style={{ fontSize: '12.5px' }}>
            Terrain navigation: Brahmaputra Valley (Guwahati) ↔ Meghalaya Plateau (Shillong) ↔ Barak Valley
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-teal">ULIP / PM GatiShakti Ready</span>
          <span className="badge badge-info">ACTIVE GEOGRAPHY</span>
        </div>
      </div>

      {/* SVG Map Container with Light Geographical Palette */}
      <div 
        style={{ 
          backgroundColor: '#eaf4eb', 
          borderRadius: 'var(--radius-md)', 
          border: '1.5px solid #cbd5e1',
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          boxShadow: 'inset 0 1px 6px rgba(0,0,0,0.06)'
        }}
      >
        <svg
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '440px' }}
        >
          <defs>
            {/* Soft latitude / longitude coordinate grid */}
            <pattern id="geoGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#d5e5d3" strokeWidth="0.8" />
            </pattern>

            {/* Route B (Recommended) Vibrant Green Gradient */}
            <linearGradient id="routeBGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>

            {/* Water Gradient for Brahmaputra & Umiam */}
            <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Base Land Fill & Coordinate Grid */}
          <rect width={mapWidth} height={mapHeight} fill="#edf7ed" />
          <rect width={mapWidth} height={mapHeight} fill="url(#geoGrid)" />

          {/* 1. MOUNTAIN TERRAIN / HILL ELEVATION REGIONS */}
          {/* Outer Meghalaya & Barail Hill Plateau */}
          <path
            d="M 80 170 Q 230 130 380 200 T 560 220 L 620 470 L 20 470 Z"
            fill="#d8ebd5"
            stroke="#c4dec1"
            strokeWidth="1.5"
          />
          {/* Higher Khasi Mountain Ridge Plateau */}
          <path
            d="M 160 210 Q 260 170 390 230 T 540 280 L 590 470 L 90 470 Z"
            fill="#cce3c9"
            stroke="#b5d6b0"
            strokeWidth="1.5"
          />
          {/* East Khasi Highest Elevation Escarpment */}
          <path
            d="M 210 240 Q 280 200 360 260 T 480 320 L 520 470 L 160 470 Z"
            fill="#bedbbe"
            stroke="#a6cca1"
            strokeWidth="1"
          />

          {/* Elevation Region Labels */}
          <text x="70" y="270" fill="#4d7c0f" fontSize="10" fontWeight="700" opacity="0.6" letterSpacing="1">
            MEGHALAYA PLATEAU
          </text>
          <text x="360" y="240" fill="#4d7c0f" fontSize="9" fontWeight="700" opacity="0.5" letterSpacing="1">
            EAST KHASI HILLS (1,500m+)
          </text>
          <text x="350" y="360" fill="#4d7c0f" fontSize="9" fontWeight="700" opacity="0.5" letterSpacing="1">
            BARAIL HILL RANGE
          </text>

          {/* 2. RIVERS & WATER BODIES */}
          {/* Brahmaputra River Main Basin */}
          <path
            d="M 20 120 C 120 125, 180 135, 220 125 C 280 110, 360 95, 460 85 C 510 80, 580 65, 620 60"
            fill="none"
            stroke="url(#riverGrad)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Brahmaputra River Center Flow Line */}
          <path
            d="M 20 120 C 120 125, 180 135, 220 125 C 280 110, 360 95, 460 85 C 510 80, 580 65, 620 60"
            fill="none"
            stroke="#e0f2fe"
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />
          <text x="300" y="75" fill="#0369a1" fontSize="11" fontWeight="700">
            Brahmaputra River Corridor (NW-2)
          </text>

          {/* Umiam Lake (Barapani Reservoir) */}
          <ellipse cx="265" cy="210" rx="16" ry="11" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
          <path d="M 252 210 Q 265 214 278 209" stroke="#e0f2fe" strokeWidth="1" fill="none" />
          <text x="286" y="213" fill="#0369a1" fontSize="9.5" fontWeight="700">
            Umiam Lake Reservoir
          </text>

          {/* 3. BASE HIGHWAY & CONNECTING ROAD NETWORK */}
          {/* Arterial Highway Network (White casings with slate borders) */}
          <g stroke="#94a3b8" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 220 130 L 370 80" /> {/* NH-27 to Itanagar */}
            <path d="M 250 230 L 340 310" /> {/* NH-6 to Silchar */}
            <path d="M 340 310 L 440 280" /> {/* NH-37 to Imphal */}
            <path d="M 340 310 L 330 390" /> {/* NH-54 to Aizawl */}
            <path d="M 220 130 L 190 370" /> {/* NH-8 to Agartala */}
            <path d="M 250 230 L 430 200" /> {/* NH-29 to Kohima */}
          </g>
          {/* Inner Asphalt Core of Regional Highways */}
          <g stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 220 130 L 370 80" />
            <path d="M 250 230 L 340 310" />
            <path d="M 340 310 L 440 280" />
            <path d="M 340 310 L 330 390" />
            <path d="M 220 130 L 190 370" />
            <path d="M 250 230 L 430 200" />
          </g>

          {/* 4. THREE EVALUATED CORRIDOR ROUTES (Guwahati ➔ Shillong) */}

          {/* ROUTE C: Western Jaintia Valley Detour */}
          <path
            d="M 220 130 C 160 170, 185 220, 250 230"
            fill="none"
            stroke="#64748b"
            strokeWidth={activeRouteId === 'Route C' ? 5.5 : 3.5}
            strokeDasharray="5 4"
            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            onClick={() => onSelectRoute && onSelectRoute('Route C')}
            onMouseEnter={() => setHoveredRoute('Route C')}
            onMouseLeave={() => setHoveredRoute(null)}
          />

          {/* ROUTE A: NH-40 Direct Ridge Corridor (High Risk / Critical when disrupted) */}
          <path
            d="M 220 130 Q 235 180 250 230"
            fill="none"
            stroke={isDisrupted ? '#dc2626' : '#d97706'}
            strokeWidth={activeRouteId === 'Route A' ? 6 : 4}
            strokeDasharray={isDisrupted ? '6 4' : 'none'}
            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            onClick={() => onSelectRoute && onSelectRoute('Route A')}
            onMouseEnter={() => setHoveredRoute('Route A')}
            onMouseLeave={() => setHoveredRoute(null)}
          />

          {/* ROUTE B: Recommended East Khasi Bypass (Paved, safe) */}
          <path
            d="M 220 130 C 275 145, 290 195, 250 230"
            fill="none"
            stroke="url(#routeBGrad)"
            strokeWidth={activeRouteId === 'Route B' ? 7 : 5}
            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            onClick={() => onSelectRoute && onSelectRoute('Route B')}
            onMouseEnter={() => setHoveredRoute('Route B')}
            onMouseLeave={() => setHoveredRoute(null)}
          />

          {/* Intermediate Towns along Guwahati - Shillong Highway */}
          {/* Jorabat */}
          <circle cx="258" cy="148" r="3.5" fill="#334155" stroke="#ffffff" strokeWidth="1.5" />
          <text x="266" y="151" fill="#334155" fontSize="8.5" fontWeight="600">Jorabat (km 21)</text>

          {/* Nongpoh Pass */}
          <circle cx="236" cy="180" r="3.5" fill="#334155" stroke="#ffffff" strokeWidth="1.5" />
          <text x="180" y="183" fill="#334155" fontSize="8.5" fontWeight="600">Nongpoh (km 48)</text>

          {/* Umsning */}
          <circle cx="276" cy="192" r="3.5" fill="#334155" stroke="#ffffff" strokeWidth="1.5" />
          <text x="284" y="195" fill="#334155" fontSize="8.5" fontWeight="600">Umsning (km 74)</text>

          {/* Route Floating Tags */}
          <g transform="translate(195, 172)">
            <rect width="80" height="17" rx="3" fill={isDisrupted ? '#fee2e2' : '#fef3c7'} stroke={isDisrupted ? '#ef4444' : '#f59e0b'} strokeWidth="1" />
            <text x="40" y="12" fill={isDisrupted ? '#b91c1c' : '#b45309'} fontSize="8" fontWeight="bold" textAnchor="middle">
              Route A {isDisrupted ? '⚠ CRITICAL' : '(54% Safe)'}
            </text>
          </g>

          <g transform="translate(285, 165)">
            <rect width="90" height="18" rx="3" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.2" />
            <text x="45" y="12" fill="#047857" fontSize="8.5" fontWeight="bold" textAnchor="middle">
              Route B: 92% Safe ★
            </text>
          </g>

          {/* 5. HAZARD / LANDSLIDE MARKERS */}
          {showHazards && (
            <g transform="translate(235, 176)">
              <circle r="11" fill={isDisrupted ? '#dc2626' : '#d97706'} stroke="#ffffff" strokeWidth="2" />
              <path d="M 0 -5 L 5 4 L -5 4 Z" fill="white" />
              <text x="0" y="2.5" fill={isDisrupted ? '#dc2626' : '#d97706'} fontSize="6.5" fontWeight="bold" textAnchor="middle">!</text>
            </g>
          )}

          {isDisrupted && (
            <g transform="translate(225, 142)">
              <rect width="94" height="20" rx="4" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
              <text x="47" y="13" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                ⚠ LANDSLIDE (Mile 42)
              </text>
            </g>
          )}

          {/* 6. REGIONAL HUBS & CITIES */}
          {LOCATIONS.map((loc) => {
            const isOrigin = loc.id === 'GUW';
            const isDest = loc.id === 'SHL';
            const isKeyNode = isOrigin || isDest;
            const nodeY = isDest ? 230 : loc.y;

            return (
              <g
                key={loc.id}
                transform={`translate(${loc.x}, ${nodeY})`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedHub(loc)}
              >
                {/* Hub Node Icon */}
                {isKeyNode ? (
                  <>
                    <circle
                      r="16"
                      fill={isOrigin ? 'rgba(2, 132, 199, 0.2)' : 'rgba(5, 150, 105, 0.2)'}
                      className="pulse-icon"
                    />
                    <circle
                      r="9"
                      fill={isOrigin ? '#0284c7' : '#059669'}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />
                    {/* City Callout Card */}
                    <g transform={`translate(${isOrigin ? -35 : -35}, ${isOrigin ? -34 : 14})`}>
                      <rect
                        width="110"
                        height="26"
                        rx="5"
                        fill="#ffffff"
                        stroke={isOrigin ? '#0284c7' : '#059669'}
                        strokeWidth="1.5"
                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))"
                      />
                      <text x="55" y="12" fill="var(--navy-900)" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                        {loc.name} {isOrigin ? '(Origin)' : '(Destination)'}
                      </text>
                      <text x="55" y="21" fill="var(--slate-600)" fontSize="7.5" textAnchor="middle">
                        {isOrigin ? 'Central Hub • Elev: 55m' : 'Civil Hospital • Elev: 1,525m'}
                      </text>
                    </g>
                  </>
                ) : (
                  <>
                    <circle
                      r="4.5"
                      fill="#475569"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <text
                      x={loc.x > 350 ? -8 : 10}
                      y={loc.y > 350 ? -6 : 4}
                      fill="#334155"
                      fontSize="9.5"
                      fontWeight="600"
                      textAnchor={loc.x > 350 ? 'end' : 'start'}
                    >
                      {loc.name}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* 7. LIVE MOVING VEHICLE MARKER PRV-117 */}
          <g transform={`translate(${vehicleX}, ${vehicleY})`} style={{ transition: 'transform 0.4s ease' }}>
            {/* GPS Pulse circle */}
            <circle r="20" fill="rgba(5, 150, 105, 0.25)" className="pulse-icon" />
            <circle r="11" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
            
            {/* Vehicle Icon Symbol */}
            <g transform="translate(-6.5, -6.5) scale(0.65)">
              <path d="M1 3h15v13H1z" fill="#10b981" />
              <path d="M16 8h4l3 3v5h-7V8z" fill="#34d399" />
              <circle cx="5.5" cy="18.5" r="2.5" fill="#ffffff" />
              <circle cx="18.5" cy="18.5" r="2.5" fill="#ffffff" />
            </g>

            {/* Telematics Callout Card */}
            <g transform="translate(16, -26)">
              <rect
                width="95"
                height="24"
                rx="4"
                fill="#ffffff"
                stroke="#059669"
                strokeWidth="1.2"
                filter="drop-shadow(0 2px 5px rgba(0,0,0,0.15))"
              />
              <text x="6" y="11" fill="#047857" fontSize="8.5" fontWeight="bold">PRV-117 (Medical)</text>
              <text x="6" y="20" fill="#475569" fontSize="7.5">Speed: 42 km/h • GPS OK</text>
            </g>
          </g>
        </svg>

        {/* Floating Bottom Geographical Map Info Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            right: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #cbd5e1',
            borderRadius: 'var(--radius-sm)',
            padding: '8px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            color: 'var(--navy-900)',
            fontSize: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
          }}
        >
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 600, color: '#047857' }}>
              <span style={{ width: '12px', height: '12px', backgroundColor: '#059669', borderRadius: '3px' }}></span>
              Route B: East Khasi Bypass (Recommended)
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 600, color: isDisrupted ? '#b91c1c' : '#b45309' }}>
              <span style={{ width: '12px', height: '12px', backgroundColor: isDisrupted ? '#dc2626' : '#d97706', borderRadius: '3px' }}></span>
              Route A: Old Ridge ({isDisrupted ? 'Blocked' : 'High Risk'})
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#475569' }}>
              <span style={{ width: '12px', height: '12px', backgroundColor: '#64748b', borderRadius: '3px' }}></span>
              Route C: Valley Detour
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 600, color: '#0284c7' }}>Guwahati ➔ Shillong</span>
            <span className="badge badge-success" style={{ fontSize: '10.5px', padding: '3px 8px' }}>
              Transit: {Math.round(p * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
