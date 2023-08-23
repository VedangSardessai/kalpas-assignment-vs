import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { FaNewspaper } from "react-icons/fa";
import { AiOutlineUnorderedList } from "react-icons/ai";
import FormComponent from "./feedback/form/FormComponent";

const Sidebar = ({ gridActive, setGridActive, blurEffect, setBlurEffect }) => {
  const [listening, setListening] = useState(false);

  const openCloseSidebar = () => {
    setListening(!listening);
    setBlurEffect(!blurEffect);
  };

  return (
    <SidebarDiv
      listening={listening}
      style={{
        minWidth: listening ? "1250px" : "350px",
      }}
    >
      <LeftColumn>
        <User>
          <ImageContainer>
            <img
              style={{
                height: "50px",
                width: "50px",
                borderRadius: "60%",
              }}
              src="https://media.istockphoto.com/id/1407759041/photo/confident-happy-beautiful-hispanic-student-girl-indoor-head-shot-portrait.jpg?s=612x612&w=is&k=20&c=Ek4l8KN-zYJfldW2GEs_cxqRwPakUJz-TAU2d8t5QQA="
              alt=""
            />
          </ImageContainer>
          <UserInfo>
            <p className="title">Hi Reader,</p>
            <p className="body">Here's your News!</p>
          </UserInfo>
        </User>

        {!listening && (
          <ViewToggle>
            <h2>View Toggle</h2>

            <ButtonsContainer>
              <GridSpan
                style={{
                  backgroundColor: gridActive ? "#96ebc6" : "#dae3ea",
                }}
                onClick={() => setGridActive(true)}
              >
                <FaNewspaper
                  style={{
                    color: gridActive ? "black" : "rgb(186, 185, 185)",
                  }}
                />
              </GridSpan>
              <ListSpan
                onClick={() => setGridActive(false)}
                style={{
                  backgroundColor: !gridActive ? "#96ebc6" : "#dae3ea",
                }}
              >
                <AiOutlineUnorderedList
                  style={{
                    color: !gridActive ? "black" : "rgb(186, 185, 185)",
                  }}
                />
              </ListSpan>
            </ButtonsContainer>
          </ViewToggle>
        )}
        <FeedbackDiv>
          <h2>Have a Feedback?</h2>

          <FeedbackButtonContainer>
            <FeedbackButton
              style={{
                backgroundColor: !listening ? "#96ebc6" : "#f09794",
              }}
              onClick={() => openCloseSidebar()}
            >
              We're listening
            </FeedbackButton>
          </FeedbackButtonContainer>
        </FeedbackDiv>
      </LeftColumn>
      <RightColumn>
        {listening && (
          <FadeInDiv onClick={() => setListening(true)} className="hsdfsdf">
            <FeedbackInputSection listening={listening}>
              <h2>Thank you so much for taking the time!</h2>
              <p
                style={{
                  marginTop: "-25px",
                }}
              >
                Please provide the below details!
              </p>
              <FormComponent />
            </FeedbackInputSection>
          </FadeInDiv>
        )}
      </RightColumn>
    </SidebarDiv>
  );
};
const SidebarDiv = styled.div`
  background-color: #e7eef4;
  justify-content: center;
  text-align: center;
  z-index: 999;
  padding-top: 50px;
  height: 710px;
  border-radius: 20px;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);

  transition: min-width 0.3s ease-in-out;

  ${({ listening }) =>
    listening &&
    css`
      animation: slideIn 0.3s ease-in-out;
    `}
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div``;

const User = styled.div`
  display: flex;
  padding-top: 20px;
  background-color: white;
  height: 80px;
  width: 280px;
  border-radius: 10px;
  margin-left: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

const ImageContainer = styled.div`
  margin-right: 20px;
  margin-left: 20px;
`;

const UserInfo = styled.div``;

const ViewToggle = styled.div`
  background-color: white;
  width: 280px;

  border-radius: 10px;
  margin-left: 30px;

  padding-top: 2px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  margin-top: 50px;
  text-align: center;
`;

const ButtonsContainer = styled.div`
  padding: 0px 10px 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
const ListSpan = styled.span`
  cursor: pointer;
  font-size: 40px;
  padding: 2px 10px 0px 10px;
  border-radius: 0px 10px 10px 0px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;
const GridSpan = styled.span`
  cursor: pointer;
  font-size: 40px;
  border-radius: 10px 0px 0px 10px;
  padding: 2px 10px 0px 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

const FeedbackDiv = styled.div`
  background-color: white;
  width: 280px;

  border-radius: 10px;
  margin-left: 30px;

  padding-top: 2px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  margin-top: 50px;
  text-align: center;
`;

const FeedbackButtonContainer = styled.div`
  padding: 0px 10px 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
const FeedbackButton = styled.span`
  cursor: pointer;
  font-size: 14px;
  height: 30px;

  border-radius: 5px;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const FadeInDiv = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
`;
const FeedbackInputSection = styled.div`
  margin-left: 200px;
  position: absolute;
  top: 0;
  left: 300px;
  height: 80%;
  border-radius: 10px;
  padding: 10px;
  text-align: left;
`;

export default Sidebar;
