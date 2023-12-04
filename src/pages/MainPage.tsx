import React, { useState, useRef } from 'react'
import CanvasDraw from 'react-canvas-draw'
import styled from 'styled-components'

function MainPage() {
  const [drawingMode, setDrawingMode] = useState(true)
  const canvasRef = useRef(null)

  const handleDrawButtonClick = () => {
    setDrawingMode(true)
  }

  const handleEraseButtonClick = () => {
    setDrawingMode(false)
  }

  const handleCanvasClick = () => {
    // No need to add any logic here when using react-canvas-draw
  }

  return (
    <AppContainer>
      <Header>EmotiArt</Header>
      <Container>
        <ToolBar>
          <DrawButton onClick={handleDrawButtonClick}>그리기</DrawButton>
          <EraseButton onClick={handleEraseButtonClick}>지우기</EraseButton>
        </ToolBar>
        <CanvasDraw
          ref={canvasRef}
          brushColor={drawingMode ? 'black' : 'white'}
          style={{ border: '2px solid #333' }}
          canvasWidth={1800}
          canvasHeight={800}
        />
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
