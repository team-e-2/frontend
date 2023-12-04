import React, { useState, useRef } from 'react'
import CanvasDraw from 'react-canvas-draw'
import styled from 'styled-components'
import html2canvas from 'html2canvas'

function MainPage() {
  const [drawingMode, setDrawingMode] = useState(true)
  const canvasRef = useRef<CanvasDraw | null>(null)

  const handleDrawButtonClick = () => {
    setDrawingMode(true)
  }

  const handleEraseButtonClick = () => {
    setDrawingMode(false)
  }

  const handleCanvasClick = () => {
    if (canvasRef.current) {
      // CanvasDraw 컴포넌트가 렌더링되는 DOM 요소를 캡처
      const canvasElement = document.getElementById('canvas-draw')

      if (canvasElement) {
        html2canvas(canvasElement).then((canvas) => {
          const drawingDataURL = canvas.toDataURL('image/png')

          // 데이터 URL을 다운로드할 수 있는 링크를 생성합니다.
          const downloadLink = document.createElement('a')
          downloadLink.href = drawingDataURL
          downloadLink.download = 'drawing.png'

          // 링크를 클릭하여 다운로드를 시작합니다.
          document.body.appendChild(downloadLink)
          downloadLink.click()
          document.body.removeChild(downloadLink)
        })
      }
    }
  }

  return (
    <AppContainer>
      <Header>EmotiArt</Header>
      <Container>
        <ToolBar>
          <DrawButton onClick={handleDrawButtonClick}>그리기</DrawButton>
          <EraseButton onClick={handleEraseButtonClick}>지우기</EraseButton>
          <SubmitButton onClick={handleCanvasClick}>그림 전송</SubmitButton>
        </ToolBar>
        <Canvas id="canvas-draw">
          <CanvasDraw
            ref={canvasRef}
            brushColor={drawingMode ? 'black' : 'white'}
            style={{ border: '2px solid #333' }}
            canvasWidth={1800}
            canvasHeight={800}
          />
        </Canvas>
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

const Canvas = styled.div``

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
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`

const SubmitButton = styled.button`
  background-color: #8f36f4;
  color: white;
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #d32fd3;
  }
`
