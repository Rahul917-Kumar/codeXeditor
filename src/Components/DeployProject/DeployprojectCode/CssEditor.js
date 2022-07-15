import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
function CssEditor({ css, cssChanged }) {
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
  const changeDivShow = () => {
    setShow(!show);
  };
  return (
    <div className="cssCoder code-editor">
      {windowSize.innerWidth > 960 ? (
        <>
          <div className="code-type">CSS</div>
          <div className="css-editor">
            <AceEditor
              className="code"
              placeholder=""
              mode="css"
              theme="monokai"
              wrapEnabled={true}
              value={css}
              width="100%"
              height="350px"
              readOnly="false"
              fontSize={15}
              onChange={cssChanged}
              name="css-editor"
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
            CSS
          </div>
          {show ? (
            <>
              <div className="css-editor">
                <AceEditor
                  className="code"
                  placeholder=""
                  mode="css"
                  theme="monokai"
                  wrapEnabled={true}
                  value={css}
                  width="100%"
                  height="350px"
                  fontSize={15}
                  readOnly="false"
                  onChange={cssChanged}
                  name="css-editor"
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

export default CssEditor;
