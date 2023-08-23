import News from "./components/news/News";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
import styled from "styled-components";
import { useState } from "react";
import "./firebase";
function App() {
  const [gridActive, setGridActive] = useState(false);
  const [listening, setlistening] = useState(true);
  const [blurEffect, setBlurEffect] = useState(false); 

  return (
    <div className="App">
      <Container>
        <Sidebar
         
          gridActive={gridActive}
          setGridActive={setGridActive}
          blurEffect={blurEffect} 
          setBlurEffect={setBlurEffect} 
        />
        <News gridActive={gridActive} blurEffect={blurEffect} />{" "}
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
`;
export default App;
