import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  PieChart, Pie,
  Tooltip,
  Legend,
  Cell,
  BarChart, XAxis, YAxis, Bar
} from 'recharts';

const InsightsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
  color: white;
  display: flex;
  gap: 1rem;
  margin-left:10rem;
`;

const MainContent = styled.div`
  flex: 1;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    align-items: stretch;
  }
`;

const ChartSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem;
  height: ${props => props.height || '320px'};
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 1023px) {
    grid-column: 1 / -1;
    height: ${props => props.mobileHeight || props.height || '320px'};
  }
`;

const ChartWrapper = styled.div`
  flex: 1;
  min-height: 0;
  position: relative;
`;

const FoodFactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #FF6B6B;
  text-align: center;
`;

const FoodFactAmount = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 0.5rem 0;
  text-shadow: 0 0 10px rgba(255, 107, 107, 0.3);
`;

const FoodFactText = styled.div`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 80%;
  line-height: 1.5;
`;

const SectionTitle = styled.h2`
  color: #00ea64;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  text-align: center;
`;

const TestTubeContainer = styled.div`
  position: absolute;
  right: -120px;
  top: 55%;
  transform: translateY(-50%);
  width: 55px;
  height: 380px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 20px rgba(0, 234, 100, 0.1),
    inset 0 0 15px rgba(255, 255, 255, 0.05);
  &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    height: 30px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px 20px 0 0;
    backdrop-filter: blur(5px);
  }
`;

const TestTube = styled.div`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 28px;
  background: linear-gradient(to bottom, 
    rgba(0, 234, 100, 0.1) 0%,
    rgba(0, 234, 100, 0.3) 20%,
    rgba(0, 234, 100, 0.5) 40%,
    rgba(0, 234, 100, 0.7) 60%,
    rgba(0, 234, 100, 0.8) 80%,
    rgba(0, 234, 100, 0.9) 100%
  );
  border-radius: 14px 14px 0 0;
  transition: height 1s ease;
  height: ${props => props.fillPercentage}%;
  box-shadow: 
    0 0 15px rgba(0, 234, 100, 0.3),
    inset 0 0 10px rgba(255, 255, 255, 0.2);
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 3px;
    width: 5px;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 3px;
    width: 2px;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 1px;
  }
`;

const TestTubeOutline = styled.div`
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 28px;
  height: calc(100% - 50px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 14px 14px 0 0;
  box-shadow: 
    0 0 10px rgba(255, 255, 255, 0.1),
    inset 0 0 10px rgba(255, 255, 255, 0.05);
  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 42px;
    height: 25px;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px 20px 0 0;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 30%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.1) 70%,
      transparent 100%
    );
  }
`;

const BalanceAmount = styled.div`
  color: #00ea64;
  font-size: 1.1rem;
  text-align: center;
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  text-shadow: 
    0 0 10px rgba(0, 234, 100, 0.3),
    0 0 20px rgba(0, 234, 100, 0.2);
  font-weight: 500;
  letter-spacing: 0.5px;
  background: rgba(0, 234, 100, 0.1);
  padding: 5px 10px;
  border-radius: 10px;
`;

const COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Turquoise
  '#45B7D1', // Blue
  '#96CEB4', // Mint
  '#FFEEAD', // Yellow
  '#D4A5A5', // Pink
  '#9FA8DA'  // Purple
];

const ProgressBarContainer = styled.div`
  width: 60px;
  height: 500px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  position: relative;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
`;

const ProgressTitle = styled.div`
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  color: #00ea64;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const ProgressValue = styled.div`
  position: absolute;
  left: 50%;
  top: ${props => Math.min(Math.max(props.percentage - 15, 5), 85)}%;
  transform: translateX(-50%) rotate(-90deg);
  color: white;
  font-size: 0.85rem;
  white-space: nowrap;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  transition: top 0.3s ease;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.4);
  padding: 2px 8px;
  border-radius: 10px;
  letter-spacing: 0.5px;
`;

const ProgressBarTrack = styled.div`
  width: 30px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: ${props => props.percentage}%;
  background: linear-gradient(180deg, #FF6B6B 0%, #00ea64 100%);
  position: absolute;
  bottom: 0;
  transition: height 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 234, 100, 0.3);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 8px;

  &::after {
    content: '${props => props.percentage.toFixed(1)}%';
    color: white;
    font-size: 0.9rem;
    transform: rotate(-90deg);
    white-space: nowrap;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  }
`;

const InsightsPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        const response = await fetch('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setUserData(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const prepareExpenseData = () => {
    if (!userData?.questionnaire?.expenses) return [];

    const expenses = userData.questionnaire.expenses;
    const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + (val || 0), 0);
    
    return [
      { name: 'Rent', value: expenses.rent || 0, color: COLORS[0] },
      { name: 'Utilities', value: expenses.utilities || 0, color: COLORS[1] },
      { name: 'Groceries', value: expenses.groceries || 0, color: COLORS[2] },
      { name: 'Transportation', value: expenses.transportation || 0, color: COLORS[3] },
      { name: 'Entertainment', value: expenses.entertainment || 0, color: COLORS[4] },
      { name: 'Dining Out', value: expenses.diningOut || 0, color: COLORS[5] },
      { name: 'Subscriptions', value: expenses.subscriptions || 0, color: COLORS[6] }
    ].filter(item => item.value > 0)
    .map(item => ({
      ...item,
      percentage: (item.value / totalExpenses) * 100
    }));
  };

  const prepareSavingsData = () => {
    if (!userData?.questionnaire?.income?.monthlyIncome) return [];
    const monthlyIncome = userData.questionnaire.income.monthlyIncome;
    const savingsPercentage = userData.questionnaire.savings?.savingsPercentage || 0;
    const expenses = userData.questionnaire.expenses || {};
    
    // Calculate total expenses
    const totalExpenses = Object.values(expenses).reduce((sum, val) => {
      const numVal = Number(val) || 0;
      return sum + numVal;
    }, 0);

    // Calculate savings amount based on savings percentage
    const savingsAmount = (monthlyIncome * savingsPercentage) / 100;

    return [
      { name: 'Savings', value: savingsAmount, fill: '#00ea64' },
      { name: 'Expenses', value: totalExpenses, fill: '#FF6B6B' }
    ];
  };

  const calculateSpendingPercentage = () => {
    if (!userData?.questionnaire?.income?.monthlyIncome) return 0;
    
    const monthlyIncome = userData.questionnaire.income.monthlyIncome;
    const expenses = userData.questionnaire.expenses || {};
    
    // Calculate total expenses
    const totalExpenses = Object.values(expenses).reduce((sum, val) => {
      const numVal = Number(val) || 0;
      return sum + numVal;
    }, 0);

    // Calculate percentage of salary spent
    const spentPercentage = (totalExpenses / monthlyIncome) * 100;
    return Math.min(spentPercentage, 100); // Cap at 100%
  };

  const getHighestExpense = () => {
    if (!userData?.questionnaire?.expenses) return { category: '', amount: 0 };
    const expenses = userData.questionnaire.expenses;
    const expenseCategories = {
      rent: 'Rent',
      utilities: 'Utilities',
      groceries: 'Groceries',
      transportation: 'Transportation',
      entertainment: 'Entertainment',
      diningOut: 'Dining Out',
      subscriptions: 'Subscriptions'
    };
    
    let highestCategory = '';
    let highestAmount = 0;
    
    Object.entries(expenses).forEach(([category, amount]) => {
      if (amount > highestAmount) {
        highestAmount = amount;
        highestCategory = expenseCategories[category] || category;
      }
    });
    
    return { category: highestCategory, amount: highestAmount };
  };

  if (loading) {
    return (
      <div>
        <InsightsContainer>
          <div>Loading your financial insights...</div>
        </InsightsContainer>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <InsightsContainer>
          <div>Error: {error}</div>
        </InsightsContainer>
      </div>
    );
  }

  return (
    <div>
      <InsightsContainer>
        <ProgressBarContainer>
          <ProgressTitle>Salary Spent</ProgressTitle>
          <ProgressBarTrack>
            <ProgressBar percentage={calculateSpendingPercentage()}>
              <ProgressValue percentage={calculateSpendingPercentage()}>
                {`${calculateSpendingPercentage().toFixed(0)}%`}
              </ProgressValue>
            </ProgressBar>
          </ProgressBarTrack>
        </ProgressBarContainer>
        <MainContent>
          <ChartGrid>
            <ChartSection height="320px" mobileHeight="280px">
              <SectionTitle>Monthly Savings Distribution</SectionTitle>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prepareSavingsData()}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {prepareSavingsData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `₹${value.toLocaleString()}`}
                    contentStyle={{
                      background: 'rgba(0, 0, 0, 0.8)',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '8px'
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend 
                    formatter={(value, entry) => {
                      const data = prepareSavingsData().find(item => item.name === value);
                      return `${value}: ₹${data.value.toLocaleString()}`;
                    }}
                    wrapperStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartSection>

            <ChartSection height="320px" mobileHeight="280px">
              <SectionTitle>Monthly Expenses Breakdown</SectionTitle>
              <ChartWrapper>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={prepareExpenseData()}
                    layout="vertical"
                    margin={{ top: 5, right: 25, left: 55, bottom: 5 }}
                  >
                    <XAxis type="number" tickFormatter={(value) => `₹${value.toLocaleString()}`} />
                    <YAxis dataKey="name" type="category" width={90} />
                    <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {prepareExpenseData().map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </ChartSection>

            <ChartSection style={{ gridColumn: '1 / -1' }} height="180px" mobileHeight="160px">
              <SectionTitle>Highest Monthly Expense</SectionTitle>
              <FoodFactContainer>
                <FoodFactAmount>₹{getHighestExpense().amount.toLocaleString()}</FoodFactAmount>
                <FoodFactText>
                  Your highest expense this month is {getHighestExpense().category}
                </FoodFactText>
              </FoodFactContainer>
            </ChartSection>
          </ChartGrid>
        </MainContent>
      </InsightsContainer>
    </div>
  );
};

export default InsightsPage;
