import { useState, useEffect } from 'react'
import Lottie from 'lottie-react'
import animationData from './animate.json'
import logo from './logo.png'
import './launchCSS.css'
import { motion } from 'framer-motion'

function LandingPage() {
  const [text, setText] = useState("");
  const quote = "Save money and money will save you";
  
  useEffect(() => {
    const targetText = "Spend Wise";
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setText(targetText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="text-section">
          <div className="title-container">
            <img src={logo} alt="Logo" className="logo" />
            <motion.h1
              className="title"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {text}
            </motion.h1>
          </div>
          <motion.div className="quote">
            <motion.div
              className="quote-line"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              <span>Save Money</span>
            </motion.div>
            <motion.div
              className="quote-line"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.5 }}
            >
              <span>Money will save you</span>
            </motion.div>
          </motion.div>
          <motion.a
            href="/auth"
            className="get-started-btn"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 3 }}
          >
            Get Started
          </motion.a>
        </div>
        <motion.div 
          className="animation-section"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <Lottie animationData={animationData} loop={true} />
        </motion.div>
      </div>
    </div>
  )
}

export default LandingPage
