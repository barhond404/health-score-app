import React, { useState } from 'react';
import { X, Save, Upload } from 'lucide-react';

const DataInput = ({ currentData, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    steps: currentData.steps || '',
    restingHeartRate: currentData.heartRate?.restingHeartRate || '',
    averageHeartRate: currentData.heartRate?.averageHeartRate || '',
    maxHeartRate: currentData.heartRate?.maxHeartRate || '',
    sleepDuration: currentData.sleep?.duration || '',
    sleepQuality: currentData.sleep?.quality || '',
    activeMinutes: currentData.activity?.activeMinutes || '',
    exerciseMinutes: currentData.activity?.exerciseMinutes || '',
    caloriesBurned: currentData.activity?.caloriesBurned || '',
    nutritionCalories: currentData.nutrition?.calories || '',
    nutritionProtein: currentData.nutrition?.protein || '',
    nutritionCarbs: currentData.nutrition?.carbs || '',
    nutritionFat: currentData.nutrition?.fat || '',
    nutritionFiber: currentData.nutrition?.fiber || '',
    waterIntake: currentData.hydration?.waterIntake || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedData = {
      steps: parseInt(formData.steps) || 0,
      heartRate: {
        restingHeartRate: parseInt(formData.restingHeartRate) || 0,
        averageHeartRate: parseInt(formData.averageHeartRate) || 0,
        maxHeartRate: parseInt(formData.maxHeartRate) || 0,
        heartRateVariability: currentData.heartRate?.heartRateVariability || 45
      },
      sleep: {
        duration: parseFloat(formData.sleepDuration) || 0,
        quality: parseFloat(formData.sleepQuality) || 0.8,
        deepSleep: currentData.sleep?.deepSleep || 2.1,
        lightSleep: currentData.sleep?.lightSleep || 4.2,
        remSleep: currentData.sleep?.remSleep || 1.2
      },
      activity: {
        activeMinutes: parseInt(formData.activeMinutes) || 0,
        exerciseMinutes: parseInt(formData.exerciseMinutes) || 0,
        caloriesBurned: parseInt(formData.caloriesBurned) || 0,
        distance: currentData.activity?.distance || 8.2,
        floors: currentData.activity?.floors || 12
      },
      nutrition: {
        calories: parseInt(formData.nutritionCalories) || 0,
        protein: parseInt(formData.nutritionProtein) || 0,
        carbs: parseInt(formData.nutritionCarbs) || 0,
        fat: parseInt(formData.nutritionFat) || 0,
        fiber: parseInt(formData.nutritionFiber) || 0,
        sugar: currentData.nutrition?.sugar || 45
      },
      hydration: {
        waterIntake: parseInt(formData.waterIntake) || 0,
        target: currentData.hydration?.target || 2500
      }
    };

    onUpdate(updatedData);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          // Validate and update form data
          if (data.steps) setFormData(prev => ({ ...prev, steps: data.steps }));
          if (data.heartRate?.restingHeartRate) setFormData(prev => ({ ...prev, restingHeartRate: data.heartRate.restingHeartRate }));
          if (data.sleep?.duration) setFormData(prev => ({ ...prev, sleepDuration: data.sleep.duration }));
          // Add more validations as needed
        } catch (error) {
          alert('Invalid JSON file. Please check the format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Update Health Data</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div className="form-group">
            <label className="form-label flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Import from Health App (JSON)
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="form-input"
            />
            <p className="text-xs text-secondary mt-1">
              Upload a JSON file exported from your health app
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Steps */}
            <div className="form-group">
              <label className="form-label">Daily Steps</label>
              <input
                type="number"
                name="steps"
                value={formData.steps}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 10000"
                min="0"
              />
            </div>

            {/* Resting Heart Rate */}
            <div className="form-group">
              <label className="form-label">Resting Heart Rate (BPM)</label>
              <input
                type="number"
                name="restingHeartRate"
                value={formData.restingHeartRate}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 65"
                min="40"
                max="120"
              />
            </div>

            {/* Average Heart Rate */}
            <div className="form-group">
              <label className="form-label">Average Heart Rate (BPM)</label>
              <input
                type="number"
                name="averageHeartRate"
                value={formData.averageHeartRate}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 72"
                min="40"
                max="200"
              />
            </div>

            {/* Max Heart Rate */}
            <div className="form-group">
              <label className="form-label">Max Heart Rate (BPM)</label>
              <input
                type="number"
                name="maxHeartRate"
                value={formData.maxHeartRate}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 145"
                min="40"
                max="220"
              />
            </div>

            {/* Sleep Duration */}
            <div className="form-group">
              <label className="form-label">Sleep Duration (Hours)</label>
              <input
                type="number"
                name="sleepDuration"
                value={formData.sleepDuration}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 7.5"
                min="0"
                max="24"
                step="0.1"
              />
            </div>

            {/* Sleep Quality */}
            <div className="form-group">
              <label className="form-label">Sleep Quality (0-1)</label>
              <input
                type="number"
                name="sleepQuality"
                value={formData.sleepQuality}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 0.85"
                min="0"
                max="1"
                step="0.01"
              />
            </div>

            {/* Active Minutes */}
            <div className="form-group">
              <label className="form-label">Active Minutes</label>
              <input
                type="number"
                name="activeMinutes"
                value={formData.activeMinutes}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 45"
                min="0"
              />
            </div>

            {/* Exercise Minutes */}
            <div className="form-group">
              <label className="form-label">Exercise Minutes</label>
              <input
                type="number"
                name="exerciseMinutes"
                value={formData.exerciseMinutes}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 30"
                min="0"
              />
            </div>

            {/* Calories Burned */}
            <div className="form-group">
              <label className="form-label">Calories Burned</label>
              <input
                type="number"
                name="caloriesBurned"
                value={formData.caloriesBurned}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 450"
                min="0"
              />
            </div>

            {/* Nutrition Calories */}
            <div className="form-group">
              <label className="form-label">Daily Calories</label>
              <input
                type="number"
                name="nutritionCalories"
                value={formData.nutritionCalories}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 1850"
                min="0"
              />
            </div>

            {/* Protein */}
            <div className="form-group">
              <label className="form-label">Protein (g)</label>
              <input
                type="number"
                name="nutritionProtein"
                value={formData.nutritionProtein}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 120"
                min="0"
              />
            </div>

            {/* Carbs */}
            <div className="form-group">
              <label className="form-label">Carbs (g)</label>
              <input
                type="number"
                name="nutritionCarbs"
                value={formData.nutritionCarbs}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 200"
                min="0"
              />
            </div>

            {/* Fat */}
            <div className="form-group">
              <label className="form-label">Fat (g)</label>
              <input
                type="number"
                name="nutritionFat"
                value={formData.nutritionFat}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 65"
                min="0"
              />
            </div>

            {/* Fiber */}
            <div className="form-group">
              <label className="form-label">Fiber (g)</label>
              <input
                type="number"
                name="nutritionFiber"
                value={formData.nutritionFiber}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 28"
                min="0"
              />
            </div>

            {/* Water Intake */}
            <div className="form-group">
              <label className="form-label">Water Intake (ml)</label>
              <input
                type="number"
                name="waterIntake"
                value={formData.waterIntake}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 2200"
                min="0"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="btn btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Update Data
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataInput;
