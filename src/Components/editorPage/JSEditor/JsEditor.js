import React , {useEffect, useState} from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
function JsEditor({ js, jsChanged }) {
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
    <div className="jsCoder code-editor">
      {windowSize.innerWidth > 960 ? (
        <>
          <div className="code-type">JS</div>
          <div className="js-editor">
            <AceEditor
              className="code"
              placeholder=""
              mode="javascript"
              theme="monokai"
              wrapEnabled={true}
              value={js}
              width="100%"
              height="350px"
              fontSize={15}
              onChange={jsChanged}
              name="js-editor"
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
            JS
          </div>
          {show ? (
            <>
              <div className="js-editor">
                <AceEditor
                  className="code"
                  placeholder=""
                  mode="javascript"
                  theme="monokai"
                  wrapEnabled={true}
                  value={js}
                  width="100%"
                  height="350px"
                  fontSize={15}
                  onChange={jsChanged}
                  name="js-editor"
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

export default JsEditor;
