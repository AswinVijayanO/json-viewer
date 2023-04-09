import { useEffect, useState } from 'react'
import './App.css'
import JsonVisual from './cmp/visualizer'
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

function App() {
  const [code, setCode] = useState("")
  const [json, setJson] = useState(null)
  const [error, setError] = useState()
  const [sizes, setSizes] = useState([
    '50%',
    '50%',
  ]);
  useEffect(() => {
    if (json) {
      // prettify()
    }
  }, [json])
  const prettify = () => {
    try {
      let newobject = JSON.parse(code)
      let newcode = JSON.stringify(newobject, null, '\t')
      setCode(newcode)
    } catch (e) {

    }

  }

  return (
    <div className="App">
      <SplitPane
        split='vertical'
        sizes={sizes}
        onChange={setSizes}
      >
        <Pane minSize={50} maxSize='80%' className='ide'>
          {error && <p className='error'>{error}</p>}

          <button className="button dark-bg float" onClick={prettify}>Prettify</button>

          <Editor
            value={code}
            onValueChange={(code) => {
              try {
                setCode(code)
                let newobject = JSON.parse(code)
                setJson(newobject)
                setError(null)
              } catch (e) {
                setError(e.message)
                setJson(null)
              }

            }}

            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"DM Mono", "Fira Mono", monospace',
              fontSize: 12,
              overflow:'auto'
            }}
          />
        </Pane>
        <Pane minSize={50} maxSize='80%' className='visualizer'>
          {<JsonVisual object={json} />}
        </Pane>
      </SplitPane>
    </div >
  )
}

export default App
