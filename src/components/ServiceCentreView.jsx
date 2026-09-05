import React, { useState } from 'react';
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  Truck, 
  Calendar, 
  MapPin, 
  Package, 
  AlertCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { LOCATIONS } from '../data/mockData';

export default function ServiceCentreView({
  requests,
  onCreateRequest,
  onViewTransporter
}) {
  const [pickup, setPickup] = useState('Guwahati');
  const [destination, setDestination] = useState('Shillong');
  const [cargo, setCargo] = useState('Medical Supplies');
  const [priority, setPriority] = useState('High');
  const [requiredDate, setRequiredDate] = useState('2026-09-05');
  const [specialReq, setSpecialReq] = useState('Temperature Controlled (2°C - 8°C), 4x4 Mountain Fleet Required');
  
  // Animation state when submitting
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [matchProgressStep, setMatchProgressStep] = useState(0); // 0 to 5
  const [createdOrder, setCreatedOrder] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMatchProgressStep(1); // 1: Request Created

    // Step 2: Searching transport providers
    setTimeout(() => {
      setMatchProgressStep(2);
    }, 700);

    // Step 3: Checking accessibility
    setTimeout(() => {
      setMatchProgressStep(3);
    }, 1400);

    // Step 4: Checking weather & hazard conditions
    setTimeout(() => {
      setMatchProgressStep(4);
    }, 2100);

    // Step 5: Finding safest route & finalizing match
    setTimeout(() => {
      setMatchProgressStep(5);
      
      const newId = `PRV-2026-0${Math.floor(140 + Math.random() * 850)}`;
      const newReq = {
        id: newId,
        pickup,
        destination,
        cargo,
        cargoCategory: cargo.includes('Medical') ? 'Critical Healthcare' : 'General Freight',
        weightKg: 850,
        priority,
        requiredDate,
        specialRequirements: specialReq,
        status: 'Ready for Dispatch',
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
        createdAt: new Date().toISOString()
      };

      onCreateRequest(newReq);
      setCreatedOrder(newReq);
      setIsSubmitting(false);
    }, 2900);
  };

  const handlePreFillDemo = () => {
    setPickup('Guwahati');
    setDestination('Shillong');
    setCargo('Medical Supplies');
    setPriority('High');
    setRequiredDate('2026-09-05');
    setSpecialReq('Temperature Controlled (2°C - 8°C), 4x4 Mountain Fleet Required');
  };

  return (
    <div>
      <div className="grid-2">
        {/* Left: Delivery Request Form */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={20} color="var(--blue-600)" />
                <h2>Create Delivery Request</h2>
              </div>
              <p>Dispatch essential medical supplies or relief cargo across the region</p>
            </div>
            <button 
              className="btn btn-outline btn-sm" 
              onClick={handlePreFillDemo}
              title="Pre-fill standard medical supply scenario"
            >
              <Sparkles size={13} />
              <span>Demo Fill</span>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Origin & Destination */}
            <div className="grid-2" style={{ gap: '14px', marginBottom: '14px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Pickup Location</label>
                <select 
                  className="form-select" 
                  value={pickup} 
                  onChange={(e) => setPickup(e.target.value)}
                  disabled={isSubmitting}
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.name} ({loc.state})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Destination</label>
                <select 
                  className="form-select" 
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value)}
                  disabled={isSubmitting}
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.name} ({loc.state})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cargo Type & Priority */}
            <div className="grid-2" style={{ gap: '14px', marginBottom: '14px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Cargo Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  placeholder="e.g. Medical Supplies, Vaccines"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Priority</label>
                <select 
                  className="form-select" 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="High">High (Emergency / Life Saving)</option>
                  <option value="Medium">Medium (Essential Goods)</option>
                  <option value="Normal">Normal (General Freight)</option>
                </select>
              </div>
            </div>

            {/* Required Date & Special Requirements */}
            <div className="form-group">
              <label className="form-label">Required Delivery Date</label>
              <input
                type="date"
                className="form-control"
                value={requiredDate}
                onChange={(e) => setRequiredDate(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Special Requirements</label>
              <input
                type="text"
                className="form-control"
                value={specialReq}
                onChange={(e) => setSpecialReq(e.target.value)}
                placeholder="e.g. Cold Chain Storage, Heavy Terrain"
                disabled={isSubmitting}
              />
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="pulse-icon" />
                  <span>Processing Logistics Intelligence...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Create Delivery Request</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Live Safety Pipeline & Matched Provider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Intelligence Progression Checklist */}
          <div className="card">
            <div className="card-header">
              <div className="card-title-group">
                <h3>PRAVAHA Verification Pipeline</h3>
                <p>Real-time checks conducted before dispatching mountain consignments</p>
              </div>
              <span className="badge badge-simulated">SIMULATED ENGINE</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className={`check-item ${matchProgressStep >= 1 ? 'done' : ''}`}>
                <CheckCircle2 size={16} color={matchProgressStep >= 1 ? 'var(--safe-green)' : 'var(--slate-400)'} />
                <span>Request Created</span>
              </div>

              <div className={`check-item ${matchProgressStep >= 2 ? 'done' : matchProgressStep === 1 ? 'active' : ''}`}>
                <CheckCircle2 size={16} color={matchProgressStep >= 2 ? 'var(--safe-green)' : 'var(--slate-400)'} />
                <span>Searching for verified transport providers</span>
              </div>

              <div className={`check-item ${matchProgressStep >= 3 ? 'done' : matchProgressStep === 2 ? 'active' : ''}`}>
                <CheckCircle2 size={16} color={matchProgressStep >= 3 ? 'var(--safe-green)' : 'var(--slate-400)'} />
                <span>Checking regional accessibility & road grades (PM GatiShakti)</span>
              </div>

              <div className={`check-item ${matchProgressStep >= 4 ? 'done' : matchProgressStep === 3 ? 'active' : ''}`}>
                <CheckCircle2 size={16} color={matchProgressStep >= 4 ? 'var(--safe-green)' : 'var(--slate-400)'} />
                <span>Checking weather and landslide hazard conditions</span>
              </div>

              <div className={`check-item ${matchProgressStep >= 5 ? 'done' : matchProgressStep === 4 ? 'active' : ''}`}>
                <CheckCircle2 size={16} color={matchProgressStep >= 5 ? 'var(--safe-green)' : 'var(--slate-400)'} />
                <span>Finding the safest practical route (Route B Recommended)</span>
              </div>
            </div>
          </div>

          {/* Matched Transporter Confirmation Card */}
          {(createdOrder || requests[0]) && (
            <div 
              className="card" 
              style={{ 
                border: '2px solid var(--teal-600)', 
                backgroundColor: 'var(--teal-50)',
                animation: 'fadeIn 0.4s ease'
              }}
            >
              <div className="card-header" style={{ borderBottomColor: 'var(--teal-100)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={20} color="var(--teal-600)" />
                    <h3 style={{ color: 'var(--navy-900)' }}>
                      Matched Transporter: {createdOrder?.id || requests[0].id}
                    </h3>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--slate-600)' }}>
                    Verified All-Terrain Transport Provider Assigned
                  </div>
                </div>
                <span className="badge badge-success">✓ Verified & Ready</span>
              </div>

              <div style={{ marginBottom: '14px', fontSize: '13px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                  <div><strong>Transporter:</strong> NorthEast Express Logistics</div>
                  <div><strong>Vehicle:</strong> AS-01-GC-4482 (4x4)</div>
                  <div><strong>Driver:</strong> Biren Gogoi</div>
                  <div><strong>Route:</strong> Route B (East Khasi Bypass)</div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span className="badge badge-success">Route Safety: 92%</span>
                  <span className="badge badge-info">Accessibility: 88%</span>
                  <span className="badge badge-simulated">ETA: 4h 20m (121 km)</span>
                </div>
              </div>

              <button
                className="btn btn-navy btn-sm"
                style={{ width: '100%' }}
                onClick={() => onViewTransporter && onViewTransporter()}
              >
                <span>Proceed to Transport Provider Dashboard</span>
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
