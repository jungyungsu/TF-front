import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';


const VideoBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  & video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(60%);
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
`;

const CenteredText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999999;
`;

const Text = styled.div`
  color: #ffffff; 
  text-decoration: none; 
  font-size: 3rem; 
  white-space: pre-line; /* 여러 줄의 텍스트를 표시할 수 있도록 합니다. */
  & a { 
    color: #ffffff; 
    text-decoration: none; 
    background-color: rgba(0, 0, 0, 0.4);
    padding: 1rem 2rem;
    border-radius: 4px;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
  z-index: 3;
`;

function Main() {
  const [typedText, setTypedText] = useState("");
  const [fullText, setFullText] = useState("설레이는 여행을 \n 떠나 볼까요?");

  useEffect(() => {
    let timerId;
    if (typedText !== fullText) {
      timerId = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 150);
    }
    return () => clearTimeout(timerId);
  }, [typedText, fullText]);

  return (
    <VideoBackground>
      <video src={process.env.PUBLIC_URL + '/videos/Travel_1.mp4'} autoPlay loop muted />
      <CenteredText>
        <Text>
          <Link to="/board">🛫여행하기🛬</Link>
        </Text>
      </CenteredText>
      <Text style={{ position: 'absolute', bottom: '10%', left: '5%' }}>
        {typedText}
      </Text>
    </VideoBackground>
  );
}

export default Main;