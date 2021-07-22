import { useState, useEffect, useRef } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, Modifier, ContentState, RawDraftContentState, RawDraftContentBlock } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from 'html-to-draftjs';
import './App.css';
import StyleButton from './components/StyleButton'
import { bgArrays, additionalMaps, colorArrays } from './stylesObject'

function App() {
  const [terminalColor, setTerminalColor] = useState('#0c0c0c')
  const [resultText, setResultText] = useState('')
  const textRef = useRef<Editor>(null)
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(
      // inside `` set default value (for future save text)
      ContentState.createFromBlockArray(htmlToDraft(``).contentBlocks)
    )
  )

  useEffect(() => {
    setResultText(generateResult(convertToRaw(editorState.getCurrentContent())))
  }, [editorState])


  const textButtons = colorArrays.map(colorObj => <StyleButton colorHex={colorObj[1].color} colorCode={colorObj[0]} onClick={() => addColor(colorObj[0])} text="T" />)

  const backgroundColors = bgArrays.map(colorObj => <StyleButton colorHex={colorObj[1].backgroundColor} colorCode={colorObj[0]} onClick={() => addColor(colorObj[0])} text="■" />)

  
  const buttons = [
    <StyleButton colorHex="#000" colorCode="REMOVE_STYLE" onClick={() => addColor('REMOVE_STYLE')} text="💧" style={{fontSize: '15px', lineHeight: '28px'}} />,
    ...textButtons, 
    ...backgroundColors, 
  ]
  
  function onEditorStateChange(changedState: EditorState) {
    setEditorState(changedState);
  }

  function addColor(colorCode: string) {
    const contentState = Modifier.applyInlineStyle(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      colorCode,
    );
    onEditorStateChange(EditorState.push(editorState, contentState, 'change-inline-style'));
  }

  function applyStyles(text: string, style: string, position: number) {
    return [text.slice(0, position), style, text.slice(position)].join('')
  }

  function styleBlock(block: RawDraftContentBlock) {
    const inlineStyleRanges = block.inlineStyleRanges;
    let returning = block.text;
    if(inlineStyleRanges.length === 0) return returning;

    const grouped = inlineStyleRanges.reduce(function(rv:any, x:any) {
      (rv[x['offset']] = rv[x['offset']] || []).push(x);
      return rv;
    }, {});

    const arr = Object.entries(grouped)
    const sorted = arr.sort().reverse(); //[0]: offset [1]: {offset, length, style}

    sorted.forEach(style => {
      // @ts-ignore
      const styleObj: any = style[1][0]
      if(additionalMaps.hasOwnProperty(styleObj.style)) {
        // @ts-ignore
        const apstyles = style[1].map(s => s.style)
        let keys = ''
        apstyles.forEach((st:any) => (
          //@ts-ignore
          keys += additionalMaps[st].key
        ))
        const count = keys.length;
        const applyremover = applyStyles(returning, additionalMaps.REMOVE_STYLE.key, (styleObj.offset+styleObj.length))
        const apply = applyStyles(applyremover, keys, styleObj.offset)
        returning = apply
      }
    })

    return returning
  }

  function generateResult(data: RawDraftContentState) {
    let result = ``;
    data.blocks.forEach((block, i) => {
      result += styleBlock(block)+((i+1) !== data.blocks.length ? '\n' : '')
    })

    return result
  }

  useEffect(() => { 
    textRef?.current?.focusEditor()
  }, [textRef, terminalColor])

  return (
    <div className="App">
      <header className="App-header">
      <h1>Start writing your colored logs</h1>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        customStyleMap={additionalMaps}
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        editorStyle={{backgroundColor: terminalColor}}
        wrapperStyle={{minWidth: '100%'}}
        onEditorStateChange={onEditorStateChange}
        ref={textRef}
        toolbar={{
          options: ['inline', 'emoji'],
          inline: {
            options: ['underline'], 
          }
        }}
        toolbarCustomButtons={buttons}
        stripPastedStyles={true}
        placeholder="Type here your log"
      />
      <div className="resultBox">
        {resultText && (
          <>
            {resultText}
            <button className="copyButton" onClick={() => {navigator.clipboard.writeText(resultText)}}>Copy</button>
          </>
        )}
        {!resultText && (
          <div style={{color: '#bbb'}}>the result is shown here</div>
        )}
      </div>
      </header>
      <div className="terminalColorsToolbar">
        <div className="title">
        <h4>Terminal background</h4>
        </div>
        <div className="item" onClick={() => setTerminalColor('#0c0c0c')}>
          ⬛
        </div>
        <div className="item" onClick={() => setTerminalColor('#012456')}>
          🟦
        </div>
        <div className="item" onClick={() => setTerminalColor('#8e562e')}>
          🟫
        </div>
        <div className="item" onClick={() => setTerminalColor('#fff')}>
          ⬜
        </div>
      </div>
    </div>
  );
}

export default App;
