import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { questionsData } from '../data/questionsData';

const QuestionnaireContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: 
    radial-gradient(circle at 0% 0%, #133033 0%, transparent 35%),
    radial-gradient(circle at 100% 0%, #1b2a38 0%, transparent 35%),
    radial-gradient(circle at 100% 100%, #083329 0%, transparent 35%),
    radial-gradient(circle at 0% 100%, #010b13 0%, transparent 35%),
    #010b13;
`;

const FormCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 600px;
  height: 600px;
  color: white;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  color: #00ea64;
  margin-bottom: 1.5rem;
  text-align: center;
  flex-shrink: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
  overflow-y: auto;
  padding-right: 1rem;
  margin-bottom: 1rem;
  width: 100%;

  /* Prevent horizontal scroll */
  > div {
    width: 100%;
    min-width: 0;
  }

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 234, 100, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(0, 234, 100, 0.5);
    }
  }
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.8rem;
  color: white;
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ea64;
    box-shadow: 0 0 0 2px rgba(0, 234, 100, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.8rem;
  color: white;
  font-size: 1rem;
  width: 100%;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ea64;
    box-shadow: 0 0 0 2px rgba(0, 234, 100, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.8rem;
  color: white;
  font-size: 1rem;
  width: 100%;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #00ea64;
    box-shadow: 0 0 0 2px rgba(0, 234, 100, 0.2);
  }

  option {
    background: #1a1a1a;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const RadioButton = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: ${props => props.checked ? '#00ea64' : 'white'};
  transition: color 0.3s ease;

  input {
    cursor: pointer;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  flex-shrink: 0;
`;

const Button = styled.button`
  background: ${props => props.secondary ? 'transparent' : '#00ea64'};
  color: ${props => props.secondary ? '#00ea64' : 'black'};
  border: ${props => props.secondary ? '2px solid #00ea64' : 'none'};
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.secondary ? 'rgba(0, 234, 100, 0.1)' : '#00cc55'};
    transform: translateY(-2px);
  }

  &:disabled {
    background: #666;
    border-color: #666;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorText = styled.span`
  color: #ff4d4d;
  font-size: 0.9rem;
  margin-top: 0.3rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-bottom: 2rem;
  overflow: hidden;
  flex-shrink: 0;
`;

const Progress = styled.div`
  width: ${props => props.percentage}%;
  height: 100%;
  background: #00ea64;
  transition: width 0.3s ease;
`;

const QuestionnaireForm = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
    }
  }, [navigate]);

  const handleInputChange = (questionId, value) => {
    if (questionId.includes('.')) {
      const [parent, child] = questionId.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [questionId]: value
      }));
    }
    if (errors[questionId]) {
      setErrors(prev => ({ ...prev, [questionId]: '' }));
    }
  };

  const handleNext = () => {
    const currentQuestions = questionsData[currentSection].questions;
    const newErrors = {};
    let hasErrors = false;

    currentQuestions.forEach(question => {
      if (question.conditional) {
        const dependentQuestion = currentQuestions.find(q => q.id === question.conditional.questionId);
        if (dependentQuestion && formData[dependentQuestion.id] !== question.conditional.value) {
          return;
        }
      }

      let value;
      if (question.id.includes('.')) {
        const [parent, child] = question.id.split('.');
        value = formData[parent]?.[child];
      } else {
        value = formData[question.id];
      }

      if (!value && value !== 0) {
        newErrors[question.id] = 'This field is required';
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    if (currentSection < questionsData.length - 1) {
      setCurrentSection(prev => prev + 1);
      setErrors({});
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const structuredData = {
        personalInfo: {
          name: formData.name || '',
          age: Number(formData.age) || 0,
          occupation: formData.occupation || ''
        },
        income: {
          monthlyIncome: Number(formData.monthlyIncome) || 0,
          additionalIncome: formData.additionalIncome || '',
          additionalIncomeDetails: formData.additionalIncomeDetails || ''
        },
        expenses: {
          rent: Number(formData.rent) || 0,
          utilities: Number(formData.utilities) || 0,
          groceries: Number(formData.groceries) || 0,
          transportation: Number(formData.transportation) || 0,
          entertainment: Number(formData.entertainment) || 0,
          diningOut: Number(formData.diningOut) || 0,
          subscriptions: Number(formData.subscriptions) || 0,
          otherExpenses: formData.otherExpenses || ''
        },
        savings: {
          hasSavings: formData.hasSavings || '',
          savingsAmount: Number(formData.savingsAmount) || 0,
          savingsPercentage: Number(formData.savingsPercentage) || 0
        },
        debt: {
          hasDebt: formData.hasDebt || '',
          debtType: formData.debtType || '',
          debtAmount: Number(formData.debtAmount) || 0,
          monthlyPayment: Number(formData.monthlyPayment) || 0,
          interestRate: Number(formData.interestRate) || 0
        },
        goals: {
          shortTermGoals: formData.shortTermGoals || '',
          longTermGoals: formData.longTermGoals || '',
          goalsAmount: Number(formData.goalsAmount) || 0
        },
        riskTolerance: formData.riskTolerance || '',
        personal: {
          maritalStatus: formData.maritalStatus || '',
          hasDependents: formData.hasDependents || '',
          dependentsCount: Number(formData.dependentsCount) || 0,
          livingStatus: formData.livingStatus || '',
          location: formData.location || ''
        },
        behavior: {
          budgeting: formData.budgeting || '',
          budgetingMethod: formData.budgetingMethod || '',
          savingsFrequency: formData.savingsFrequency || '',
          financialLiteracy: formData.financialLiteracy || ''
        },
        preferences: {
          techSavvy: formData.techSavvy || '',
          appPreferences: Array.isArray(formData.appPreferences) ? formData.appPreferences : [],
          notificationPreference: formData.notificationPreference || ''
        }
      };

      await onComplete(structuredData);
      navigate('/home');
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      setErrors({ submit: 'Failed to submit questionnaire. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const shouldShowQuestion = (question) => {
    if (!question.conditional) return true;
    const dependentQuestion = questionsData[currentSection].questions.find(
      q => q.id === question.conditional.questionId
    );
    return dependentQuestion && formData[dependentQuestion.id] === question.conditional.value;
  };

  const getValue = (questionId) => {
    if (questionId.includes('.')) {
      const [parent, child] = questionId.split('.');
      return formData[parent]?.[child] || '';
    }
    return formData[questionId] || '';
  };

  const renderInput = (question) => {
    const shouldShow = shouldShowQuestion(question);
    
    if (!shouldShow) return null;

    switch (question.type) {
      case 'radio':
        return (
          <RadioGroup>
            {question.options.map(option => (
              <RadioButton key={option} checked={getValue(question.id) === option}>
                <input
                  type="radio"
                  value={option}
                  checked={getValue(question.id) === option}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                />
                {option}
              </RadioButton>
            ))}
          </RadioGroup>
        );
      case 'select':
        return (
          <Select
            value={getValue(question.id) || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
          >
            <option value="">Select an option</option>
            {question.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
        );
      case 'textarea':
        return (
          <TextArea
            value={getValue(question.id) || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder={question.label}
          />
        );
      default:
        return (
          <Input
            type={question.type}
            value={getValue(question.id) || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder={question.label}
          />
        );
    }
  };

  const currentQuestions = questionsData[currentSection].questions;
  const progress = ((currentSection + 1) / questionsData.length) * 100;

  return (
    <QuestionnaireContainer>
      <FormCard>
        <ProgressBar>
          <Progress percentage={progress} />
        </ProgressBar>
        <Title>{questionsData[currentSection].title}</Title>
        <Form onSubmit={(e) => e.preventDefault()}>
          {currentQuestions.map(question => (
            <div key={question.id}>
              <label>{question.label}</label>
              {renderInput(question)}
              {errors[question.id] && <ErrorText>{errors[question.id]}</ErrorText>}
            </div>
          ))}
          {errors.submit && <ErrorText>{errors.submit}</ErrorText>}
          <ButtonGroup>
            <Button 
              type="button" 
              onClick={handleBack} 
              disabled={currentSection === 0 || isSubmitting}
              secondary
            >
              Back
            </Button>
            <Button 
              type="button" 
              onClick={handleNext}
              disabled={isSubmitting}
            >
              {currentSection === questionsData.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </ButtonGroup>
        </Form>
      </FormCard>
    </QuestionnaireContainer>
  );
};

export default QuestionnaireForm;
