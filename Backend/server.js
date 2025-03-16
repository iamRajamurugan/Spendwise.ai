require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isQuestionnaireDone: { type: Boolean, default: false },
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
  }
});

const User = mongoose.model('User', userSchema);

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

// Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        isQuestionnaireDone: user.isQuestionnaireDone
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        isQuestionnaireDone: user.isQuestionnaireDone
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/questionnaire', auth, async (req, res) => {
  try {
    const user = req.user;
    
    // Update user's questionnaire data
    user.questionnaire = req.body;
    user.isQuestionnaireDone = true;
    await user.save();

    res.json({
      user: {
        id: user._id,
        email: user.email,
        isQuestionnaireDone: user.isQuestionnaireDone,
        questionnaire: user.questionnaire
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/insights', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user.questionnaire) {
      return res.status(404).json({ error: 'No questionnaire data found' });
    }

    // Calculate monthly savings
    const monthlyIncome = user.questionnaire.income?.monthlyIncome || 0;
    const savingsPercentage = user.questionnaire.savings?.savingsPercentage || 0;
    const monthlySavings = (monthlyIncome * savingsPercentage) / 100;

    // Calculate total expenses
    const expenses = user.questionnaire.expenses || {};
    const totalExpenses = Object.values(expenses).reduce((sum, value) => sum + (value || 0), 0);

    // Calculate financial ratios
    const savingsRatio = monthlyIncome > 0 ? (monthlySavings / monthlyIncome) * 100 : 0;
    const expenseRatio = monthlyIncome > 0 ? (totalExpenses / monthlyIncome) * 100 : 0;

    const insights = {
      monthlyIncome,
      totalExpenses,
      monthlySavings,
      savingsRatio,
      expenseRatio,
      expenseBreakdown: {
        rent: expenses.rent || 0,
        utilities: expenses.utilities || 0,
        groceries: expenses.groceries || 0,
        transportation: expenses.transportation || 0,
        entertainment: expenses.entertainment || 0,
        diningOut: expenses.diningOut || 0,
        subscriptions: expenses.subscriptions || 0
      },
      financialHealth: {
        income: monthlyIncome,
        expenses: totalExpenses,
        savings: user.questionnaire.savings?.savingsAmount || 0,
        debt: user.questionnaire.debt?.debtAmount || 0
      }
    };

    res.json({ insights });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
