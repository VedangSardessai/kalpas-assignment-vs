import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const SuccessToast = ({ message, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <ToastWrapper isVisible={isVisible}>
      <ToastContent>{message}</ToastContent>
    </ToastWrapper>
  );
};

const ToastWrapper = styled.div`
  position: fixed;
  top: 30px;
  right:  ${({ isVisible }) =>
    isVisible ? "30px" : "0"};;
  background-color: #5bc8a1;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  animation: ${slideIn} 0.5s ease-in-out;
  transform: ${({ isVisible }) =>
    isVisible ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.5s ease-in-out;
`;

const ToastContent = styled.p`
  margin: 0;
`;

export default SuccessToast;
