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
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-sm text-gray-600">Score: {data.score}/100</p>
          <p className="text-sm text-gray-600">Steps: {data.steps?.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Heart Rate: {data.heartRate} bpm</p>
          <p className="text-sm text-gray-600">Sleep: {data.sleep}h</p>
          <p className="text-sm text-gray-600">Activity: {data.activity} min</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-primary">Weekly Health Trends</h3>
        <div className="flex items-center gap-2">
          {getTrendIcon()}
          <span className={`text-sm font-semibold ${getTrendColor()}`}>
            {trend.direction === 'up' ? '+' : trend.direction === 'down' ? '-' : ''}{trend.percentage}% 
            {trend.direction !== 'neutral' && ' this week'}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Health Score Trend */}
        <div className="bg-white rounded-xl p-4 shadow-soft">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Health Score Trend</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#667eea" 
                strokeWidth={3}
                dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#667eea', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Steps and Activity Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-soft">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Daily Steps</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="steps" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-soft">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Active Minutes</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="activity" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="bg-white rounded-xl p-4 shadow-soft">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Weekly Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {Math.round(chartData.reduce((sum, day) => sum + day.steps, 0) / chartData.length).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Avg Steps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {Math.round(chartData.reduce((sum, day) => sum + day.activity, 0) / chartData.length)}
              </div>
              <div className="text-sm text-gray-600">Avg Activity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">
                {Math.round(chartData.reduce((sum, day) => sum + day.score, 0) / chartData.length)}
              </div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {Math.round(chartData.reduce((sum, day) => sum + (day.sleep || 0), 0) / chartData.length * 10) / 10}
              </div>
              <div className="text-sm text-gray-600">Avg Sleep</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyTrends;
