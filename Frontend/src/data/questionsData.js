export const questionsData = [
  {
    title: "Personal Information",
    questions: [
      { id: "name", label: "What is your name?", type: "text" },
      { id: "email", label: "What is your email address?", type: "email" },
      { id: "age", label: "What is your age?", type: "number" },
      { id: "occupation", label: "What is your occupation?", type: "text" }
    ]
  },
  {
    title: "Income Details",
    questions: [
      { id: "monthlyIncome", label: "What is your monthly income? (After taxes) (in ₹)", type: "number" },
      { id: "additionalIncome", label: "Do you have any additional sources of income?", type: "radio", options: ["Yes", "No"] },
      { 
        id: "additionalIncomeDetails", 
        label: "If yes, please specify the amount (in ₹) and source", 
        type: "text", 
        conditional: {
          questionId: "additionalIncome",
          value: "Yes"
        }
      }
    ]
  },
  {
    title: "Expense Categories",
    questions: [
      { id: "rent", label: "Rent/Mortgage (in ₹)", type: "number" },
      { id: "utilities", label: "Utilities (electricity, water, internet, etc.) (in ₹)", type: "number" },
      { id: "groceries", label: "Groceries (in ₹)", type: "number" },
      { id: "transportation", label: "Transportation (in ₹)", type: "number" },
      { id: "entertainment", label: "Entertainment (in ₹)", type: "number" },
      { id: "diningOut", label: "Dining Out (in ₹)", type: "number" },
      { id: "subscriptions", label: "Subscriptions (Netflix, Spotify, etc.) (in ₹)", type: "number" },
      { id: "otherExpenses", label: "Other (please specify) (in ₹)", type: "text" }
    ]
  },
  {
    title: "Savings",
    questions: [
      { id: "hasSavings", label: "Do you have any savings?", type: "radio", options: ["Yes", "No"] },
      { 
        id: "savingsAmount", 
        label: "If yes, how much do you currently have saved? (in ₹)", 
        type: "number", 
        conditional: {
          questionId: "hasSavings",
          value: "Yes"
        }
      },
      { id: "savingsPercentage", label: "What percentage of your income do you save each month?", type: "number" }
    ]
  },
  {
    title: "Debt",
    questions: [
      { id: "hasDebt", label: "Do you have any debt?", type: "radio", options: ["Yes", "No"] },
      { 
        id: "debtType", 
        label: "Type of debt", 
        type: "text", 
        conditional: {
          questionId: "hasDebt",
          value: "Yes"
        }
      },
      { 
        id: "debtAmount", 
        label: "Total amount owed (in ₹)", 
        type: "number", 
        conditional: {
          questionId: "hasDebt",
          value: "Yes"
        }
      },
      { 
        id: "monthlyPayment", 
        label: "Monthly payment (in ₹)", 
        type: "number", 
        conditional: {
          questionId: "hasDebt",
          value: "Yes"
        }
      },
      { 
        id: "interestRate", 
        label: "Interest rate (%)", 
        type: "number", 
        conditional: {
          questionId: "hasDebt",
          value: "Yes"
        }
      }
    ]
  },
  {
    title: "Financial Goals",
    questions: [
      { id: "shortTermGoals", label: "What are your short-term financial goals?", type: "textarea" },
      { id: "longTermGoals", label: "What are your long-term financial goals?", type: "textarea" },
      { id: "goalsAmount", label: "How much do you need to achieve these goals? (in ₹)", type: "number" }
    ]
  },
  {
    title: "Risk Tolerance",
    questions: [
      {
        id: "riskTolerance",
        label: "How comfortable are you with taking financial risks?",
        type: "radio",
        options: ["Low risk", "Moderate risk", "High risk"]
      }
    ]
  },
  {
    title: "Personal and Lifestyle",
    questions: [
      { id: "maritalStatus", label: "What is your marital status?", type: "select", options: ["Single", "Married", "Domestic Partnership"] },
      { id: "hasDependents", label: "Do you have any dependents?", type: "radio", options: ["Yes", "No"] },
      { 
        id: "dependentsCount", 
        label: "If yes, how many?", 
        type: "number", 
        conditional: {
          questionId: "hasDependents",
          value: "Yes"
        }
      },
      { id: "livingStatus", label: "What is your living situation?", type: "select", options: ["Rent", "Own", "Live with family/friends"] },
      { id: "location", label: "What city and country do you live in?", type: "text" }
    ]
  },
  {
    title: "Financial Behavior",
    questions: [
      { id: "budgeting", label: "Do you currently use a budget?", type: "radio", options: ["Yes", "No"] },
      { 
        id: "budgetingMethod", 
        label: "If yes, how do you track it?", 
        type: "select", 
        options: ["Spreadsheet", "App", "Manually"], 
        conditional: {
          questionId: "budgeting",
          value: "Yes"
        }
      },
      { id: "savingsFrequency", label: "How often do you save money?", type: "select", options: ["Monthly", "Occasionally", "Rarely"] },
      { id: "financialLiteracy", label: "How would you rate your knowledge of personal finance?", type: "select", options: ["Beginner", "Intermediate", "Advanced"] }
    ]
  },
  {
    title: "Technology Preferences",
    questions: [
      { id: "techSavvy", label: "How comfortable are you with using technology?", type: "select", options: ["Not comfortable", "Somewhat comfortable", "Very comfortable"] },
      { id: "appPreferences", label: "What features do you value most in a financial app?", type: "multiselect", options: ["Simplicity", "Detailed insights", "Gamification", "Budgeting tools", "Investment tracking"] },
      { id: "notificationPreference", label: "How often would you like to receive notifications?", type: "select", options: ["Daily", "Weekly", "Only important updates"] }
    ]
  }
];
