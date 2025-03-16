import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  padding: 1rem;
  color: white;
  display: flex;
  justify-content: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: 250px 250px;
  row-gap: 5.65rem;
  column-gap: 2.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 0rem;
`;

const ProfileSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SectionTitle = styled.h2`
  color: #00ea64;
  margin-bottom: 1.25rem;
  font-size: 1.4rem;
  font-weight: 500;
  flex-shrink: 0;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 234, 100, 0.3);
    border-radius: 3px;
    
    &:hover {
      background: rgba(0, 234, 100, 0.5);
    }
  }
`;

const InfoItem = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const Label = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Value = styled.div`
  color: white;
  font-size: 1.1rem;
  word-break: break-word;
`;

const ProfilePage = ({ onLogout }) => {
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

  if (loading) {
    return (
      <ProfileContainer>
        <div>Loading...</div>
      </ProfileContainer>
    );
  }

  if (error) {
    return (
      <ProfileContainer>
        <div>Error: {error}</div>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <GridContainer>
        <ProfileSection>
          <SectionTitle>Personal Information</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <Label>Name</Label>
              <Value>{userData?.questionnaire?.personalInfo?.name || 'Not provided'}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Age</Label>
              <Value>{userData?.questionnaire?.personalInfo?.age || 'Not provided'}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Occupation</Label>
              <Value>{userData?.questionnaire?.personalInfo?.occupation || 'Not provided'}</Value>
            </InfoItem>
          </InfoGrid>
        </ProfileSection>

        <ProfileSection>
          <SectionTitle>Financial Overview</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <Label>Monthly Income</Label>
              <Value>₹{userData?.questionnaire?.income?.monthlyIncome?.toLocaleString() || '0'}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Monthly Savings</Label>
              <Value>{userData?.questionnaire?.savings?.savingsPercentage || '0'}%</Value>
            </InfoItem>
            <InfoItem>
              <Label>Has Debt</Label>
              <Value>{userData?.questionnaire?.debt?.hasDebt || 'No'}</Value>
            </InfoItem>
          </InfoGrid>
        </ProfileSection>

        <ProfileSection>
          <SectionTitle>Goals</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <Label>Short Term Goals</Label>
              <Value>{userData?.questionnaire?.goals?.shortTermGoals || 'Not set'}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Long Term Goals</Label>
              <Value>{userData?.questionnaire?.goals?.longTermGoals || 'Not set'}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Target Amount</Label>
              <Value>₹{userData?.questionnaire?.goals?.goalsAmount?.toLocaleString() || '0'}</Value>
            </InfoItem>
          </InfoGrid>
        </ProfileSection>

        <ProfileSection>
          <SectionTitle>Lifestyle</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <Label>Marital Status</Label>
              <Value>{userData?.questionnaire?.personal?.maritalStatus || 'Not provided'}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Living Status</Label>
              <Value>{userData?.questionnaire?.personal?.livingStatus || 'Not provided'}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Location</Label>
              <Value>{userData?.questionnaire?.personal?.location || 'Not provided'}</Value>
            </InfoItem>
          </InfoGrid>
        </ProfileSection>
      </GridContainer>
    </ProfileContainer>
  );
};

export default ProfilePage;
