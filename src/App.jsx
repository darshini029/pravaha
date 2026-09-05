import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RoleGuideModal from './components/RoleGuideModal';
import DemoWorkflowController from './components/DemoWorkflowController';
import LandingView from './components/LandingView';
import ServiceCentreView from './components/ServiceCentreView';
import TransportProviderView from './components/TransportProviderView';
import RouteIntelligenceView from './components/RouteIntelligenceView';
import VehicleTrackingView from './components/VehicleTrackingView';
import FieldOperationsView from './components/FieldOperationsView';
import MultimodalView from './components/MultimodalView';
import AlertCentreView from './components/AlertCentreView';
import TrustProvenanceView from './components/TrustProvenanceView';
import AnalyticsView from './components/AnalyticsView';

import { INITIAL_REQUESTS, DEMO_SCENARIO_STEPS } from './data/mockData';
import { getStorageItem, setStorageItem, clearPravahaStorage } from './utils/storage';

export default function App() {
  // Global View Navigation
  const [activeTab, setActiveTab] = useState('landing');
  const [isOnline, setIsOnline] = useState(true);
  const [language, setLanguage] = useState('en');

  // Delivery Requests State
  const [requests, setRequests] = useState(() => {
    return getStorageItem('REQUESTS', INITIAL_REQUESTS);
  });

  // Environmental Hazard Disruption Simulation State
  const [disruptionState, setDisruptionState] = useState(() => {
    return getStorageItem('DISRUPTIONS', { rainfall: false, roadBlocked: false, flood: false });
  });

  // Vehicle Telematics & Tracking State
  const [selectedRouteId, setSelectedRouteId] = useState('Route B');
  const [vehicleProgress, setVehicleProgress] = useState(0.42);
  const [isVehicleMoving, setIsVehicleMoving] = useState(false);

  // 16-Step Guided Scenario Workflow State
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunningAuto, setIsRunningAuto] = useState(false);

  // Persist state changes
  useEffect(() => {
    setStorageItem('REQUESTS', requests);
  }, [requests]);

  useEffect(() => {
    setStorageItem('DISRUPTIONS', disruptionState);
  }, [disruptionState]);

  // Handle Disruption Toggles
  const handleToggleDisruption = (type) => {
    setDisruptionState((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleResetDisruptions = () => {
    setDisruptionState({ rainfall: false, roadBlocked: false, flood: false });
  };

  // Handle Request Creation
  const handleCreateRequest = (newReq) => {
    setRequests((prev) => [newReq, ...prev]);
  };

  // Handle Transporter Accepting Load
  const handleAcceptDelivery = (reqId) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'Accepted' } : r))
    );
  };

  // Reset all application data
  const handleResetData = () => {
    clearPravahaStorage();
    setRequests(INITIAL_REQUESTS);
    setDisruptionState({ rainfall: false, roadBlocked: false, flood: false });
    setSelectedRouteId('Route B');
    setVehicleProgress(0.05);
    setIsVehicleMoving(false);
    setIsDemoRunning(false);
    setCurrentStepIndex(0);
    setIsRunningAuto(false);
    setIsOnline(true);
    setActiveTab('landing');
  };

  // 16-Step Demo Scenario Handler
  const handleStartDemo = () => {
    setIsDemoRunning(true);
    setCurrentStepIndex(0);
    applyDemoStepEffects(0);
  };

  const handleStepChange = (index) => {
    setCurrentStepIndex(index);
    applyDemoStepEffects(index);
  };

  const applyDemoStepEffects = (stepIndex) => {
    const stepConfig = DEMO_SCENARIO_STEPS[stepIndex];
    if (!stepConfig) return;

    // Switch view to relevant screen
    setActiveTab(stepConfig.role);

    // Apply simulation mutations based on the specific demo step
    switch (stepIndex) {
      case 0: // Step 1: Service centre creation
        setVehicleProgress(0.05);
        setDisruptionState({ rainfall: false, roadBlocked: false, flood: false });
        break;
      case 1: // Step 2: Matched transporter
        break;
      case 2: // Step 3: Transporter accepts
        handleAcceptDelivery('PRV-2026-0147');
        break;
      case 3: // Step 4: Hazard check
        setSelectedRouteId('Route B');
        break;
      case 4: // Step 5: Route B recommended
        setSelectedRouteId('Route B');
        break;
      case 5: // Step 6: Vehicle starts moving
        setVehicleProgress(0.25);
        setIsVehicleMoving(true);
        break;
      case 6: // Step 7: Rainfall storm simulated
        setDisruptionState({ rainfall: true, roadBlocked: false, flood: false });
        break;
      case 7: // Step 8: Road conditions change (Landslide)
        setDisruptionState({ rainfall: true, roadBlocked: true, flood: false });
        break;
      case 8: // Step 9: Route recalculation
        setSelectedRouteId('Route B');
        break;
      case 9: // Step 10: Alert broadcast
        break;
      case 10: // Step 11: Field report
        break;
      case 11: // Step 12: Offline mode saved
        setIsOnline(false);
        break;
      case 12: // Step 13: Network restored
        setIsOnline(true);
        break;
      case 13: // Step 14: Report synced
        break;
      case 14: // Step 15: Vehicle enters Shillong
        setVehicleProgress(0.95);
        setIsVehicleMoving(false);
        break;
      case 15: // Step 16: Delivery confirmed
        setVehicleProgress(1.0);
        setIsVehicleMoving(false);
        setRequests((prev) =>
          prev.map((r) => (r.id === 'PRV-2026-0147' ? { ...r, status: 'Delivered' } : r))
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="app-container">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOnline={isOnline}
        setIsOnline={setIsOnline}
        language={language}
        setLanguage={setLanguage}
        onResetData={handleResetData}
        onStartDemo={handleStartDemo}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Floating 16-Step Guided Walkthrough Bar (when active) */}
        {isDemoRunning && (
          <DemoWorkflowController
            currentStepIndex={currentStepIndex}
            onStepChange={handleStepChange}
            onClose={() => {
              setIsDemoRunning(false);
              setIsRunningAuto(false);
            }}
            isRunningAuto={isRunningAuto}
            setIsRunningAuto={setIsRunningAuto}
          />
        )}

        {/* User Orientation Helper (Where am I? What is happening?) */}
        <RoleGuideModal activeTab={activeTab} />

        {/* Dynamic View Router */}
        {activeTab === 'landing' && (
          <LandingView
            onSelectRole={(role) => setActiveTab(role)}
            onStartDemo={handleStartDemo}
          />
        )}

        {activeTab === 'service_centre' && (
          <ServiceCentreView
            requests={requests}
            onCreateRequest={handleCreateRequest}
            onViewTransporter={() => setActiveTab('transport_provider')}
          />
        )}

        {activeTab === 'transport_provider' && (
          <TransportProviderView
            requests={requests}
            onAcceptDelivery={handleAcceptDelivery}
            onTrackVehicle={() => setActiveTab('vehicle_tracking')}
          />
        )}

        {activeTab === 'route_intelligence' && (
          <RouteIntelligenceView
            disruptionState={disruptionState}
            onToggleDisruption={handleToggleDisruption}
            onResetDisruptions={handleResetDisruptions}
            selectedRouteId={selectedRouteId}
            setSelectedRouteId={setSelectedRouteId}
          />
        )}

        {activeTab === 'vehicle_tracking' && (
          <VehicleTrackingView
            vehicleProgress={vehicleProgress}
            setVehicleProgress={setVehicleProgress}
            isMoving={isVehicleMoving}
            setIsMoving={setIsVehicleMoving}
            disruptionState={disruptionState}
          />
        )}

        {activeTab === 'field_operations' && (
          <FieldOperationsView
            isOnline={isOnline}
            setIsOnline={setIsOnline}
            onNewIncidentReported={() => {
              setDisruptionState((prev) => ({ ...prev, roadBlocked: true }));
            }}
          />
        )}

        {activeTab === 'multimodal' && (
          <MultimodalView disruptionState={disruptionState} />
        )}

        {activeTab === 'alert_centre' && (
          <AlertCentreView
            language={language}
            setLanguage={setLanguage}
            disruptionState={disruptionState}
            onNavigateToRoute={() => setActiveTab('route_intelligence')}
          />
        )}

        {activeTab === 'trust_provenance' && (
          <TrustProvenanceView
            requests={requests}
            disruptionState={disruptionState}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView />
        )}
      </main>

      {/* Trust & Transparency Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div>
            <strong style={{ color: '#f8fafc', fontSize: '13px' }}>
              PRAVAHA &bull; Trusted Logistics & Accessibility Intelligence Platform for North Eastern Region
            </strong>
            <div style={{ marginTop: '4px' }}>
              Designed for resilient supply chains across Assam, Meghalaya, Mizoram, Manipur, Nagaland, Tripura, and Arunachal Pradesh.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="badge badge-teal">ULIP Integration Ready</span>
            <span className="badge badge-teal">PM GatiShakti Ready</span>
            <span className="badge badge-teal">Bhashini Ready</span>
            <span className="badge badge-simulated">SIMULATED DEMO DATA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
