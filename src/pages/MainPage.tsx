import React, { useState, useRef } from 'react'
import CanvasDraw from 'react-canvas-draw'
import styled from 'styled-components'
import html2canvas from 'html2canvas'
import convert from '../assets/convert.png'
import erase from '../assets/erase.png'
import draw from '../assets/draw.png'
import cat1 from '../assets/cat1.png'
import cat2 from '../assets/cat2.png'
import cat3 from '../assets/cat3.png'
import cat4 from '../assets/cat4.png'
import cat5 from '../assets/cat5.png'
import addFeel from '../assets/addFeel.png'

function MainPage() {
  const [drawingMode, setDrawingMode] = useState(true)
  const canvasRef = useRef<CanvasDraw | null>(null)
  // MainPage 컴포넌트 내부에서 useState 추가
  const [brushSize, setBrushSize] = useState(5) // 초기값은 5로 설정

  const handleDrawButtonClick = () => {
    setDrawingMode(true)
  }

  const handleEraseButtonClick = () => {
    setDrawingMode(false)
  }

  // const handleCanvasClick = () => {
  //   if (canvasRef.current) {
  //     // CanvasDraw 컴포넌트가 렌더링되는 DOM 요소를 캡처
  //     const canvasElement = document.getElementById('canvas-draw')

  //     if (canvasElement) {
  //       html2canvas(canvasElement).then((canvas) => {
  //         const drawingDataURL = canvas.toDataURL('image/png')

  //         // 데이터 URL을 다운로드할 수 있는 링크를 생성합니다.
  //         const downloadLink = document.createElement('a')
  //         downloadLink.href = drawingDataURL
  //         downloadLink.download = 'drawing.png'

  //         // 링크를 클릭하여 다운로드를 시작합니다.
  //         document.body.appendChild(downloadLink)
  //         downloadLink.click()
  //         document.body.removeChild(downloadLink)
  //       })
  //     }
  //   }
  // }

  const handleSubmitClick = () => {
    if (canvasRef.current) {
      // CanvasDraw 컴포넌트가 렌더링되는 DOM 요소를 캡처
      const canvasElement = document.getElementById('canvas-draw')

      if (canvasElement) {
        html2canvas(canvasElement).then((canvas) => {
          canvas.toBlob((blob) => {
            if (blob) {
              // blob이 null이 아닌 경우에만 실행
              // FormData 객체를 생성하고 blob을 추가합니다.
              const formData = new FormData()
              formData.append('drawing', blob, 'drawing.png')

              // fetch API를 사용하여 POST 요청을 수행합니다.
              fetch('http://127.0.0.1:8000/emotiart/api/upload/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                body: formData,
              })
                .then((response) => {
                  // 서버 응답을 처리합니다.
                  if (response.ok) {
                    console.log('123')
                  } else {
                    console.error('456')
                  }
                })
                .catch((error) => {
                  console.error('서버에 그림을 전송하는 도중 에러가 발생했습니다:', error)
                })
            } else {
              console.error('blob이 null입니다.')
            }
          }, 'image/png')
        })
      }
    }
  }

  return (
    <AppContainer>
      <Header>
        <Title>EmotiArt</Title>
        <RecommendWrap>
          <Text>recomend emoticon :</Text>
          <Recommend>
            <img src={cat1} alt="Cat 1" />
            <img src={cat2} alt="Cat 2" />
            <img src={cat3} alt="Cat 3" />
            <img src={cat4} alt="Cat 4" />
            <img src={cat5} alt="Cat 5" />
          </Recommend>
        </RecommendWrap>
      </Header>
      <Container>
        <ToolBar>
          <DrawButton onClick={handleDrawButtonClick} />
          <EraseButton onClick={handleEraseButtonClick} />
          <SizeSlider
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
          />
          <SubmitButton onClick={handleSubmitClick} />
          <AddFeelButton></AddFeelButton>
        </ToolBar>
        <Canvas id="canvas-draw">
          <CanvasDraw
            ref={canvasRef}
            brushColor={drawingMode ? 'black' : 'white'}
            brushRadius={brushSize}
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
const Title = styled.div`
  color: #333;
  font-size: 40px;
`

const RecommendWrap = styled.div`
  color: #333;
  font-size: 40px;
  display: flex;
  align-items: center;
`

const Text = styled.div`
  color: #333;
  font-size: 30px;
  margin-left: 110px;
`
const Recommend = styled.div`
  color: #333;
  font-size: 40px;
  margin-left: 20px;
  padding: 10px;

  img {
    width: 60px;
    height: 60px;
    margin-right: 5px;
  }
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
  background-color: #fff;
  color: white;
  padding: 10px 20px;
  font-size: 1em;
  margin-bottom: 20px;
  border: none;

  cursor: pointer;

  width: 60px;
  height: 60px;
  background-image: url(${draw});
  background-size: cover; /* 이미지를 컨테이너에 맞게 조절 */
  background-position: center; /* 이미지를 가운데 정렬 */

  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2); /* 가로, 세로, 흐림 정도, 색상 */

  &:hover {
    background-color: #676767;
  }
`

const EraseButton = styled.button`
  background-color: #fff;
  color: white;
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  margin-bottom: 20px;
  cursor: pointer;

  width: 60px;
  height: 60px;
  background-image: url(${erase});
  background-size: cover; /* 이미지를 컨테이너에 맞게 조절 */
  background-position: center; /* 이미지를 가운데 정렬 */

  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2); /* 가로, 세로, 흐림 정도, 색상 */

  &:hover {
    background-color: #676767;
  }
`

// SizeSlider 컴포넌트 추가
const SizeSlider = styled.input.attrs({ type: 'range', min: 1, max: 20 })`
  width: 80%;
  margin-bottom: 100px;
`

const SubmitButton = styled.button`
  background-color: #fff;
  color: white;
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;

  width: 60px;
  height: 60px;
  background-image: url(${convert});
  background-size: cover; /* 이미지를 컨테이너에 맞게 조절 */
  background-position: center; /* 이미지를 가운데 정렬 */

  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2); /* 가로, 세로, 흐림 정도, 색상 */

  &:hover {
    background-color: #676767;
  }
`

const AddFeelButton = styled.button`
  background-color: #fff;
  color: white;
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  cursor: pointer;

  width: 60px;
  height: 60px;
  background-image: url(${addFeel});
  background-size: cover; /* 이미지를 컨테이너에 맞게 조절 */
  background-position: center; /* 이미지를 가운데 정렬 */

  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2); /* 가로, 세로, 흐림 정도, 색상 */

  &:hover {
    background-color: #676767;
  }
`
