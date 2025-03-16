import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: 
    radial-gradient(circle at 0% 0%, #133033 0%, transparent 35%),
    radial-gradient(circle at 100% 0%, #1b2a38 0%, transparent 35%),
    radial-gradient(circle at 100% 100%, #083329 0%, transparent 35%),
    radial-gradient(circle at 0% 100%, #010b13 0%, transparent 35%),
    #010b13;
`;

const NavContainer = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Logo = styled.div`
  color: #00ea64;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const NavItems = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #00ea64;
  }
`;

const ProfileIcon = styled(FaUserCircle)`
  color: #00ea64;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const LogoutIcon = styled(FaSignOutAlt)`
  color: #00ea64;
  font-size: 1.3rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin-left: 1rem;

  &:hover {
    transform: scale(1.1);
    color: #ff4d4d;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
  padding: 2rem;
`;

const Layout = ({ children, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <PageWrapper>
      <NavContainer>
        <Navbar>
          <Logo onClick={handleLogoClick}>SpendWise AI</Logo>
          <NavItems>
            <NavItem onClick={() => navigate('/insights')}>Insights</NavItem>
            <NavItem onClick={() => navigate('/motivate')}>Motivate</NavItem>
            <NavItem onClick={() => navigate('/investment')}>Invest</NavItem>
            <ProfileIcon onClick={() => navigate('/profile')} />
            <LogoutIcon onClick={onLogout} title="Logout" />
          </NavItems>
        </Navbar>
      </NavContainer>
      <MainContent>
        {children}
      </MainContent>
    </PageWrapper>
  );
};

export default Layout;
