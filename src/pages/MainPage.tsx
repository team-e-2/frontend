import React, { useState } from 'react'
import styled from 'styled-components'

function MainPage() {
  const [drawingMode, setDrawingMode] = useState(true)

  const handleDrawButtonClick = () => {
    setDrawingMode(true)
  }

  const handleEraseButtonClick = () => {
    setDrawingMode(false)
  }

  const handleCanvasClick = () => {
    // 여기에 그림을 그리거나 지우는 로직을 추가할 수 있습니다.
  }

  return (
    <AppContainer>
      <Header>EmotiArt</Header>
      <Container>
        <ToolBar>
          <DrawButton onClick={handleDrawButtonClick}>그리기</DrawButton>
          <EraseButton onClick={handleEraseButtonClick}>지우기</EraseButton>
        </ToolBar>
        <Canvas onClick={handleCanvasClick}></Canvas>
      </Container>
    </AppContainer>
  )
}

export default MainPage

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  color: #333;
  border: solid gray 2px;
  width: 100%;
  height: 10%;
  font-size: 40px;
  display: flex;
  align-items: center;
  padding-left: 40px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
  background-color: #b4b4b4;
  font-family: Arial, sans-serif;
`

const ToolBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 100px;
`

const Canvas = styled.div`
  width: 1800px;
  height: 800px;
  border: 2px solid #333;
  background-color: #fff;
  margin-top: 20px;
  cursor: crosshair;
`

const DrawButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 1em;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`

const EraseButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`
