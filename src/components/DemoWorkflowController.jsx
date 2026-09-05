import React, { useEffect, useState } from 'react';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  X, 
  CheckCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { DEMO_SCENARIO_STEPS } from '../data/mockData';

export default function DemoWorkflowController({
  currentStepIndex,
  onStepChange,
  onClose,
  isRunningAuto,
  setIsRunningAuto
}) {
  const currentStep = DEMO_SCENARIO_STEPS[currentStepIndex] || DEMO_SCENARIO_STEPS[0];
  const totalSteps = DEMO_SCENARIO_STEPS.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (isRunningAuto) {
      timer = setTimeout(() => {
        if (currentStepIndex < totalSteps - 1) {
          onStepChange(currentStepIndex + 1);
        } else {
          setIsRunningAuto(false);
        }
      }, 4000); // 4 seconds per step
    }
    return () => clearTimeout(timer);
  }, [isRunningAuto, currentStepIndex, totalSteps, onStepChange, setIsRunningAuto]);

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      onStepChange(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      onStepChange(currentStepIndex - 1);
    }
  };

  const handleRestart = () => {
    onStepChange(0);
  };

  return (
    <div className="demo-controller-bar">
      <div className="demo-step-info" style={{ flex: 1, minWidth: '280px' }}>
        <div className="demo-step-bubble">
          {currentStep.step}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span className="badge badge-teal" style={{ fontSize: '10px', padding: '2px 8px' }}>
              STEP {currentStepIndex + 1} OF {totalSteps} ({progressPercent}%)
            </span>
            <span className="demo-step-title">{currentStep.title}</span>
          </div>
          <div className="demo-step-summary">
            {currentStep.summary}
          </div>
          <div style={{ fontSize: '12px', color: '#38bdf8', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={13} />
            <span><strong>What is happening:</strong> {currentStep.actionDescription}</span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="demo-controls-btns">
        <button
          className="btn btn-secondary btn-sm"
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          style={{ opacity: currentStepIndex === 0 ? 0.5 : 1 }}
        >
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>

        <button
          className={`btn btn-sm ${isRunningAuto ? 'btn-warning' : 'btn-primary'}`}
          onClick={() => setIsRunningAuto(!isRunningAuto)}
        >
          {isRunningAuto ? (
            <>
              <Pause size={15} />
              <span>Pause Auto</span>
            </>
          ) : (
            <>
              <Play size={15} />
              <span>Auto Play</span>
            </>
          )}
        </button>

        <button
          className="btn btn-primary btn-sm"
          onClick={handleNext}
          disabled={currentStepIndex === totalSteps - 1}
          style={{ opacity: currentStepIndex === totalSteps - 1 ? 0.5 : 1 }}
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>

        <button
          className="btn btn-outline btn-sm"
          onClick={handleRestart}
          title="Restart scenario"
          style={{ color: '#94a3b8', borderColor: 'rgba(255,255,255,0.2)' }}
        >
          <RotateCcw size={14} />
        </button>

        <button
          className="btn btn-outline btn-sm"
          onClick={onClose}
          title="Exit demo scenario"
          style={{ color: '#fca5a5', borderColor: 'rgba(255,255,255,0.2)' }}
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
