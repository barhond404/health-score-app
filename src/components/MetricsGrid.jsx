import React from 'react';
import { 
  Footprints, 
  Heart, 
  Moon, 
  Activity, 
  Apple, 
  Droplets,
  Target,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const MetricsGrid = ({ healthData, scoreBreakdown }) => {
  const metrics = [
    {
      title: 'Steps',
      value: healthData.steps?.toLocaleString() || '0',
      target: '10,000',
      score: scoreBreakdown.steps,
      icon: Footprints,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      unit: 'steps',
      description: 'Daily step count'
    },
    {
      title: 'Heart Rate',
      value: healthData.heartRate?.restingHeartRate || '--',
      target: '60-70',
      score: scoreBreakdown.heartRate,
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      unit: 'bpm',
      description: 'Resting heart rate'
    },
    {
      title: 'Sleep',
      value: healthData.sleep?.duration || '--',
      target: '7-9',
      score: scoreBreakdown.sleep,
      icon: Moon,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      unit: 'hours',
      description: 'Sleep duration'
    },
    {
      title: 'Activity',
      value: healthData.activity?.activeMinutes || '--',
      target: '30+',
      score: scoreBreakdown.activity,
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      unit: 'min',
      description: 'Active minutes'
    },
    {
      title: 'Nutrition',
      value: healthData.nutrition?.calories || '--',
      target: '1800-2200',
      score: scoreBreakdown.nutrition,
      icon: Apple,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      unit: 'cal',
      description: 'Daily calories'
    },
    {
      title: 'Hydration',
      value: healthData.hydration?.waterIntake || '--',
      target: '2000',
      score: scoreBreakdown.hydration,
      icon: Droplets,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50',
      unit: 'ml',
      description: 'Water intake'
    }
  ];

  const getScoreColor = (score) => {
    if (!score) return 'text-secondary';
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getScoreIcon = (score) => {
    if (!score) return null;
    if (score >= 80) return <TrendingUp className="w-4 h-4 text-success" />;
    if (score >= 60) return <Target className="w-4 h-4 text-warning" />;
    return <TrendingDown className="w-4 h-4 text-danger" />;
  };

  const getProgressColor = (score) => {
    if (!score) return 'bg-gray-200';
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Health Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className="card slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                  <IconComponent className={`w-6 h-6 ${metric.color}`} />
                </div>
                {getScoreIcon(metric.score)}
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-primary mb-1">
                  {metric.title}
                </h3>
                <p className="text-sm text-secondary mb-2">
                  {metric.description}
                </p>
                
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-primary">
                    {metric.value}
                  </span>
                  <span className="text-sm text-secondary">
                    {metric.unit}
                  </span>
                </div>

                <div className="text-sm text-secondary">
                  Target: {metric.target}
                </div>
              </div>

              {/* Score Display */}
              {metric.score !== null && metric.score !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-primary">Score</span>
                    <span className={`text-sm font-bold ${getScoreColor(metric.score)}`}>
                      {metric.score}/100
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill ${getProgressColor(metric.score)}`}
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Additional Details */}
              <div className="text-xs text-secondary">
                {metric.title === 'Steps' && healthData.steps && (
                  <div>{(healthData.steps / 10000 * 100).toFixed(1)}% of daily goal</div>
                )}
                {metric.title === 'Heart Rate' && healthData.heartRate && (
                  <div>
                    Avg: {healthData.heartRate.averageHeartRate} bpm | 
                    Max: {healthData.heartRate.maxHeartRate} bpm
                  </div>
                )}
                {metric.title === 'Sleep' && healthData.sleep && (
                  <div>
                    Quality: {(healthData.sleep.quality * 100).toFixed(0)}% | 
                    Deep: {healthData.sleep.deepSleep}h
                  </div>
                )}
                {metric.title === 'Activity' && healthData.activity && (
                  <div>
                    Exercise: {healthData.activity.exerciseMinutes}min | 
                    Calories: {healthData.activity.caloriesBurned}
                  </div>
                )}
                {metric.title === 'Nutrition' && healthData.nutrition && (
                  <div>
                    Protein: {healthData.nutrition.protein}g | 
                    Fiber: {healthData.nutrition.fiber}g
                  </div>
                )}
                {metric.title === 'Hydration' && healthData.hydration && (
                  <div>
                    {(healthData.hydration.waterIntake / healthData.hydration.target * 100).toFixed(1)}% of daily goal
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MetricsGrid;
