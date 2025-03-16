import React, { useState } from 'react';
import styled from 'styled-components';

const InvestmentPage = () => {
  const [activeTab, setActiveTab] = useState('investments');

  const investmentOptions = [
    {
      type: 'Stock Market',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500',
      title: 'Stock Market Investment',
      description: 'Invest in top performing stocks with potential high returns. Diversify your portfolio with carefully selected companies.',
      recommendation: 'Recommended for long-term growth'
    },
    {
      type: 'Mutual Funds',
      image: 'https://images.unsplash.com/photo-1633158829875-e5316a358c6f?w=500',
      title: 'Mutual Funds',
      description: 'Professional managed investment funds pooling money from multiple investors. Lower risk through diversification.',
      recommendation: 'Ideal for balanced returns'
    },
    {
      type: 'Cryptocurrency',
      image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500',
      title: 'Cryptocurrency',
      description: 'Digital currency investments with high growth potential. Explore Bitcoin, Ethereum, and other leading cryptocurrencies.',
      recommendation: 'High risk, high reward potential'
    },
    {
      type: 'Gold & Commodities',
      image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=500',
      title: 'Gold & Commodities',
      description: 'Traditional safe-haven investments. Protect your wealth with precious metals and commodity investments.',
      recommendation: 'Stable value preservation'
    }
  ];

  const startups = [
    {
      name: 'GreenTech Solutions',
      image: 'https://plus.unsplash.com/premium_photo-1717003486758-182a8d80c225?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      sector: 'Clean Energy',
      description: 'Revolutionary solar energy storage technology for sustainable power solutions.',
      funding: 'Seeking $2M - Series A',
      growth: '+200% YoY'
    },
    {
      name: 'HealthAI',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500',
      sector: 'Healthcare Tech',
      description: 'AI-powered diagnostic tools for early disease detection.',
      funding: 'Seeking $5M - Series B',
      growth: '+150% YoY'
    },
    {
      name: 'FinFlow',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500',
      sector: 'FinTech',
      description: 'Next-gen payment processing platform for global transactions.',
      funding: 'Seeking $3M - Series A',
      growth: '+180% YoY'
    },
    {
      name: 'AgriTech Innovations',
      image: 'https://plus.unsplash.com/premium_photo-1663045953977-c466316ede91?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      sector: 'Agriculture',
      description: 'Smart farming solutions using IoT and data analytics.',
      funding: 'Seeking $1.5M - Seed',
      growth: '+120% YoY'
    }
  ];

  return (
    <PageContainer>
      <SubNav>
        <NavItem 
          active={activeTab === 'investments'} 
          onClick={() => setActiveTab('investments')}
        >
          Investment Options
        </NavItem>
        <NavItem 
          active={activeTab === 'startups'} 
          onClick={() => setActiveTab('startups')}
        >
          Featured Startups
        </NavItem>
      </SubNav>

      <ContentContainer>
        {activeTab === 'investments' && (
          <Section>
            <SectionTitle>Investment Opportunities</SectionTitle>
            <GridContainer>
              {investmentOptions.map((option, index) => (
                <Card key={index}>
                  <ImageContainer>
                    <CardImage src={option.image} alt={option.type} />
                  </ImageContainer>
                  <CardContent>
                    <CardTitle>{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                    <Recommendation>{option.recommendation}</Recommendation>
                  </CardContent>
                </Card>
              ))}
            </GridContainer>
          </Section>
        )}

        {activeTab === 'startups' && (
          <Section>
            <SectionTitle>Featured Startups</SectionTitle>
            <GridContainer>
              {startups.map((startup, index) => (
                <Card key={index}>
                  <ImageContainer>
                    <CardImage src={startup.image} alt={startup.name} />
                  </ImageContainer>
                  <CardContent>
                    <CardTitle>{startup.name}</CardTitle>
                    <Sector>{startup.sector}</Sector>
                    <CardDescription>{startup.description}</CardDescription>
                    <StartupDetails>
                      <DetailItem>{startup.funding}</DetailItem>
                      <DetailItem>Growth: {startup.growth}</DetailItem>
                    </StartupDetails>
                  </CardContent>
                </Card>
              ))}
            </GridContainer>
          </Section>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  color: white;
  display: flex;
  flex-direction: column;
`;

const SubNav = styled.nav`
  display: flex;
  gap: 2rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  margin-bottom: 1rem;
  flex-shrink: 0;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: 0 2rem 2rem;

  &::-webkit-scrollbar {
    width: 6px;
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

const Section = styled.section`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #00ea64;
  margin-bottom: 2rem;
  font-weight: 500;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
  height: 380px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 234, 100, 0.3);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  flex-shrink: 0;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  color: #00ea64;
  margin-bottom: 0.5rem;
`;

const Sector = styled.div`
  color: #00ea64;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  opacity: 0.9;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: auto;
`;

const Recommendation = styled.div`
  color: #00ea64;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
`;

const StartupDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.75rem;
  margin-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const DetailItem = styled.div`
  color: #00ea64;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavItem = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? '#00ea64' : 'rgba(255, 255, 255, 0.7)'};
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 8px;

  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #00ea64;
    transform: scaleX(${props => props.active ? 1 : 0});
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #00ea64;
    background: rgba(255, 255, 255, 0.05);
  }
`;

export default InvestmentPage;
