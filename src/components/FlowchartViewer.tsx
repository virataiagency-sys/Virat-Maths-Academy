import React, { useState } from 'react';
import { FlowchartData, FlowchartNode } from '../types/curriculum';
import { Play, RotateCcw, ChevronRight, ChevronLeft, CheckCircle2, ArrowDown, HelpCircle, Terminal } from 'lucide-react';

interface FlowchartViewerProps {
  data: FlowchartData;
  flowcharts?: FlowchartData[];
  classNameTitle: string;
  pillarName: string;
}

export const FlowchartViewer: React.FC<FlowchartViewerProps> = ({
  data,
  flowcharts,
  classNameTitle,
  pillarName,
}) => {
  const [selectedFlowchartIndex, setSelectedFlowchartIndex] = useState(0);
  const activeFlowchartList = flowcharts && flowcharts.length > 0 ? flowcharts : [data];
  const currentFlowchart = activeFlowchartList[selectedFlowchartIndex] || data;

  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);

  const handleSelectFlowchart = (index: number) => {
    setSelectedFlowchartIndex(index);
    setActiveStepIndex(null);
  };

  const handleStartWalkthrough = () => {
    setActiveStepIndex(0);
  };

  const handleNext = () => {
    if (activeStepIndex === null) {
      setActiveStepIndex(0);
    } else if (activeStepIndex < currentFlowchart.nodes.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepIndex !== null && activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  };

  const handleReset = () => {
    setActiveStepIndex(null);
  };

  const getNodeBadge = (type: FlowchartNode['type']) => {
    switch (type) {
      case 'start':
        return <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Start Node</span>;
      case 'decision':
        return <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Decision Condition</span>;
      case 'process':
        return <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Action Step</span>;
      case 'output':
        return <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded">Result Output</span>;
      case 'end':
        return <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded">End Node</span>;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
      {/* Algorithm Tabs (when multiple flowcharts exist) */}
      {activeFlowchartList.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 border-b border-slate-100 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            Algorithms:
          </span>
          {activeFlowchartList.map((fc, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectFlowchart(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedFlowchartIndex === idx
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {fc.title.replace(/^How to\s+/i, '').slice(0, 35)}
            </button>
          ))}
        </div>
      )}

      {/* Header with Title and Walkthrough Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
            <span>{classNameTitle}</span>
            <span>·</span>
            <span>{pillarName} Algorithm</span>
            {activeFlowchartList.length > 1 && (
              <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                {selectedFlowchartIndex + 1} of {activeFlowchartList.length}
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-900">{currentFlowchart.title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{currentFlowchart.concept}</p>
        </div>

        {/* Walkthrough controller buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {activeStepIndex === null ? (
            <button
              onClick={handleStartWalkthrough}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Step-by-Step Walkthrough</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={handlePrev}
                disabled={activeStepIndex === 0}
                className="p-1 rounded bg-white text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 shadow-xs cursor-pointer"
                title="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-slate-800 px-2">
                Step {activeStepIndex + 1} / {currentFlowchart.nodes.length}
              </span>
              <button
                onClick={handleNext}
                disabled={activeStepIndex === currentFlowchart.nodes.length - 1}
                className="p-1 rounded bg-white text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 shadow-xs cursor-pointer"
                title="Next step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="p-1 rounded text-slate-500 hover:text-slate-800 hover:bg-white transition-colors cursor-pointer ml-1"
                title="Reset walkthrough"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Real world worked example banner */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-lg p-3 mb-6 flex items-start gap-2.5">
        <Terminal className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="text-xs font-bold text-indigo-950 block">Target Problem Example</span>
          <span className="text-xs font-mono text-indigo-900">{currentFlowchart.realWorldExample}</span>
        </div>
      </div>

      {/* Flowchart Diagram Pathway */}
      <div className="relative max-w-2xl mx-auto py-2">
        {currentFlowchart.nodes.map((node, index) => {
          const isCurrentActive = activeStepIndex === index;
          const isPassed = activeStepIndex !== null && index < activeStepIndex;
          const isLast = index === currentFlowchart.nodes.length - 1;

          return (
            <div key={node.id} className="relative flex flex-col items-center">
              {/* Node Card */}
              <div
                onClick={() => setActiveStepIndex(index)}
                className={`w-full max-w-lg p-4 rounded-xl border transition-all cursor-pointer ${
                  isCurrentActive
                    ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-400 shadow-md transform scale-[1.02]'
                    : isPassed
                    ? 'bg-slate-50 border-emerald-300 text-slate-800'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-mono font-bold">
                      {index + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{node.title}</h4>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isPassed && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {getNodeBadge(node.type)}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pl-7">
                  {node.description}
                </p>

                {node.exampleStep && (
                  <div className="mt-2.5 ml-7 p-2 bg-white/80 rounded border border-indigo-100 text-xs font-mono text-indigo-900">
                    {node.exampleStep}
                  </div>
                )}
              </div>

              {/* Connecting Down Arrow between nodes */}
              {!isLast && (
                <div className="my-2 flex flex-col items-center text-slate-300">
                  <div className="w-0.5 h-4 bg-slate-300"></div>
                  <ArrowDown className="w-4 h-4 text-slate-400 -mt-1" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
