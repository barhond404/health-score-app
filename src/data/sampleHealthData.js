// Sample health data that simulates data from health apps and smartwatches
// This data represents what you might get from Apple Health, Google Fit, Fitbit, etc.

export const sampleHealthData = {
  // Today's data
  today: {
    date: new Date().toISOString().split('T')[0],
    steps: 12450,
    heartRate: {
      restingHeartRate: 65,
      averageHeartRate: 72,
      maxHeartRate: 145,
      heartRateVariability: 45
    },
    sleep: {
      duration: 7.5, // hours
      quality: 0.85, // 0-1 scale
      deepSleep: 2.1, // hours
      lightSleep: 4.2, // hours
      remSleep: 1.2 // hours
    },
    activity: {
      activeMinutes: 45,
      exerciseMinutes: 30,
      caloriesBurned: 450,
      distance: 8.2, // km
      floors: 12
    },
    nutrition: {
      calories: 1850,
      protein: 120, // grams
      carbs: 200, // grams
      fat: 65, // grams
      fiber: 28, // grams
      sugar: 45 // grams
    },
    hydration: {
      waterIntake: 2200, // ml
      target: 2500 // ml
    }
  },

  // Weekly data for trends
  weekly: [
    {
      date: '2024-01-01',
      steps: 11500,
      heartRate: { restingHeartRate: 68 },
      sleep: { duration: 7.2, quality: 0.8 },
      activity: { activeMinutes: 40, exerciseMinutes: 25, caloriesBurned: 420 },
      nutrition: { calories: 1900, protein: 110, carbs: 220, fat: 70, fiber: 25 },
      hydration: { waterIntake: 2100 }
    },
    {
      date: '2024-01-02',
      steps: 13200,
      heartRate: { restingHeartRate: 66 },
      sleep: { duration: 8.1, quality: 0.9 },
      activity: { activeMinutes: 55, exerciseMinutes: 35, caloriesBurned: 480 },
      nutrition: { calories: 1950, protein: 125, carbs: 210, fat: 68, fiber: 30 },
      hydration: { waterIntake: 2400 }
    },
    {
      date: '2024-01-03',
      steps: 9800,
      heartRate: { restingHeartRate: 70 },
      sleep: { duration: 6.8, quality: 0.75 },
      activity: { activeMinutes: 35, exerciseMinutes: 20, caloriesBurned: 380 },
      nutrition: { calories: 1750, protein: 95, carbs: 190, fat: 60, fiber: 22 },
      hydration: { waterIntake: 1800 }
    },
    {
      date: '2024-01-04',
      steps: 14500,
      heartRate: { restingHeartRate: 64 },
      sleep: { duration: 7.8, quality: 0.88 },
      activity: { activeMinutes: 60, exerciseMinutes: 40, caloriesBurned: 520 },
      nutrition: { calories: 2000, protein: 130, carbs: 230, fat: 72, fiber: 32 },
      hydration: { waterIntake: 2600 }
    },
    {
      date: '2024-01-05',
      steps: 11200,
      heartRate: { restingHeartRate: 67 },
      sleep: { duration: 7.0, quality: 0.82 },
      activity: { activeMinutes: 42, exerciseMinutes: 28, caloriesBurned: 410 },
      nutrition: { calories: 1850, protein: 115, carbs: 205, fat: 66, fiber: 27 },
      hydration: { waterIntake: 2200 }
    },
    {
      date: '2024-01-06',
      steps: 15800,
      heartRate: { restingHeartRate: 63 },
      sleep: { duration: 8.5, quality: 0.92 },
      activity: { activeMinutes: 75, exerciseMinutes: 50, caloriesBurned: 580 },
      nutrition: { calories: 2100, protein: 140, carbs: 240, fat: 75, fiber: 35 },
      hydration: { waterIntake: 2800 }
    },
    {
      date: '2024-01-07',
      steps: 12450,
      heartRate: { restingHeartRate: 65 },
      sleep: { duration: 7.5, quality: 0.85 },
      activity: { activeMinutes: 45, exerciseMinutes: 30, caloriesBurned: 450 },
      nutrition: { calories: 1850, protein: 120, carbs: 200, fat: 65, fiber: 28 },
      hydration: { waterIntake: 2200 }
    }
  ],

  // Monthly averages
  monthly: {
    averageSteps: 11800,
    averageRestingHeartRate: 66,
    averageSleepDuration: 7.5,
    averageSleepQuality: 0.84,
    averageActiveMinutes: 50,
    averageCaloriesBurned: 460,
    averageWaterIntake: 2300
  },

  // Goals
  goals: {
    steps: 10000,
    restingHeartRate: 65,
    sleepDuration: 8,
    sleepQuality: 0.85,
    activeMinutes: 45,
    exerciseMinutes: 30,
    caloriesBurned: 450,
    waterIntake: 2500,
    protein: 120,
    fiber: 30
  }
};

// Function to generate realistic health data
export function generateHealthData(days = 7) {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate realistic variations
    const baseSteps = 12000 + (Math.random() - 0.5) * 4000;
    const baseHeartRate = 65 + (Math.random() - 0.5) * 10;
    const baseSleep = 7.5 + (Math.random() - 0.5) * 2;
    
    data.push({
      date: date.toISOString().split('T')[0],
      steps: Math.round(baseSteps),
      heartRate: {
        restingHeartRate: Math.round(baseHeartRate),
        averageHeartRate: Math.round(baseHeartRate + 5 + Math.random() * 10),
        maxHeartRate: Math.round(140 + Math.random() * 20),
        heartRateVariability: Math.round(40 + Math.random() * 20)
      },
      sleep: {
        duration: Math.round(baseSleep * 10) / 10,
        quality: 0.7 + Math.random() * 0.25,
        deepSleep: Math.round((baseSleep * 0.25 + Math.random() * 0.5) * 10) / 10,
        lightSleep: Math.round((baseSleep * 0.55 + Math.random() * 0.3) * 10) / 10,
        remSleep: Math.round((baseSleep * 0.2 + Math.random() * 0.2) * 10) / 10
      },
      activity: {
        activeMinutes: Math.round(40 + Math.random() * 30),
        exerciseMinutes: Math.round(25 + Math.random() * 20),
        caloriesBurned: Math.round(400 + Math.random() * 150),
        distance: Math.round((baseSteps / 1500 + Math.random() * 2) * 10) / 10,
        floors: Math.round(10 + Math.random() * 10)
      },
      nutrition: {
        calories: Math.round(1800 + Math.random() * 300),
        protein: Math.round(100 + Math.random() * 40),
        carbs: Math.round(180 + Math.random() * 60),
        fat: Math.round(60 + Math.random() * 20),
        fiber: Math.round(20 + Math.random() * 15),
        sugar: Math.round(40 + Math.random() * 20)
      },
      hydration: {
        waterIntake: Math.round(2000 + Math.random() * 600),
        target: 2500
      }
    });
  }
  
  return data;
}

// Function to simulate real-time data updates
export function simulateRealTimeData() {
  return {
    currentHeartRate: Math.round(70 + Math.random() * 30),
    currentSteps: Math.round(Math.random() * 1000),
    currentCalories: Math.round(Math.random() * 50),
    currentDistance: Math.round((Math.random() * 0.5) * 100) / 100
  };
}
