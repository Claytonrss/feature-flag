import styled, { keyframes } from "styled-components";

export const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const FullScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.9);
`;

export const Spinner = styled.div`
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top: 5px solid #ff4500;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spinAnimation} 2s linear infinite;
`;
