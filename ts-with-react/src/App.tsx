import React, { useState } from 'react';
import logo from './logo.svg';
import Hello from './components/Hello';
import MouseTracker from './components/MouseTracker';
import useMouseTracker from './hooks/useMouseTracker';
import withLoader from './components/withLoader';
import useURLLoader from './hooks/useURLLoader';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import './App.css';

interface IShowResult {
  message: string;
  status: string;
}

const DogShow: React.FC<{ data: IShowResult }> = ({ data }) => {
  return (
    <>
    <h2>Dog show: { data.status }</h2>
    <img src={ data.message } alt="" />
    </>
  )
}

const App: React.FC = () => {
  const position = useMouseTracker()

  const WrappedDogShow = withLoader(DogShow, 'https://dog.ceo/api/breeds/image/random')
  const [show, setShow] = useState(true)
  const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random', [show])
  const dogResult = data as IShowResult

  const downloadPDF = () => {
    html2canvas(document.body).then((canvas) => {
      document.body.appendChild(canvas)
      canvasToPDF(canvas)
    })
  }

  const canvasToPDF = (canvas: HTMLCanvasElement) => {
    var contentWidth = canvas.width;
    var contentHeight = canvas.height;
    var imgWidth = 595.28;
    var imgHeight = 592.28/contentWidth * contentHeight;
    var pageData = canvas.toDataURL('image/jpeg', 1.0)
    const pdf = new jsPDF(undefined, 'pt', 'a4')
    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight )
    pdf.save('content.pdf');
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <p>x: { position.x }, y: { position.y }</p>

        <button onClick={() => {setShow(!show)}}>change img</button>

        { loading ? <p>加载中...</p> : <img src={dogResult && dogResult.message} alt="" /> }

        <WrappedDogShow />
        <p>{process.env.REACT_APP_SECRET_ENV}</p>

        <MouseTracker />

        <Hello message='2' />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <button onClick={downloadPDF}>下载pdf</button>
      </header>
    </div>
  );
}

export default App;
