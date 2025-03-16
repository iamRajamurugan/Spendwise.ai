import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API securely
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' }); // Updated to latest version

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your financial assistant powered by Gemini AI. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  // Initialize chat session
  useEffect(() => {
    chatRef.current = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 800, // Limit output tokens to prevent long responses
      },
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (customMessage) => {
    if ((!input.trim() && !customMessage) || isLoading) return;

    const userMessage = customMessage || input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const systemPrompt = `
        You are a highly skilled AI **financial advisor**. Your task is to provide users with **accurate** and **detailed** financial guidance, including:
        - **Investment strategies**
        - **Budgeting tips**
        - **Stock market insights**
        - **Cryptocurrency trends**
        - **Retirement planning**
        - **Debt management**

        ❌ **DO NOT** provide direct investment guarantees or legal financial advice.
        ✅ **DO** provide general insights, tips, and resources.

        Here is the user's question: "${userMessage}"
      `;

      const result = await chatRef.current.sendMessage(systemPrompt);
      const text = await result.response.text();

      // Shorten long responses
      const shortResponse = text.length > 800 ? text.substring(0, 800) + "..." : text;

      setMessages(prev => [...prev, { text: shortResponse, isUser: false }]);
    } catch (error) {
      console.error('Error getting response from Gemini:', error);
      
      let errorMessage = "I couldn't process that request. Try rephrasing your question.";
      
      if (error.message.includes("RECITATION")) {
        errorMessage = "I cannot provide exact financial predictions or legal advice. Try asking in a general way!";
      }

      setMessages(prev => [...prev, { text: errorMessage, isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim() && !isLoading) {
      handleSend();
    }
  };

  // Quick reply topics for faster interactions
  const topics = ["Investments", "Debt Management", "Stock Market", "Crypto Trends", "Budgeting Tips"];

  return (
    <PageContainer>
      <ChatContainer>
        <ChatHeader>
          <Title>Financial Assistant</Title>
        </ChatHeader>
        <ChatMessages>
          {messages.map((message, index) => (
            <Message key={index} isUser={message.isUser}>
              {message.text}
            </Message>
          ))}
          {isLoading && (
            <Message isUser={false}>
              <LoadingDots>
                <span></span>
                <span></span>
                <span></span>
              </LoadingDots>
            </Message>
          )}
          <div ref={messagesEndRef} />
        </ChatMessages>
        
        {/* Quick reply buttons */}
        <QuickReplies>
          {topics.map((topic) => (
            <QuickReplyButton key={topic} onClick={() => handleSend(topic)}>
              {topic}
            </QuickReplyButton>
          ))}
        </QuickReplies>

        <InputContainer>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <SendButton onClick={() => handleSend()} disabled={!input.trim() || isLoading}>
            Send
          </SendButton>
        </InputContainer>
      </ChatContainer>
    </PageContainer>
  );
};

export default ChatPage;

// Styled Components
const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0rem;
`;

const ChatContainer = styled.div`
  width: 100%;
  max-width: 900px;
  height: 600px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
`;

const Title = styled.h1`
  color: #00ea64;
  font-size: 1.5rem;
  margin: 0;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  max-width: 70%;
  padding: 1rem;
  border-radius: 12px;
  color: white;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  background: ${props => props.isUser ? '#00ea64' : 'rgba(255, 255, 255, 0.1)'};
`;

const InputContainer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 10px;
`;

const SendButton = styled.button`
  background: #00ea64;
  border: none;
  border-radius: 10px;
  padding: 0 1.5rem;
  color: white;
  font-size: 1rem;
  cursor: pointer;
`;

const QuickReplies = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
`;

const QuickReplyButton = styled.button`
  background: #007BFF;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
`;
const LoadingDots = styled.div`
  display: flex;
  gap: 4px;

  span {
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    animation: blink 1.4s infinite;
  }

  span:nth-child(2) {
    animation-delay: 0.2s;
  }

  span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes blink {
    0% { opacity: 0.3; }
    50% { opacity: 1; }
    100% { opacity: 0.3; }
  }
`;

