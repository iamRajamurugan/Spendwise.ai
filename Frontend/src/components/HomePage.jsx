import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: 4rem;
  margin-bottom: 2rem;
`;

const BouncingImage = styled.img`
  width: 120px;
  height: 120px;
  animation: ${bounce} 3s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(0, 234, 100, 0.3));
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const Button = styled(motion.button)`
  padding: ${props => props.main ? '1rem 2rem' : '0.8rem 1.5rem'};
  border: none;
  border-radius: 10px;
  background: ${props => props.main ? '#00ea64' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  font-size: ${props => props.main ? '1.2rem' : '1rem'};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${props => props.main ? '#00c853' : 'rgba(255, 255, 255, 0.15)'};
  }
`;

const ModalContent = styled.div`
  color: white;
  padding: 1rem;

  h3 {
    color: #00ea64;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  ul {
    margin-bottom: 2rem;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      color: rgba(255, 255, 255, 0.9);
    }
  }
`;

const spendingCategories = [
  'Food',
  'Rent',
  'Utilities',
  'Transportation',
  'Entertainment',
  'Subscriptions',
  'Other'
];

const HomePage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isSpendingModalOpen, setIsSpendingModalOpen] = useState(false);
  const [isSavingModalOpen, setIsSavingModalOpen] = useState(false);
  const [savingAmount, setSavingAmount] = useState('');
  const [spendingCategory, setSpendingCategory] = useState('');
  const [spendingAmount, setSpendingAmount] = useState('');

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleSavingSubmit = () => {
    // Handle saving submission here
    console.log('Saved amount:', savingAmount);
    setIsSavingModalOpen(false);
    setSavingAmount('');
  };

  const handleSpendingSubmit = () => {
    // Handle spending submission here
    console.log('Spending:', { category: spendingCategory, amount: spendingAmount });
    setIsSpendingModalOpen(false);
    setSpendingCategory('');
    setSpendingAmount('');
  };

  return (
    <ContentContainer>
      <ImageContainer>
        <BouncingImage 
          src="https://cdn-icons-png.flaticon.com/512/2534/2534183.png" 
          alt="Money Growth"
        />
        <BouncingImage 
          src="https://cdn-icons-png.flaticon.com/512/2535/2535557.png" 
          alt="Investment"
        />
      </ImageContainer>
      <ButtonContainer>
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsSpendingModalOpen(true)}
        >
          Spending
        </Button>
        <Button
          main
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/chat')}
        >
          Chat Financially
        </Button>
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsSavingModalOpen(true)}
        >
          Saving
        </Button>
      </ButtonContainer>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Welcome to MoMa!"
      >
        <ModalContent>
          <h3>Let's begin your financial journey</h3>
          <p>MoMa helps you:</p>
          <ul>
            <li>Track your expenses</li>
            <li>Set financial goals</li>
            <li>Get personalized insights</li>
            <li>Make better financial decisions</li>
          </ul>
          <Button
            main
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowModal(false);
              navigate('/insights');
            }}
          >
            Start Now
          </Button>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isSavingModalOpen}
        onClose={() => setIsSavingModalOpen(false)}
        title="Record Your Savings"
      >
        <ModalContent>
          <Input
            type="number"
            placeholder="Enter amount saved today"
            value={savingAmount}
            onChange={(e) => setSavingAmount(e.target.value)}
          />
          <SubmitButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSavingSubmit}
          >
            Save
          </SubmitButton>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isSpendingModalOpen}
        onClose={() => setIsSpendingModalOpen(false)}
        title="Record Your Spending"
      >
        <ModalContent>
          <Select
            value={spendingCategory}
            onChange={(e) => setSpendingCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {spendingCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
          <Input
            type="number"
            placeholder="Enter amount spent"
            value={spendingAmount}
            onChange={(e) => setSpendingAmount(e.target.value)}
          />
          <SubmitButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSpendingSubmit}
          >
            Save
          </SubmitButton>
        </ModalContent>
      </Modal>
    </ContentContainer>
  );
};

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00ea64;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #00ea64;
  }

  option {
    background: #1b2a38;
    color: white;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background: #00ea64;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: #00c853;
  }
`;

export default HomePage;
