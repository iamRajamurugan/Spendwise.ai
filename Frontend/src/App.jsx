import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import ChatPage from './pages/ChatPage'
import QuestionnaireForm from './components/QuestionnaireForm'
import HomePage from './components/HomePage'
import InsightsPage from './pages/InsightsPage'
import MotivatePage from './pages/MotivatePage'
import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'
import LandingPage from './pages/LandingPage'
import InvestmentPage from './pages/InvestmentPage'
import styled from 'styled-components'
import Layout from './components/Layout'

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: 
    radial-gradient(circle at 0% 0%, #133033 0%, transparent 35%),
    radial-gradient(circle at 100% 0%, #1b2a38 0%, transparent 35%),
    radial-gradient(circle at 100% 100%, #083329 0%, transparent 35%),
    radial-gradient(circle at 0% 100%, #010b13 0%, transparent 35%),
    #010b13;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const PageTransition = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.5s ease;
  position: absolute;
  pointer-events: ${props => props.show ? 'auto' : 'none'};
`;

// AppContent component to use hooks inside Router
function AppContent() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const navigate = useNavigate();

  const handleLogin = (userData, authToken) => {
    setToken(authToken);
    setUser(userData);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setToken(null);
    setUser({});
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleQuestionnaireComplete = async (questionnaireData) => {
    try {
      const response = await fetch('http://localhost:5000/api/questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(questionnaireData)
      });

      if (!response.ok) {
        throw new Error('Failed to save questionnaire');
      }

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Error saving questionnaire:', error);
    }
  };

  // Protected route component
  const PrivateRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/" />;
    }
    if (!user.isQuestionnaireDone && window.location.pathname !== '/questionnaire') {
      return <Navigate to="/questionnaire" />;
    }
    return children;
  };

  return (
    <AppContainer>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={
          token ? <Navigate to="/home" /> : <AuthPage onLogin={handleLogin} />
        } />
        
        {/* Protected routes */}
        <Route path="/questionnaire" element={
          !token ? <Navigate to="/" /> :
          user.isQuestionnaireDone ? <Navigate to="/home" /> :
          <QuestionnaireForm onComplete={handleQuestionnaireComplete} />
        } />

        <Route path="/home" element={
          <PrivateRoute>
            <Layout onLogout={handleLogout}>
              <HomePage onLogout={handleLogout} />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/insights" element={
          <PrivateRoute>
            <Layout onLogout={handleLogout}>
              <InsightsPage />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/investment" element={
          <PrivateRoute>
            <Layout onLogout={handleLogout}>
              <InvestmentPage />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/motivate" element={
          <PrivateRoute>
            <Layout onLogout={handleLogout}>
              <MotivatePage />
            </Layout>
          </PrivateRoute>
        } />
        <Route path="/chat" element={
          <PrivateRoute>
            <Layout onLogout={handleLogout}>
              <ChatPage />
            </Layout>
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Layout onLogout={handleLogout}>
              <ProfilePage onLogout={handleLogout} />
            </Layout>
          </PrivateRoute>
        } />
      </Routes>
    </AppContainer>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
