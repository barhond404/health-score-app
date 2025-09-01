import React from 'react';
import { format, parseISO } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { healthScoreCalculator } from '../utils/healthScoreCalculator';

const WeeklyTrends = ({ weeklyData }) => {
  // Calculate health scores for each day
  const chartData = weeklyData.map(day => {
    const score = healthScoreCalculator.calculateOverallScore(day);
    
    return {
      date: format(parseISO(day.date), 'EEE'),
      fullDate: day.date,
      score: score,
      steps: day.steps,
      heartRate: day.heartRate?.restingHeartRate,
      sleep: day.sleep?.duration,
      activity: day.activity?.activeMinutes,
      calories: day.activity?.caloriesBurned
    };
  });

  // Calculate trend
  const getTrend = () => {
    if (chartData.length < 2) return { direction: 'neutral', percentage: 0 };
    
    const firstScore = chartData[0].score;
    const lastScore = chartData[chartData.length - 1].score;
    const change = lastScore - firstScore;
    const percentage = ((change / firstScore) * 100);
    
    return {
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
      percentage: Math.abs(percentage).toFixed(1)
    };
  };

  const trend = getTrend();

  const getTrendIcon = () => {
    switch (trend.direction) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-success" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-danger" />;
      default:
        return <Minus className="w-5 h-5 text-secondary" />;
    }
  };

  const getTrendColor = () => {
    switch (trend.direction) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-danger';
      default:
        return 'text-secondary';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="font-semibold text-primary">{label}</p>
          <p className="text-sm text-secondary">Score: {data.score}/100</p>
          <p className="text-sm text-secondary">Steps: {data.steps?.toLocaleString()}</p>
          <p className="text-sm text-secondary">Heart Rate: {data.heartRate} bpm</p>
          <p className="text-sm text-secondary">Sleep: {data.sleep}h</p>
          <p className="text-sm text-secondary">Activity: {data.activity} min</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Weekly Trends</h2>
        <div className="flex items-center gap-2">
          {getTrendIcon()}
          <span className={`text-sm font-semibold ${getTrendColor()}`}>
            {trend.direction === 'up' ? '+' : trend.direction === 'down' ? '-' : ''}{trend.percentage}% 
            {trend.direction !== 'neutral' && ' this week'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Score Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-primary mb-4">Health Score Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--text-secondary)"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="var(--primary-color)" 
                strokeWidth={3}
                dot={{ fill: 'var(--primary-color)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--primary-color)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Steps Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-primary mb-4">Daily Steps</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--text-secondary)"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value) => [value.toLocaleString(), 'Steps']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Bar 
                dataKey="steps" 
                fill="var(--primary-color)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Heart Rate Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-primary mb-4">Resting Heart Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--text-secondary)"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value) => [value, 'BPM']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="heartRate" 
                stroke="var(--danger-color)" 
                strokeWidth={2}
                dot={{ fill: 'var(--danger-color)', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sleep Duration Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-primary mb-4">Sleep Duration</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--text-secondary)"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value) => [value, 'Hours']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Bar 
                dataKey="sleep" 
                fill="var(--secondary-color)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="card mt-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Weekly Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(chartData.reduce((sum, day) => sum + day.score, 0) / chartData.length)}
            </div>
            <div className="text-sm text-secondary">Avg Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(chartData.reduce((sum, day) => sum + day.steps, 0) / chartData.length).toLocaleString()}
            </div>
            <div className="text-sm text-secondary">Avg Steps</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(chartData.reduce((sum, day) => sum + (day.heartRate || 0), 0) / chartData.filter(day => day.heartRate).length)}
            </div>
            <div className="text-sm text-secondary">Avg Heart Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {(chartData.reduce((sum, day) => sum + (day.sleep || 0), 0) / chartData.filter(day => day.sleep).length).toFixed(1)}
            </div>
            <div className="text-sm text-secondary">Avg Sleep (h)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyTrends;
