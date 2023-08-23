import React, { useState } from "react";
import styled from "styled-components";
import { FaNewspaper } from "react-icons/fa";
import { AiOutlineUnorderedList } from "react-icons/ai";
const Feedback = ({ listen, setListening }) => {
  const [listeningActive, setlisteningActive] = useState(false);

  return (
    <FeedbackDiv>
      <h2>Have a Feedback?</h2>

      <FeedbackButtonContainer>
        <FeedbackButton
          style={{
            backgroundColor: "#f09794",
          }}
          onClick={() => {
            setlisteningActive(true);
            setListening(true);
          }}
        >
          We're listening
        </FeedbackButton>
      </FeedbackButtonContainer>
    </FeedbackDiv>
  );
};

const FeedbackDiv = styled.div`
  background-color: white;
  width: 80%;
  border-radius: 10px;
  margin-left: 10%;
  padding-top: 2px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  margin-top: 50px; /* Add margin to separate User and FeedbackDiv */
  text-align: center; /* Center the content horizontally */
`;

const FeedbackButtonContainer = styled.div`
  padding: 0px 10px 10px 10px;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  margin-top: 10px; /* Add some spacing between the icons and the header */
`;
const FeedbackButton = styled.span`
  cursor: pointer;
  font-size: 14px;
  height: 30px;
  background-color: "#f09794";

  border-radius: 5px;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

export default Feedback;
