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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        const progressWidth = metric.score ? Math.min(100, metric.score) : 0;
        
        return (
          <div 
            key={index} 
            className="bg-white rounded-xl p-4 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <IconComponent className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{metric.title}</h4>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              </div>
              {getScoreIcon(metric.score)}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {metric.value}
                    <span className="text-sm font-normal text-gray-500 ml-1">{metric.unit}</span>
                  </div>
                  <div className="text-xs text-gray-500">Target: {metric.target}</div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getScoreColor(metric.score)}`}>
                    {metric.score || '--'}
                  </div>
                  <div className="text-xs text-gray-500">score</div>
                </div>
              </div>

              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(metric.score)}`}
                    style={{ width: `${progressWidth}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsGrid;
