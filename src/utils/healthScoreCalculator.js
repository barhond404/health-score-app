// Health Score Calculator
// This utility calculates a comprehensive health score based on various health metrics

export class HealthScoreCalculator {
  constructor() {
    this.weights = {
      steps: 0.25,
      heartRate: 0.20,
      sleep: 0.20,
      activity: 0.15,
      nutrition: 0.10,
      hydration: 0.10
    };
  }

  // Calculate overall health score (0-100)
  calculateOverallScore(healthData) {
    const scores = {
      steps: this.calculateStepsScore(healthData.steps),
      heartRate: this.calculateHeartRateScore(healthData.heartRate),
      sleep: this.calculateSleepScore(healthData.sleep),
      activity: this.calculateActivityScore(healthData.activity),
      nutrition: this.calculateNutritionScore(healthData.nutrition),
      hydration: this.calculateHydrationScore(healthData.hydration)
    };

    let totalScore = 0;
    let totalWeight = 0;

    Object.keys(scores).forEach(metric => {
      if (scores[metric] !== null && scores[metric] !== undefined) {
        totalScore += scores[metric] * this.weights[metric];
        totalWeight += this.weights[metric];
      }
    });

    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  }

  // Steps score (0-100)
  calculateStepsScore(steps) {
    if (!steps || steps < 0) return null;
    
    // Target: 10,000 steps per day
    const target = 10000;
    const score = Math.min(100, (steps / target) * 100);
    
    // Bonus for exceeding target
    if (steps > target) {
      return Math.min(100, score + (steps - target) / 100);
    }
    
    return Math.round(score);
  }

  // Heart rate score (0-100)
  calculateHeartRateScore(heartRateData) {
    if (!heartRateData || !heartRateData.restingHeartRate) return null;
    
    const restingHR = heartRateData.restingHeartRate;
    
    // Optimal resting heart rate: 60-100 bpm
    // Excellent: 60-70, Good: 70-80, Average: 80-90, Below average: 90-100
    if (restingHR >= 60 && restingHR <= 70) return 100;
    if (restingHR > 70 && restingHR <= 80) return 85;
    if (restingHR > 80 && restingHR <= 90) return 70;
    if (restingHR > 90 && restingHR <= 100) return 50;
    if (restingHR < 60 || restingHR > 100) return 30;
    
    return 0;
  }

  // Sleep score (0-100)
  calculateSleepScore(sleepData) {
    if (!sleepData || !sleepData.duration) return null;
    
    const duration = sleepData.duration; // in hours
    const quality = sleepData.quality || 0.8; // 0-1 scale
    
    // Optimal sleep: 7-9 hours
    let durationScore = 0;
    if (duration >= 7 && duration <= 9) {
      durationScore = 100;
    } else if (duration >= 6 && duration < 7) {
      durationScore = 80;
    } else if (duration > 9 && duration <= 10) {
      durationScore = 70;
    } else if (duration >= 5 && duration < 6) {
      durationScore = 60;
    } else {
      durationScore = 30;
    }
    
    // Combine duration and quality
    const totalScore = (durationScore * 0.7) + (quality * 100 * 0.3);
    return Math.round(totalScore);
  }

  // Activity score (0-100)
  calculateActivityScore(activityData) {
    if (!activityData) return null;
    
    const { activeMinutes, exerciseMinutes, caloriesBurned } = activityData;
    
    let score = 0;
    let factors = 0;
    
    // Active minutes (target: 30+ minutes)
    if (activeMinutes !== undefined) {
      const activeScore = Math.min(100, (activeMinutes / 30) * 100);
      score += activeScore;
      factors++;
    }
    
    // Exercise minutes (target: 150+ minutes per week)
    if (exerciseMinutes !== undefined) {
      const exerciseScore = Math.min(100, (exerciseMinutes / 150) * 100);
      score += exerciseScore;
      factors++;
    }
    
    // Calories burned (target: 400+ calories)
    if (caloriesBurned !== undefined) {
      const calorieScore = Math.min(100, (caloriesBurned / 400) * 100);
      score += calorieScore;
      factors++;
    }
    
    return factors > 0 ? Math.round(score / factors) : 0;
  }

  // Nutrition score (0-100)
  calculateNutritionScore(nutritionData) {
    if (!nutritionData) return null;
    
    const { calories, protein, carbs, fat, fiber } = nutritionData;
    
    let score = 0;
    let factors = 0;
    
    // Calorie balance (assuming 2000 calorie target)
    if (calories !== undefined) {
      const calorieRatio = calories / 2000;
      const calorieScore = calorieRatio >= 0.8 && calorieRatio <= 1.2 ? 100 : 
                          calorieRatio >= 0.6 && calorieRatio <= 1.4 ? 70 : 40;
      score += calorieScore;
      factors++;
    }
    
    // Protein intake (target: 50-150g)
    if (protein !== undefined) {
      const proteinScore = protein >= 50 && protein <= 150 ? 100 : 
                          protein >= 30 && protein <= 200 ? 70 : 40;
      score += proteinScore;
      factors++;
    }
    
    // Fiber intake (target: 25g+)
    if (fiber !== undefined) {
      const fiberScore = fiber >= 25 ? 100 : fiber >= 15 ? 70 : 40;
      score += fiberScore;
      factors++;
    }
    
    return factors > 0 ? Math.round(score / factors) : 0;
  }

  // Hydration score (0-100)
  calculateHydrationScore(hydrationData) {
    if (!hydrationData || !hydrationData.waterIntake) return null;
    
    const waterIntake = hydrationData.waterIntake; // in ml
    const target = 2000; // 2L per day
    
    const score = Math.min(100, (waterIntake / target) * 100);
    return Math.round(score);
  }

  // Get health score category
  getScoreCategory(score) {
    if (score >= 90) return { category: 'Excellent', color: 'success', emoji: '🏆' };
    if (score >= 80) return { category: 'Very Good', color: 'success', emoji: '🌟' };
    if (score >= 70) return { category: 'Good', color: 'success', emoji: '👍' };
    if (score >= 60) return { category: 'Fair', color: 'warning', emoji: '⚠️' };
    if (score >= 50) return { category: 'Poor', color: 'warning', emoji: '😐' };
    return { category: 'Very Poor', color: 'danger', emoji: '😔' };
  }

  // Get recommendations based on scores
  getRecommendations(scores) {
    const recommendations = [];
    
    if (scores.steps < 70) {
      recommendations.push('Try to increase your daily step count to 10,000 steps');
    }
    
    if (scores.heartRate < 70) {
      recommendations.push('Consider cardiovascular exercises to improve heart health');
    }
    
    if (scores.sleep < 70) {
      recommendations.push('Aim for 7-9 hours of quality sleep per night');
    }
    
    if (scores.activity < 70) {
      recommendations.push('Increase your daily active minutes to at least 30 minutes');
    }
    
    if (scores.nutrition < 70) {
      recommendations.push('Focus on balanced nutrition with adequate protein and fiber');
    }
    
    if (scores.hydration < 70) {
      recommendations.push('Drink at least 2L of water per day');
    }
    
    return recommendations;
  }
}

// Export a singleton instance
export const healthScoreCalculator = new HealthScoreCalculator();
