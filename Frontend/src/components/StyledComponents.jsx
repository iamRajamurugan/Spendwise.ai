import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

export const RadioButton = styled.label`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  background: ${props => props.checked 
    ? 'rgba(0, 234, 100, 0.1)' 
    : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.checked ? '#00ea64' : 'white'};
  border: 1px solid ${props => props.checked ? '#00ea64' : 'rgba(255, 255, 255, 0.1)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 234, 100, 0.05);
    transform: translateY(-2px);
  }

  input {
    display: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    border-color: #00ea64;
    box-shadow: 0 0 0 3px rgba(0, 234, 100, 0.1);
  }

  option {
    background: #010b13;
    color: white;
    padding: 1rem;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  outline: none;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  transition: all 0.3s ease;

  &:focus {
    border-color: #00ea64;
    box-shadow: 0 0 0 3px rgba(0, 234, 100, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: ${fadeIn} 0.3s ease;

  &:before {
    content: '⚠';
    font-size: 1rem;
  }
`;

export const ProgressText = styled.div`
  text-align: center;
  color: #00ea64;
  font-weight: 500;
  margin-top: 1rem;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
`;

export const SectionTitle = styled(motion.h2)`
  color: #00ea64;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  font-size: 1.8rem;
  font-weight: 600;

  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #00ea64 0%, transparent 100%);
  }
`;

export const QuestionLabel = styled(motion.label)`
  display: block;
  margin-bottom: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 1.1rem;
`;

export const BackgroundDecoration = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  background: 
    radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 20%);
`;
