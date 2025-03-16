const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  isQuestionnaireDone: {
    type: Boolean,
    default: false
  },
  questionnaire: {
    personalInfo: {
      name: String,
      age: Number,
      occupation: String
    },
    income: {
      monthlyIncome: Number,
      additionalIncome: String,
      additionalIncomeDetails: String
    },
    expenses: {
      rent: Number,
      utilities: Number,
      groceries: Number,
      transportation: Number,
      entertainment: Number,
      diningOut: Number,
      subscriptions: Number,
      otherExpenses: String
    },
    savings: {
      hasSavings: String,
      savingsAmount: Number,
      savingsPercentage: Number
    },
    debt: {
      hasDebt: String,
      debtType: String,
      debtAmount: Number,
      monthlyPayment: Number,
      interestRate: Number
    },
    goals: {
      shortTermGoals: String,
      longTermGoals: String,
      goalsAmount: Number
    },
    riskTolerance: String,
    personal: {
      maritalStatus: String,
      hasDependents: String,
      dependentsCount: Number,
      livingStatus: String,
      location: String
    },
    behavior: {
      budgeting: String,
      budgetingMethod: String,
      savingsFrequency: String,
      financialLiteracy: String
    },
    preferences: {
      techSavvy: String,
      appPreferences: [String],
      notificationPreference: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
