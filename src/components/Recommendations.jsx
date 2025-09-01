import React from 'react';
import { 
  Lightbulb, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Heart,
  Footprints,
  Moon,
  Activity,
  Apple,
  Droplets
} from 'lucide-react';

const Recommendations = ({ recommendations, scoreCategory }) => {
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'excellent':
      case 'very good':
        return <CheckCircle className="w-6 h-6 text-success" />;
      case 'good':
        return <TrendingUp className="w-6 h-6 text-success" />;
      case 'fair':
        return <Target className="w-6 h-5 text-warning" />;
      case 'poor':
      case 'very poor':
        return <AlertCircle className="w-6 h-6 text-danger" />;
      default:
        return <Lightbulb className="w-6 h-6 text-primary" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'excellent':
      case 'very good':
        return 'text-success';
      case 'good':
        return 'text-success';
      case 'fair':
        return 'text-warning';
      case 'poor':
      case 'very poor':
        return 'text-danger';
      default:
        return 'text-primary';
    }
  };

  const getCategoryMessage = (category) => {
    switch (category.toLowerCase()) {
      case 'excellent':
        return "You're doing amazing! Keep up the excellent work and maintain these healthy habits.";
      case 'very good':
        return "Great job! You're maintaining very good health. Consider fine-tuning a few areas for even better results.";
      case 'good':
        return "You're on the right track! Your health is in a good state with room for improvement in specific areas.";
      case 'fair':
        return "Your health is fair but there's definitely room for improvement. Focus on the recommendations below.";
      case 'poor':
        return "Your health needs attention. Consider implementing the recommendations below to improve your overall wellness.";
      case 'very poor':
        return "Your health requires immediate attention. Start with the basic recommendations and consider consulting a healthcare professional.";
      default:
        return "Here are some recommendations to help improve your health score.";
    }
  };

  const generalRecommendations = [
    {
      title: "Stay Hydrated",
      description: "Drink at least 8 glasses of water daily to maintain proper hydration.",
      icon: Droplets,
      priority: "high"
    },
    {
      title: "Get Quality Sleep",
      description: "Aim for 7-9 hours of sleep per night with consistent sleep and wake times.",
      icon: Moon,
      priority: "high"
    },
    {
      title: "Move More",
      description: "Take regular breaks to walk around, especially if you have a sedentary job.",
      icon: Footprints,
      priority: "medium"
    },
    {
      title: "Eat Balanced Meals",
      description: "Include a variety of fruits, vegetables, lean proteins, and whole grains in your diet.",
      icon: Apple,
      priority: "medium"
    },
    {
      title: "Monitor Heart Health",
      description: "Keep track of your resting heart rate and consider cardiovascular exercises.",
      icon: Heart,
      priority: "medium"
    },
    {
      title: "Stay Active",
      description: "Engage in at least 150 minutes of moderate exercise per week.",
      icon: Activity,
      priority: "high"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-danger';
      case 'medium':
        return 'border-l-4 border-l-warning';
      case 'low':
        return 'border-l-4 border-l-success';
      default:
        return '';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <span className="badge badge-danger text-xs">High Priority</span>;
      case 'medium':
        return <span className="badge badge-warning text-xs">Medium Priority</span>;
      case 'low':
        return <span className="badge badge-success text-xs">Low Priority</span>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-8 h-8 text-white" />
        <h2 className="text-2xl font-bold text-white">Health Recommendations</h2>
      </div>

      {/* Overall Health Status */}
      <div className="card mb-6">
        <div className="flex items-start gap-4">
          {getCategoryIcon(scoreCategory.category)}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-primary">
                Your Health Status: {scoreCategory.category}
              </h3>
              <span className={`badge badge-${scoreCategory.color}`}>
                {scoreCategory.emoji} {scoreCategory.category}
              </span>
            </div>
            <p className={`text-lg ${getCategoryColor(scoreCategory.category)}`}>
              {getCategoryMessage(scoreCategory.category)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personalized Recommendations */}
        <div className="card">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Personalized Recommendations
          </h3>
          
          {recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg bg-gray-50 ${getPriorityColor('high')}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-danger rounded-full"></div>
                      <span className="font-medium text-primary">Priority</span>
                    </div>
                    {getPriorityBadge('high')}
                  </div>
                  <p className="text-primary">{recommendation}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
              <p className="text-secondary">
                Great job! No specific recommendations at this time. 
                Keep maintaining your healthy habits!
              </p>
            </div>
          )}
        </div>

        {/* General Health Tips */}
        <div className="card">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            General Health Tips
          </h3>
          
          <div className="space-y-4">
            {generalRecommendations.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg bg-gray-50 ${getPriorityColor(tip.priority)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-primary" />
                      <span className="font-medium text-primary">{tip.title}</span>
                    </div>
                    {getPriorityBadge(tip.priority)}
                  </div>
                  <p className="text-secondary text-sm">{tip.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Plan */}
      <div className="card mt-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Your Action Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-2">This Week</div>
            <p className="text-sm text-secondary">
              Focus on implementing 2-3 key recommendations from your personalized list
            </p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-2">This Month</div>
            <p className="text-sm text-secondary">
              Establish consistent habits and track your progress regularly
            </p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-2">Long Term</div>
            <p className="text-sm text-secondary">
              Maintain healthy lifestyle changes and set new wellness goals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
