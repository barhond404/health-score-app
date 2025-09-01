# Health Score Dashboard

A comprehensive local frontend application that displays and calculates health scores from health app data, including data from phones and smartwatches.

## Features

### 🏥 **Comprehensive Health Scoring**
- Calculates overall health score (0-100) based on multiple metrics
- Individual scores for each health category
- Weighted scoring system prioritizing key health indicators

### 📊 **Health Metrics Tracked**
- **Steps** (25% weight) - Daily step count with 10,000 step target
- **Heart Rate** (20% weight) - Resting heart rate monitoring
- **Sleep** (20% weight) - Duration and quality tracking
- **Activity** (15% weight) - Active minutes and exercise tracking
- **Nutrition** (10% weight) - Calorie and macronutrient balance
- **Hydration** (10% weight) - Daily water intake monitoring

### 📈 **Data Visualization**
- Interactive charts showing weekly trends
- Progress bars for each health metric
- Real-time score updates
- Historical data tracking

### 🎯 **Personalized Recommendations**
- AI-powered health improvement suggestions
- Priority-based action items
- General health tips and best practices
- Customized action plans

### 📱 **Data Integration**
- Manual data input for all health metrics
- JSON file import from health apps
- Support for Apple Health, Google Fit, Fitbit data formats
- Real-time data simulation

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd health-score-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## How to Use

### 1. **View Your Health Score**
- The main dashboard displays your overall health score (0-100)
- See your health category (Excellent, Very Good, Good, Fair, Poor, Very Poor)
- View individual metric scores and progress

### 2. **Update Health Data**
- Click "Update Data" to manually enter your health metrics
- Import JSON files from your health apps
- Use "Generate Sample Data" to see the app in action

### 3. **Track Trends**
- View weekly health score trends
- Monitor individual metric progress over time
- See average performance across all categories

### 4. **Get Recommendations**
- Receive personalized health improvement suggestions
- View general health tips and best practices
- Follow the action plan for short and long-term goals

## Health Score Calculation

The application uses a sophisticated scoring algorithm that considers:

### Steps Score
- Target: 10,000 steps per day
- Bonus points for exceeding target
- Score: 0-100

### Heart Rate Score
- Optimal: 60-70 BPM (100 points)
- Good: 70-80 BPM (85 points)
- Average: 80-90 BPM (70 points)
- Below average: 90-100 BPM (50 points)
- Poor: <60 or >100 BPM (30 points)

### Sleep Score
- Optimal: 7-9 hours (100 points)
- Good: 6-7 hours (80 points)
- Acceptable: 9-10 hours (70 points)
- Poor: 5-6 hours (60 points)
- Very poor: <5 or >10 hours (30 points)
- Quality factor: 30% of total score

### Activity Score
- Active minutes target: 30+ minutes
- Exercise minutes target: 150+ minutes per week
- Calories burned target: 400+ calories
- Average of all three metrics

### Nutrition Score
- Calorie balance: 1800-2200 calories (optimal)
- Protein intake: 50-150g (optimal)
- Fiber intake: 25g+ (optimal)
- Balanced scoring across all metrics

### Hydration Score
- Target: 2000ml (2L) per day
- Linear scoring based on percentage of target

## Data Import

### Supported Health Apps
- Apple Health
- Google Fit
- Fitbit
- Samsung Health
- Garmin Connect
- Any app that exports JSON data

### JSON Format Example
```json
{
  "steps": 12450,
  "heartRate": {
    "restingHeartRate": 65,
    "averageHeartRate": 72,
    "maxHeartRate": 145
  },
  "sleep": {
    "duration": 7.5,
    "quality": 0.85
  },
  "activity": {
    "activeMinutes": 45,
    "exerciseMinutes": 30,
    "caloriesBurned": 450
  },
  "nutrition": {
    "calories": 1850,
    "protein": 120,
    "carbs": 200,
    "fat": 65,
    "fiber": 28
  },
  "hydration": {
    "waterIntake": 2200
  }
}
```

## Technology Stack

- **Frontend**: React 18 with Vite
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Styling**: Custom CSS with CSS Variables
- **Date Handling**: date-fns
- **Build Tool**: Vite

## Project Structure

```
health-score-app/
├── src/
│   ├── components/
│   │   ├── HealthScoreCard.jsx      # Main score display
│   │   ├── MetricsGrid.jsx          # Individual metrics
│   │   ├── WeeklyTrends.jsx         # Charts and trends
│   │   ├── Recommendations.jsx      # Health suggestions
│   │   └── DataInput.jsx            # Data entry form
│   ├── utils/
│   │   └── healthScoreCalculator.js # Scoring algorithm
│   ├── data/
│   │   └── sampleHealthData.js      # Sample data
│   ├── App.jsx                      # Main application
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles
├── public/
├── package.json
├── vite.config.js
└── README.md
```

## Customization

### Adding New Metrics
1. Update `healthScoreCalculator.js` with new scoring logic
2. Add new metric to the metrics array in `MetricsGrid.jsx`
3. Update the data structure in `sampleHealthData.js`
4. Add form fields in `DataInput.jsx`

### Modifying Weights
Edit the weights object in `healthScoreCalculator.js`:
```javascript
this.weights = {
  steps: 0.25,        // 25% weight
  heartRate: 0.20,    // 20% weight
  sleep: 0.20,        // 20% weight
  activity: 0.15,     // 15% weight
  nutrition: 0.10,    // 10% weight
  hydration: 0.10     // 10% weight
};
```

### Styling
- Modify CSS variables in `index.css` for theme changes
- Update component-specific styles in `App.css`
- Customize chart colors in individual components

## Privacy & Security

- **Local Storage**: All data is stored locally in your browser
- **No External APIs**: No data is sent to external servers
- **Offline Capable**: Works without internet connection
- **Data Export**: Export your health data as JSON

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or feature requests:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

## Future Enhancements

- [ ] Mobile app version
- [ ] Cloud sync capabilities
- [ ] More health metrics (blood pressure, weight, etc.)
- [ ] Integration with wearable APIs
- [ ] Machine learning for better recommendations
- [ ] Social features and challenges
- [ ] Export to PDF reports
- [ ] Dark mode theme
- [ ] Multi-language support

---

**Note**: This application is for educational and personal use. Always consult healthcare professionals for medical advice.
