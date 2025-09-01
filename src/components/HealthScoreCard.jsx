import React from 'react';
import { format } from 'date-fns';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const HealthScoreCard = ({ score, category, date }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-success';
    if (score >= 70) return 'text-success';
    if (score >= 60) return 'text-warning';
    if (score >= 50) return 'text-warning';
    return 'text-danger';
  };

  const getScoreGradient = (score) => {
    if (score >= 90) return 'from-green-400 to-green-600';
    if (score >= 80) return 'from-green-400 to-blue-500';
    if (score >= 70) return 'from-blue-400 to-blue-600';
    if (score >= 60) return 'from-yellow-400 to-orange-500';
    if (score >= 50) return 'from-orange-400 to-red-500';
    return 'from-red-400 to-red-600';
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return "Outstanding! You're in excellent health!";
    if (score >= 80) return "Great job! You're maintaining very good health.";
    if (score >= 70) return "Good work! Your health is in a good state.";
    if (score >= 60) return "Fair. There's room for improvement in some areas.";
    if (score >= 50) return "Below average. Consider making some health changes.";
    return "Poor. It's time to focus on improving your health habits.";
  };

  return (
    <div className="card scale-in">
      <div className="text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Your Health Score
          </h2>
          <p className="text-secondary">
            {format(new Date(date), 'EEEE, MMMM do, yyyy')}
          </p>
        </div>

        {/* Main Score Display */}
        <div className="relative mb-8">
          <div className="relative">
            {/* Circular Progress */}
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="var(--border-color)"
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={`url(#gradient-${score})`}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - score / 100)}`}
                  style={{
                    transition: 'stroke-dashoffset 1s ease-in-out'
                  }}
                />
                {/* Gradient definition */}
                <defs>
                  <linearGradient id={`gradient-${score}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={score >= 90 ? '#10b981' : score >= 80 ? '#3b82f6' : score >= 70 ? '#6366f1' : score >= 60 ? '#f59e0b' : score >= 50 ? '#f97316' : '#ef4444'} />
                    <stop offset="100%" stopColor={score >= 90 ? '#059669' : score >= 80 ? '#1d4ed8' : score >= 70 ? '#4f46e5' : score >= 60 ? '#d97706' : score >= 50 ? '#ea580c' : '#dc2626'} />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Score in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
                    {score}
                  </div>
                  <div className="text-sm text-secondary">out of 100</div>
                </div>
              </div>
            </div>

            {/* Category Badge */}
            <div className="flex justify-center mb-4">
              <span className={`badge badge-${category.color}`}>
                <span className="mr-1">{category.emoji}</span>
                {category.category}
              </span>
            </div>

            {/* Score Message */}
            <p className="text-lg text-primary mb-6">
              {getScoreMessage(score)}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">25%</div>
            <div className="text-sm text-secondary">Steps</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">20%</div>
            <div className="text-sm text-secondary">Heart Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">20%</div>
            <div className="text-sm text-secondary">Sleep</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">15%</div>
            <div className="text-sm text-secondary">Activity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">10%</div>
            <div className="text-sm text-secondary">Nutrition</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">10%</div>
            <div className="text-sm text-secondary">Hydration</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthScoreCard;
