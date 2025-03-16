import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 900px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  color: white;
`;

const Title = styled.h1`
  color: #00ea64;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const MotivatePage = () => {
  return (
    <Container>
      <Title>Financial Motivation</Title>
      <h1>THIS PAGE IS UNDER DEVELOPMENT</h1>
    </Container>
  );
};

export default MotivatePage;
