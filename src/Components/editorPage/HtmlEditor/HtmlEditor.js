import React, { useState , useEffect } from 'react'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
function HtmlEditor({html , htmlChanged}) {
    function getWindowSize() {
      const { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
    }

    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [show, setShow] = useState(false);


    useEffect(() => {
      function handleWindowResize() {
        setWindowSize(getWindowSize());
      }

      window.addEventListener("resize", handleWindowResize);

      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, []);
    

    const changeDivShow =()=>{
            setShow(!show)
    }
  return (
    <div className="htmlCoder code-editor">
      {windowSize.innerWidth > 960 ? (
        <>
          <div className="code-type">HTML</div>
          <div className="html-editor">
            <AceEditor
              className="code"
              placeholder=""
              mode="html"
              theme="monokai"
              wrapEnabled={true}
              value={html}
              width="100%"
              height="350px"
              fontSize={15}
              onChange={htmlChanged}
              name="html-editor"
              editorProps={{ $blockScrolling: false }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                indentedSoftWrap: false,
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="code-type" onClick={changeDivShow}>
            HTML
          </div>
          {show ? (
            <>
              <div className="html-editor">
                <AceEditor
                  className="code"
                  placeholder=""
                  mode="html"
                  theme="monokai"
                  wrapEnabled={true}
                  value={html}
                  width="100%"
                  height="350px"
                  fontSize={15}
                  onChange={htmlChanged}
                  name="html-editor"
                  editorProps={{ $blockScrolling: false }}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    indentedSoftWrap: false,
                  }}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default HtmlEditor