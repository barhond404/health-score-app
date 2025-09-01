import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import HealthScoreCard from './components/HealthScoreCard';
import MetricsGrid from './components/MetricsGrid';
import WeeklyTrends from './components/WeeklyTrends';
import Recommendations from './components/Recommendations';
import DataInput from './components/DataInput';
import PolicyDashboard from './components/PolicyDashboard';
import { sampleHealthData, generateHealthData } from './data/sampleHealthData';
import { healthScoreCalculator } from './utils/healthScoreCalculator';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('health');
  const [healthData, setHealthData] = useState(sampleHealthData);
  const [currentScore, setCurrentScore] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({});
  const [showDataInput, setShowDataInput] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Calculate health score when data changes
  useEffect(() => {
    const overallScore = healthScoreCalculator.calculateOverallScore(healthData.today);
    setCurrentScore(overallScore);

    // Calculate individual scores
    const breakdown = {
      steps: healthScoreCalculator.calculateStepsScore(healthData.today.steps),
      heartRate: healthScoreCalculator.calculateHeartRateScore(healthData.today.heartRate),
      sleep: healthScoreCalculator.calculateSleepScore(healthData.today.sleep),
      activity: healthScoreCalculator.calculateActivityScore(healthData.today.activity),
      nutrition: healthScoreCalculator.calculateNutritionScore(healthData.today.nutrition),
      hydration: healthScoreCalculator.calculateHydrationScore(healthData.today.hydration)
    };
    setScoreBreakdown(breakdown);
  }, [healthData]);

  // Update data periodically to simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDataUpdate = (newData) => {
    setHealthData(prev => ({
      ...prev,
      today: { ...prev.today, ...newData }
    }));
    setShowDataInput(false);
  };

  const handleGenerateNewData = () => {
    const newWeeklyData = generateHealthData(7);
    const newTodayData = newWeeklyData[newWeeklyData.length - 1];
    
    setHealthData(prev => ({
      ...prev,
      today: newTodayData,
      weekly: newWeeklyData
    }));
  };

  const scoreCategory = healthScoreCalculator.getScoreCategory(currentScore);
  const recommendations = healthScoreCalculator.getRecommendations(scoreBreakdown);

  const renderHealthSection = () => (
    <div>
      {/* Professional Header */}
      <header className="dashboard-header">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Health Score Dashboard
            </h1>
            <p className="text-white text-lg opacity-90">
              Your comprehensive health overview
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              className="btn btn-secondary"
              onClick={() => setShowDataInput(true)}
            >
              Update Data
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleGenerateNewData}
            >
              Generate Sample Data
            </button>
          </div>
        </div>
        <div className="text-white text-sm opacity-75 mt-4">
          Last updated: {format(lastUpdated, 'MMM dd, yyyy HH:mm:ss')}
        </div>
      </header>

      {/* Main Health Score Card */}
      <div className="mb-8">
        <HealthScoreCard 
          score={currentScore}
          category={scoreCategory}
          date={healthData.today.date}
        />
      </div>

      {/* Side-by-side Metrics and Trends */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* Metrics Grid */}
        <div className="chart-container">
          <h3 className="text-xl font-bold text-primary mb-4">Health Metrics</h3>
          <MetricsGrid 
            healthData={healthData.today}
            scoreBreakdown={scoreBreakdown}
          />
        </div>

        {/* Weekly Trends */}
        <div className="chart-container">
          <WeeklyTrends weeklyData={healthData.weekly} />
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-8">
        <Recommendations 
          recommendations={recommendations}
          scoreCategory={scoreCategory}
        />
      </div>

      {/* Data Input Modal */}
      {showDataInput && (
        <DataInput 
          currentData={healthData.today}
          onUpdate={handleDataUpdate}
          onClose={() => setShowDataInput(false)}
        />
      )}
    </div>
  );

  return (
    <div className="App">
      <div className="container">
        {/* Professional Navigation Tabs */}
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'health' ? 'active' : ''}`}
            onClick={() => setActiveTab('health')}
          >
            Health Dashboard
          </button>
          <button
            className={`nav-tab ${activeTab === 'policies' ? 'active' : ''}`}
            onClick={() => setActiveTab('policies')}
          >
            Policy Management
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'health' && renderHealthSection()}
        {activeTab === 'policies' && (
          <PolicyDashboard 
            healthScore={currentScore}
            scoreCategory={scoreCategory}
          />
        )}
      </div>
    </div>
  );
}

export default App;
