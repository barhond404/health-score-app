import React, { useState } from 'react';
import { format, addMonths } from 'date-fns';
import { 
  Shield, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Edit,
  Plus,
  Minus,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const PolicyDashboard = ({ healthScore, scoreCategory }) => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [modificationType, setModificationType] = useState('');
  const [newSumAssured, setNewSumAssured] = useState('');
  const [applyHealthDiscount, setApplyHealthDiscount] = useState(false);

  // Sample policy data
  const policies = [
    {
      id: 'POL001',
      type: 'Life Insurance',
      provider: 'SecureLife Insurance',
      currentPremium: 85.50,
      sumAssured: 500000,
      nextPaymentDate: addMonths(new Date(), 1),
      status: 'Active',
      startDate: new Date('2023-01-15'),
      term: '20 years',
      healthDiscount: 0.15, // 15% discount for good health
      policyNumber: 'SL-2023-001234'
    },
    {
      id: 'POL002',
      type: 'Critical Illness',
      provider: 'HealthGuard Insurance',
      currentPremium: 45.75,
      sumAssured: 250000,
      nextPaymentDate: addMonths(new Date(), 1),
      status: 'Active',
      startDate: new Date('2023-03-20'),
      term: '15 years',
      healthDiscount: 0.10, // 10% discount for good health
      policyNumber: 'HG-2023-005678'
    },
    {
      id: 'POL003',
      type: 'Disability Insurance',
      provider: 'ProtectPlus Insurance',
      currentPremium: 32.25,
      sumAssured: 300000,
      nextPaymentDate: addMonths(new Date(), 1),
      status: 'Active',
      startDate: new Date('2023-06-10'),
      term: '25 years',
      healthDiscount: 0.12, // 12% discount for good health
      policyNumber: 'PP-2023-009876'
    }
  ];

  const calculateHealthDiscount = (policy) => {
    if (healthScore >= 80) {
      return policy.currentPremium * policy.healthDiscount;
    }
    return 0;
  };

  const calculateNewPremium = (policy, newSumAssured, applyDiscount) => {
    const basePremium = (newSumAssured / policy.sumAssured) * policy.currentPremium;
    const discount = applyDiscount && healthScore >= 80 ? basePremium * policy.healthDiscount : 0;
    return basePremium - discount;
  };

  const handleModifyPolicy = (policy, type) => {
    setSelectedPolicy(policy);
    setModificationType(type);
    setNewSumAssured(policy.sumAssured.toString());
    setApplyHealthDiscount(healthScore >= 80);
    setShowModifyModal(true);
  };

  const handleSaveModifications = () => {
    // Here you would typically make an API call to update the policy
    console.log('Saving modifications:', {
      policy: selectedPolicy,
      newSumAssured: parseInt(newSumAssured),
      applyHealthDiscount,
      newPremium: calculateNewPremium(selectedPolicy, parseInt(newSumAssured), applyHealthDiscount)
    });
    setShowModifyModal(false);
  };

  const getHealthDiscountMessage = () => {
    if (healthScore >= 90) return "Excellent health! You qualify for maximum premium discounts.";
    if (healthScore >= 80) return "Great health! You qualify for premium discounts.";
    if (healthScore >= 70) return "Good health! Consider improving your score for better rates.";
    return "Focus on improving your health score to qualify for premium discounts.";
  };

  return (
    <div>
      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Policy Dashboard
            </h1>
            <p className="text-white text-lg opacity-90">
              Manage your insurance policies and premiums
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-white text-sm">Health Score</div>
              <div className="text-2xl font-bold text-white">{healthScore}</div>
              <div className="text-white text-xs opacity-75">{scoreCategory.category}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Health Score Impact */}
      <div className="card mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-full ${healthScore >= 80 ? 'bg-success bg-opacity-20' : 'bg-warning bg-opacity-20'}`}>
            {healthScore >= 80 ? <CheckCircle className="w-6 h-6 text-success" /> : <AlertCircle className="w-6 h-6 text-warning" />}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">Health Score Impact</h3>
            <p className="text-secondary">{getHealthDiscountMessage()}</p>
          </div>
        </div>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {policies.map((policy) => {
          const healthDiscount = calculateHealthDiscount(policy);
          const discountedPremium = policy.currentPremium - healthDiscount;
          
          return (
            <div key={policy.id} className="card hover:scale-105 transition-transform">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary">{policy.type}</h3>
                  <p className="text-secondary text-sm">{policy.provider}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  policy.status === 'Active' ? 'bg-success bg-opacity-20 text-success' : 'bg-warning bg-opacity-20 text-warning'
                }`}>
                  {policy.status}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Policy Number:</span>
                  <span className="font-mono text-sm">{policy.policyNumber}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Current Premium:</span>
                  <div className="text-right">
                    <div className="font-bold text-primary">${policy.currentPremium.toFixed(2)}</div>
                    {healthDiscount > 0 && (
                      <div className="text-success text-sm">-${healthDiscount.toFixed(2)} health discount</div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-secondary">Sum Assured:</span>
                  <span className="font-bold text-primary">${policy.sumAssured.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-secondary">Next Payment:</span>
                  <span className="text-primary">{format(policy.nextPaymentDate, 'MMM dd, yyyy')}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-secondary">Term:</span>
                  <span className="text-primary">{policy.term}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="btn btn-primary flex-1"
                  onClick={() => handleModifyPolicy(policy, 'sum_assured')}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Modify Sum Assured
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleModifyPolicy(policy, 'health_discount')}
                  disabled={healthScore < 80}
                >
                  <TrendingDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Policy Summary */}
      <div className="card">
        <h3 className="text-xl font-bold text-primary mb-4">Policy Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{policies.length}</div>
            <div className="text-secondary">Active Policies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              ${policies.reduce((sum, policy) => sum + policy.currentPremium, 0).toFixed(2)}
            </div>
            <div className="text-secondary">Total Monthly Premium</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success">
              ${policies.reduce((sum, policy) => sum + calculateHealthDiscount(policy), 0).toFixed(2)}
            </div>
            <div className="text-secondary">Monthly Health Savings</div>
          </div>
        </div>
      </div>

      {/* Modification Modal */}
      {showModifyModal && selectedPolicy && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Modify {selectedPolicy.type} Policy
            </h2>
            
            {modificationType === 'sum_assured' && (
              <div className="space-y-4">
                <div>
                  <label className="form-label">Current Sum Assured</label>
                  <div className="text-lg font-bold text-primary">
                    ${selectedPolicy.sumAssured.toLocaleString()}
                  </div>
                </div>
                
                <div>
                  <label className="form-label">New Sum Assured</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newSumAssured}
                    onChange={(e) => setNewSumAssured(e.target.value)}
                    placeholder="Enter new sum assured"
                  />
                </div>

                <div>
                  <label className="form-label">New Monthly Premium</label>
                  <div className="text-lg font-bold text-primary">
                    ${calculateNewPremium(selectedPolicy, parseInt(newSumAssured) || 0, applyHealthDiscount).toFixed(2)}
                  </div>
                </div>
              </div>
            )}

            {modificationType === 'health_discount' && (
              <div className="space-y-4">
                <div className="p-4 bg-success bg-opacity-10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-semibold text-success">Health Discount Available</span>
                  </div>
                  <p className="text-sm text-secondary">
                    Your health score of {healthScore} qualifies you for a {selectedPolicy.healthDiscount * 100}% premium discount.
                  </p>
                </div>

                <div>
                  <label className="form-label">Current Premium</label>
                  <div className="text-lg font-bold text-primary">
                    ${selectedPolicy.currentPremium.toFixed(2)}
                  </div>
                </div>

                <div>
                  <label className="form-label">Discounted Premium</label>
                  <div className="text-lg font-bold text-success">
                    ${(selectedPolicy.currentPremium * (1 - selectedPolicy.healthDiscount)).toFixed(2)}
                  </div>
                </div>

                <div>
                  <label className="form-label">Monthly Savings</label>
                  <div className="text-lg font-bold text-success">
                    ${(selectedPolicy.currentPremium * selectedPolicy.healthDiscount).toFixed(2)}
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <button
                className="btn btn-secondary flex-1"
                onClick={() => setShowModifyModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary flex-1"
                onClick={handleSaveModifications}
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyDashboard;
